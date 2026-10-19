#!/usr/bin/env node
/*
 * Design-system sync — deterministic half. Claude drives it through .claude/skills/sync-design-system/SKILL.md
 * (the Artifact reads/publishes happen there). Commands:
 *
 *   fetch-list            what to read from the design system into dist/ds-sync/remote (paths + icon blob ids)
 *   ingest-icons <dir>    file icons fetched by blob id under remote/project/assets/Icons/<name>.svg
 *   stage                 render the repo as DS files into dist/ds-sync/local (+ build the preview bundle)
 *   diff [--first]        3-way classify every path → dist/ds-sync/plan.json (+ a readable report)
 *   apply                 carry out pulls per decisions.json, re-stage, collect out/ (what to publish)
 *   index --by <name> --note <text>   write out/project/design-system.json (lastChange, icon records)
 *   files-arg             print the Artifact publish `files` map (content types included)
 *   check                 load every staged preview headless with the bundle; fail on errors or blank showcases
 *   record --version <v>  after a successful publish: store the agreed state in libs/ui/design-system/
 */
import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { clean, read, write } from './lib/fsutil.mjs';
import { bundleHeader, buildEntry, stageEntries } from './lib/mapping.mjs';
import { BASE_DIR, BUILD, LOCAL, NAMESPACE, PLAN, REMOTE, r } from './lib/paths.mjs';
import { apply, classify, collectOut, loadState, NEEDS_DECISION, record, writeIndex } from './lib/sync.mjs';

const [cmd, ...args] = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i < 0 ? undefined : (args[i + 1] ?? true);
};

function stage({ bundle = true } = {}) {
  const { entries, docs } = stageEntries();
  clean(LOCAL);
  if (bundle) {
    clean(BUILD);
    write(join(BUILD, 'mount.ts'), buildEntry(docs));
    execSync('npx vite build -c tools/design-system-sync/vite.bundle.config.mts --logLevel warn', { cwd: r(), stdio: 'inherit' });
    // Consumers inline bundle.js in a <script>: `<!--` / `</script` would break out of it. `\x3C` is the same
    // character inside the string, regex and template literals where these appear (Angular's comment escaper).
    const js = read(join(BUILD, 'bundle.js')).replaceAll('<!--', '\\x3C!--').replace(/<\/script/gi, '\\x3C/script');
    const problems = [
      js.length > 6 * 1024 * 1024 && `bundle.js is ${(js.length / 1048576).toFixed(1)} MB (max 6)`,
      /<\/script/i.test(js) && 'bundle.js contains "</script"',
      /<!--/.test(js) && 'bundle.js contains "<!--"',
    ].filter(Boolean);
    if (problems.length) throw new Error(problems.join('; '));
    entries.set('components/bundle.js', { text: bundleHeader(docs, NAMESPACE) + js, owner: 'repo', repo: 'tools/design-system-sync (built)' });
  } else if (read(join(BUILD, 'bundle.js'))) {
    entries.set('components/bundle.js', { text: bundleHeader(docs, NAMESPACE) + read(join(BUILD, 'bundle.js')), owner: 'repo', repo: 'tools/design-system-sync (built)' });
  }
  const files = {};
  for (const [ds, { text, owner, repo, source }] of entries) {
    if (text != null) write(join(LOCAL, 'project', ds), text);
    files[ds] = { owner, repo, ...(source && { source }) };
  }
  write(join(LOCAL, 'manifest.json'), JSON.stringify({ files }, null, 2) + '\n');
  console.log(`staged ${entries.size} files (${docs.length} component cards) → dist/ds-sync/local`);
}

function report(plan) {
  const groups = {};
  for (const i of plan.items) (groups[i.action] ??= []).push(i);
  const order = ['conflict', 'remote-edit', 'remove?', 'remove-local?', 'merge', 'pull', 'push', 'same'];
  console.log(plan.first ? 'FIRST SYNC — the design system as it is now is the base.' : `base: version ${plan.base.version} · commit ${plan.base.commit} · ${plan.base.syncedAt}`);
  for (const a of order) {
    const list = groups[a];
    if (!list) continue;
    console.log(`\n${a.toUpperCase()} (${list.length})${NEEDS_DECISION.has(a) ? '  ← needs a decision' : ''}`);
    if (a === 'same') continue;
    for (const i of list) {
      console.log(`  ${i.path}${i.repo ? `  ⇐ ${i.repo}` : ''}`);
      if (i.tokens) {
        if (i.tokens.pushed.length) console.log(`    repo → DS: ${i.tokens.pushed.join(', ')}`);
        if (i.tokens.pulled.length) console.log(`    DS → repo: ${i.tokens.pulled.join(', ')}`);
        for (const c of i.tokens.conflicts) console.log(`    CONFLICT ${c.key}\n      base   ${JSON.stringify(c.base)}\n      repo   ${JSON.stringify(c.local)}\n      DS     ${JSON.stringify(c.remote)}`);
      }
    }
  }
  console.log(`\nfull plan with diffs: ${PLAN.slice(r().length + 1)}`);
}

