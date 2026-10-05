/*
 * Classification, apply and record. See .claude/skills/sync-design-system.md for the procedure.
 *
 * For each design-system path, with L = repo (staged), R = design system (fetched), B = last agreed base:
 *   owner 'both':  L==R → same · L==B → pull · R==B → push · no base, one side only → push/pull · else conflict
 *                  (tokens.json: merged per token; only the same token changed on both sides conflicts)
 *   owner 'repo':  L==R → same · R==B or no base → push · else remote-edit (flag: adopt or discard)
 *   DS paths under a repo-owned prefix that the repo doesn't produce → remove?
 */
import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { authorPart, generatedPart, iconFromDs, puToLib, splitCss } from './convert.mjs';
import { clean, hash, lineDiff, read, walk, write } from './fsutil.mjs';
import { REPO_PREFIXES } from './mapping.mjs';
import { ARTIFACT_URL, BASE_DIR, DECISIONS, LOCAL, OUT, PAPER_UI_CSS, PLAN, REMOTE, STATE_FILE, UPLOADS, r } from './paths.mjs';
import { merge, resolve, stringify } from './tokens.mjs';

const P = (root, ds) => join(root, 'project', ds);

export function loadState() {
  const s = read(STATE_FILE);
  return s ? JSON.parse(s) : { artifact: ARTIFACT_URL, version: null, syncedAt: null, commit: null, files: {} };
}

/** `first`: no base yet — the design system's current content is the base (the repo was ported from it). */
export function classify({ first = false } = {}) {
  const state = loadState();
  const manifest = JSON.parse(read(join(LOCAL, 'manifest.json')));
  const remotePaths = walk(join(REMOTE, 'project'));
  const items = [];

  for (const [ds, meta] of Object.entries(manifest.files)) {
    const L = read(P(LOCAL, ds));
    const R = read(P(REMOTE, ds));
    const baseText = first ? R : read(join(BASE_DIR, ds));
    const hB = first ? hash(ds, R) : (state.files[ds] ?? null);
    const [hL, hR] = [hash(ds, L), hash(ds, R)];
    const item = { path: ds, owner: meta.owner, repo: meta.repo, ...(meta.source && { source: meta.source }) };

    if (hL === hR) item.action = 'same';
    else if (first && L == null && meta.owner === 'both') item.action = 'pull'; // seed the repo from the DS
    else if (meta.owner === 'repo') item.action = hR == null || hR === hB || hB == null ? 'push' : 'remote-edit';
    else if (ds === 'tokens.json' && L != null && R != null) {
      const m = merge(baseText ? JSON.parse(baseText) : null, JSON.parse(L), JSON.parse(R));
      item.action = m.conflicts.length ? 'conflict' : m.changes.pulled.length && m.changes.pushed.length ? 'merge' : m.changes.pulled.length ? 'pull' : 'push';
      item.tokens = { pushed: m.changes.pushed, pulled: m.changes.pulled, conflicts: m.conflicts };
    } else if (hB != null && hL === hB) item.action = hR == null ? 'remove-local?' : 'pull';
    else if (hB != null && hR === hB) item.action = hL == null ? 'remove?' : 'push';
    else if (hB == null && hR == null) item.action = 'push';
    else if (hB == null && hL == null) item.action = 'pull';
    else item.action = 'conflict';

    // Diffs read "design system → repo". Repo-owned pushes (sources, generated files) are listed without one.
    if (item.action !== 'same' && (item.action !== 'push' || meta.owner === 'both')) item.diff = lineDiff(R ?? '', L ?? '');
    items.push(item);
  }

  for (const ds of remotePaths)
    if (!manifest.files[ds] && REPO_PREFIXES.some((p) => ds.startsWith(p))) items.push({ path: ds, owner: 'repo', action: 'remove?' });

  const plan = { first, artifact: state.artifact, base: { version: state.version, commit: state.commit, syncedAt: state.syncedAt }, items };
  write(PLAN, JSON.stringify(plan, null, 2) + '\n');
  return plan;
}

/** Actions that need a person's decision before anything is written. */
export const NEEDS_DECISION = new Set(['conflict', 'remote-edit', 'remove?', 'remove-local?']);