switch (cmd) {
  case 'fetch-list': {
    // Step 1: the index. Step 2: every mapped text file + icons whose upload changed (uploads are immutable
    // per blob id, so an icon whose id matches the last sync is copied from the base instead of fetched).
    const state = loadState();
    const indexText = read(join(REMOTE, 'project/design-system.json'));
    if (!indexText) {
      console.log(JSON.stringify({ next: 'Artifact read path "project/design-system.json" with out_dir dist/ds-sync/remote, then run fetch-list again' }, null, 2));
      break;
    }
    const icons = JSON.parse(indexText).assetGroups?.Icons?.files ?? {};
    const fetch = {};
    let cached = 0;
    for (const [name, f] of Object.entries(icons)) {
      const base = read(join(BASE_DIR, 'assets/Icons', name));
      if (state.icons?.[name] === f.blob && base != null) { write(join(REMOTE, 'project/assets/Icons', name), base); cached++; }
      else fetch[name] = f.blob;
    }
    console.log(JSON.stringify({
      readPaths: 'every path from Artifact list scope "files" that starts with project/ (except project/design-system.json, already read) — out_dir dist/ds-sync/remote',
      readIconIds: fetch,
      thenRun: Object.keys(fetch).length ? 'node tools/design-system-sync/cli.mjs ingest-icons <folder the icon reads were saved to>' : undefined,
      iconsFromCache: cached,
    }, null, 2));
    break;
  }
  case 'ingest-icons': {
    const dir = args[0];
    if (!dir) throw new Error('ingest-icons <folder the Artifact tool saved the icon assets to>');
    const index = JSON.parse(read(join(REMOTE, 'project/design-system.json')));
    const byBlob = Object.fromEntries(Object.values(index.assetGroups?.Icons?.files ?? {}).map((f) => [f.blob, f.name]));
    let n = 0;
    for (const f of readdirSync(dir)) {
      const name = byBlob[f.replace(/\.\w+$/, '')];
      if (name) { write(join(REMOTE, 'project/assets/Icons', name), read(join(dir, f))); n++; }
    }
    console.log(`filed ${n} icons under remote/project/assets/Icons`);
    break;
  }
  case 'stage':
    stage({ bundle: !flag('no-bundle') });
    break;
  case 'diff':
    report(classify({ first: !!flag('first') }));
    break;
  case 'apply': {
    const res = apply();
    stage({ bundle: false });
    const out = collectOut();
    console.log(JSON.stringify({ ...res, ...out }, null, 2));
    break;
  }
  case 'index':
    console.log(JSON.stringify(writeIndex({ by: flag('by') ?? 'Claude', note: flag('note') ?? 'synced from the ngx-paper-ui repo' }), null, 2));
    break;
  case 'files-arg': {
    // The Artifact publish `files` map: every publish path, null for approved removals. Types the artifact
    // server doesn't serve by extension (.ts sources) go as text/plain, as the design system stores them, and so
    // do the component templates under components/src/ (.html), which are source, not pages.
    const out = JSON.parse(read(join(r('dist/ds-sync/out'), 'publish.json')));
    const SERVED = /\.(html|css|m?js|json|md|txt|svg|csv|xml|map|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|pdf)$/;
    const asText = (p) => !SERVED.test(p) || (p.startsWith('components/src/') && p.endsWith('.html'));
    const files = {};
    for (const p of out.publish) files[`project/${p}`] = asText(p) ? { from: `project/${p}`, contentType: 'text/plain' } : `project/${p}`;
    for (const p of out.removals) files[`project/${p}`] = null;
    console.log(JSON.stringify(files));
    break;
  }
  case 'check':
    await import('./lib/check.mjs').then((m) => m.check());
    break;
  case 'record':
    if (!flag('version')) throw new Error('record --version <artifact version from the publish result>');
    console.log(JSON.stringify(record({ version: flag('version') }), null, 2).slice(0, 400));
    break;
  default:
    console.log(read(new URL(import.meta.url).pathname).split('\n').slice(2, 15).join('\n'));
    process.exitCode = cmd ? 1 : 0;
}