/**
 * Applies the plan. `decisions.json`: { "<ds path>": "local" | "remote" | "adopt" | "discard" | "remove" | "keep" | "skip",
 *   "tokens.json": { "<token key>": "local" | "remote" } }.
 * Pulls write into the repo (then regenerates tokens/icons); pushes are copied to out/ — exactly what to publish.
 */
export function apply() {
  const plan = JSON.parse(read(PLAN));
  const decisions = JSON.parse(read(DECISIONS) ?? '{}');
  const undecided = plan.items.filter((i) => NEEDS_DECISION.has(i.action) && !decisions[i.path] && !(i.path === 'tokens.json' && decisions['tokens.json']));
  if (undecided.length) throw new Error(`decide first (dist/ds-sync/decisions.json): ${undecided.map((i) => `${i.path} [${i.action}]`).join(', ')}`);
  const unadoptable = plan.items.filter((i) => i.action === 'remote-edit' && decisions[i.path] === 'adopt' && !ADOPTABLE(i.path));
  if (unadoptable.length) throw new Error(`generated from the repo, can't be adopted automatically — port the edit by hand, then "discard": ${unadoptable.map((i) => i.path).join(', ')}`);

  const pulled = [];
  const regen = new Set();
  for (const i of plan.items) {
    const d = decisions[i.path];
    const R = read(P(REMOTE, i.path));
    const pull = i.action === 'pull' || (i.action === 'conflict' && d === 'remote') || (i.action === 'remote-edit' && d === 'adopt');
    if (i.path === 'tokens.json' && ['pull', 'merge', 'conflict'].includes(i.action)) {
      const base = plan.first ? R : read(join(BASE_DIR, 'tokens.json'));
      const local = JSON.parse(read(r('libs/ui/src/styles/tokens/tokens.json')));
      const remote = JSON.parse(R);
      const m = merge(base ? JSON.parse(base) : null, local, remote);
      const doc = m.conflicts.length ? resolve(m.doc, local, remote, decisions['tokens.json'] ?? {}) : m.doc;
      write(r('libs/ui/src/styles/tokens/tokens.json'), stringify(doc));
      regen.add('tokens');
      pulled.push(i.path);
    } else if (pull) {
      pullFile(i, plan.first && /\.md$/.test(i.path) ? puToLib(R, i.source) : R, regen);
      pulled.push(i.path);
    } else if (i.action === 'remove-local?' && d === 'remove') {
      rmSync(r(i.repo), { force: true });
      if (i.path.startsWith('assets/Icons/')) regen.add('icons');
      pulled.push(`-${i.path}`);
    }
  }
  if (regen.has('tokens')) execSync('node libs/ui/scripts/build-tokens.mjs', { cwd: r(), stdio: 'inherit' });
  if (regen.has('icons')) execSync('node libs/ui/scripts/build-icons.mjs', { cwd: r(), stdio: 'inherit' });
  return { pulled, regenerated: [...regen] };
}

const ADOPTABLE = (ds) => ds === 'components/bundle.css' || ds.startsWith('components/src/angular/');

function pullFile(item, R, regen) {
  const ds = item.path;
  if (ds === 'README.md') write(r('libs/ui/docs/brand-book.md'), authorPart(R));
  else if (ds.startsWith('assets/Icons/')) { write(r(item.repo), iconFromDs(R)); regen.add('icons'); }
  else if (ds === 'components/bundle.css') {
    const { files, unplaced } = splitCss(R);
    for (const f of files) write(join(PAPER_UI_CSS, f.file), f.text);
    if (unplaced.length) console.warn(`bundle.css: new sections placed with the previous section: ${unplaced.join(', ')}`);
  } else if (ds.startsWith('components/src/angular/')) write(r('libs/ui/src', ds.slice('components/src/angular/'.length)), R);
  else if (/^components\/[^/]+\/README\.md$/.test(ds)) write(r(item.repo), R);
  else throw new Error(`${ds}: generated from the repo (${item.repo}); port the DS edit by hand, then choose "discard"`);
}

/** Copies what must be published into out/project (after a re-stage), and the icons to upload. */
export function collectOut() {
  const plan = JSON.parse(read(PLAN));
  const decisions = JSON.parse(read(DECISIONS) ?? '{}');
  clean(OUT);
  const publish = [];
  const uploads = [];
  const removals = [];
  const manifest = JSON.parse(read(join(LOCAL, 'manifest.json')));
  for (const [ds] of Object.entries(manifest.files)) {
    const L = read(P(LOCAL, ds));
    const R = read(P(REMOTE, ds));
    if (hash(ds, L) === hash(ds, R)) continue;
    const item = plan.items.find((i) => i.path === ds);
    if (item?.action === 'remote-edit' && decisions[ds] === 'keep') continue;
    let text = L;
    if (ds === 'README.md') text = authorPart(L) + generatedPart(R);
    write(P(OUT, ds), text);
    (ds.startsWith('assets/') ? uploads : publish).push(ds);
  }
  for (const i of plan.items) if (i.action === 'remove?' && decisions[i.path] === 'remove') removals.push(i.path);
  const out = { publish, uploads, removals };
  write(join(OUT, 'publish.json'), JSON.stringify(out, null, 2) + '\n');
  return out;
}

/**
 * Writes out/project/design-system.json from the freshly re-read remote index: lastChange, and the Icons
 * group's records for uploaded icons (`uploads.json`: { "<name>.svg": "/_blob/<id>" | "<id>" }).
 */
export function writeIndex({ by, note }) {
  const index = JSON.parse(read(P(REMOTE, 'design-system.json')));
  if (index.layout !== 'files' || !(index.createdOnFiles || index.convertedFrom)) throw new Error('design-system.json has no files-layout marker; not an index — stop');
  const uploads = JSON.parse(read(UPLOADS) ?? '{}');
  const out = JSON.parse(read(join(OUT, 'publish.json')));
  const icons = (index.assetGroups.Icons ??= { name: 'Icons', tile: 'xs', order: [], files: {} });
  for (const [name, blob] of Object.entries(uploads)) {
    const id = String(blob).replace(/^.*\/_blob\//, '');
    const text = read(P(LOCAL, `assets/Icons/${name}`));
    icons.files[name] = { name, blob: id, size: Buffer.byteLength(text), type: 'image/svg+xml' };
    if (!icons.order.includes(name)) icons.order.push(name);
  }
  for (const ds of out.removals.filter((p) => p.startsWith('assets/Icons/'))) {
    const name = ds.slice('assets/Icons/'.length);
    delete icons.files[name];
    icons.order = icons.order.filter((n) => n !== name);
  }
  const sha = execSync('git rev-parse --short HEAD', { cwd: r() }).toString().trim();
  index.lastChange = { by, at: new Date().toISOString(), via: `Claude Code · ngx-paper-ui@${sha}`, note };
  write(P(OUT, 'design-system.json'), JSON.stringify(index, null, 1) + '\n');
  return index.lastChange;
}

/** After a successful publish: the staged repo side IS the agreed state. */
export function record({ version }) {
  const manifest = JSON.parse(read(join(LOCAL, 'manifest.json')));
  const files = {};
  clean(BASE_DIR);
  for (const [ds, meta] of Object.entries(manifest.files)) {
    const text = read(P(LOCAL, ds));
    files[ds] = hash(ds, text);
    if (meta.owner === 'both') write(join(BASE_DIR, ds), text);
  }
  // Icon uploads by blob id (from the index just published, else the fetched one) — lets the next sync skip
  // fetching icons that haven't changed.
  const index = JSON.parse(read(P(OUT, 'design-system.json')) ?? read(P(REMOTE, 'design-system.json')));
  const icons = Object.fromEntries(Object.values(index.assetGroups?.Icons?.files ?? {}).map((f) => [f.name, f.blob]));
  const state = {
    artifact: ARTIFACT_URL,
    version,
    icons,
    syncedAt: new Date().toISOString(),
    commit: execSync('git rev-parse --short HEAD', { cwd: r() }).toString().trim(),
    files,
  };
  write(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
  return state;
}
