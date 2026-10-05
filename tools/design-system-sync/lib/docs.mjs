/*
 * The docs site's component pages → design-system cards.
 *   apps/ui-demo-app/src/app/pages/<kebab>-docs-page/<kebab>.docs.ts   (ComponentDoc, a JSON literal)
 *   → components/<Comp>/preview.html   (Showcase · API · CSS tokens, the DS card layout, mounted live)
 *   → components/index.d.ts            (<Comp>Props / <Comp>Models / <Comp>Outputs, read by the DS api cards)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DERIVED_TOKENS, NAMESPACE, PAGES } from './paths.mjs';

const DERIVED = new Set(JSON.parse(readFileSync(DERIVED_TOKENS, 'utf8')));
const PREVIEW_CSS = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'preview.css'), 'utf8');

/** Every component page that has a `<kebab>.docs.ts`, sorted by name. */
export function loadDocs() {
  return readdirSync(PAGES)
    .filter((d) => d.endsWith('-docs-page'))
    .flatMap((dir) => {
      const kebab = dir.replace(/-docs-page$/, '');
      const file = join(PAGES, dir, `${kebab}.docs.ts`);
      let text;
      try { text = readFileSync(file, 'utf8'); } catch { return []; }
      const json = text.slice(text.indexOf('= {') + 2).replace(/;\s*$/, '');
      try {
        const doc = JSON.parse(json);
        return [{ ...doc, kebab, file: file.slice(file.indexOf('apps/')), libFile: doc.meta.at(-1) }];
      } catch (e) {
        throw new Error(`${file}: the doc object must stay a JSON literal (double quotes, no trailing commas): ${e.message}`);
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Where a component's guideline README lives in the repo (next to its source). */
export function readmePath(doc) {
  const dir = dirname(doc.libFile);
  const own = doc.libFile.endsWith(`/${doc.kebab}.ts`);
  return join(dir, own ? 'README.md' : `README.${doc.kebab}.md`);
}

/* ---------- preview.html ---------- */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function tokenIndex(tokens) {
  const byName = new Map();
  for (const [family, v] of Object.entries(tokens)) if (v && Array.isArray(v.tokens)) for (const t of v.tokens) byName.set(t.name, { ...t, family });
  const resolve = (v, theme, depth = 0) => {
    const raw = typeof v === 'string' ? v : (v[theme] ?? v.light);
    const alias = /^\{([\w.-]+)\}$/.exec(raw);
    return alias && depth < 16 && byName.has(alias[1]) ? resolve(byName.get(alias[1]).value, theme, depth + 1) : raw;
  };
  return { byName, resolve };
}

function tokensTable(names, tokens) {
  const { byName, resolve } = tokenIndex(tokens);
  const rows = names.flatMap((name) => {
    const t = byName.get(name);
    if (!t) return [];
    const light = resolve(t.value, 'light');
    const dark = resolve(t.value, 'dark');
    const swatch =
      t.family === 'color' ? `<span class="doc-sw" style="background:var(--${name})"></span>`
      : t.family === 'shadow' ? `<span class="doc-sw is-shadow" style="box-shadow:var(--${name})"></span>`
      : t.family === 'spacing' || t.family === 'size' ? `<span class="doc-sw is-len" style="width:min(var(--${name}),120px)"></span>`
      : '';
    const values = `<code>${esc(light)}</code>${dark !== light ? ` / <code>${esc(dark)}</code>` : ''}`;
    return [`<tr><td><code>--${name}</code>${DERIVED.has(name) ? '<span class="doc-derived">derived</span>' : ''}</td><td><div class="doc-swatch-cell">${swatch}${values}</div></td><td>${esc(t.usage ?? '')}</td></tr>`];
  });
  return rows.length
    ? `<table class="doc-table"><thead><tr><th>Token</th><th>Value (light / dark)</th><th>Usage</th></tr></thead><tbody>${rows.join('')}</tbody></table>`
    : '<div class="doc-empty">None.</div>';
}

function apiHtml(blocks) {
  return blocks
    .map((b) => {
      switch (b.kind) {
        case 'heading': return `<h3>${esc(b.text)}</h3>`;
        case 'table': return `<table class="doc-table"><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
        case 'empty': return `<div class="doc-empty">${esc(b.text)}</div>`;
        case 'html': return b.html.replace(/^<(p|ul)>/, '<$1 class="doc-p">');
        case 'code': return `<pre class="doc-code">${esc(b.code)}</pre>`;
        default: throw new Error(`unknown doc block ${b.kind}`);
      }
    })
    .join('');
}

/** `card` = the existing card marker attributes on the DS side (height is kept; group/subtitle come from the doc). */
export function renderPreview(doc, tokens, card = {}) {
  const marker = [`group="${esc(doc.group)}"`, `height=${card.height ?? 1200}`, doc.subtitle ? `subtitle="${esc(doc.subtitle)}"` : '']
    .filter(Boolean)
    .join(' ');
  return `<!-- @dsCard ${marker} -->
<!doctype html>
<html>
<head><meta charset="utf-8"><title>${esc(doc.title)} — Paper UI</title>
<style>
${PREVIEW_CSS.trimEnd()}
</style>
</head>
<body>
<main class="doc">
  <header>
    <h1>${esc(doc.title)}</h1>
    <p>${doc.summary}</p>
    <div class="doc-meta">${doc.meta.map((m) => `<code>${esc(m)}</code>`).join('')}</div>
  </header>
  <section class="doc-section" aria-labelledby="s1"><h2 id="s1">Showcase</h2><div class="doc-stage" id="showcase"></div></section>
  <section class="doc-section" aria-labelledby="s2"><h2 id="s2">API</h2>${apiHtml(doc.blocks)}</section>
  <section class="doc-section" aria-labelledby="s3"><h2 id="s3">CSS tokens</h2>${tokensTable(doc.tokens, tokens)}</section>
</main>
<script>
  window.${NAMESPACE}.mount('${doc.name}', document.getElementById('showcase')).catch(function (e) {
    document.getElementById('showcase').textContent = 'Showcase failed to load: ' + e.message;
  });
</script>
</body>
</html>
`;
}

/** Card marker attributes of an existing preview.html (line 1). */
export const cardOf = (html) => Object.fromEntries([...(html ?? '').split('\n', 1)[0].matchAll(/(\w+)=(?:"([^"]*)"|(\d+))/g)].map((m) => [m[1], m[2] ?? Number(m[3])]));

/* ---------- index.d.ts ---------- */

const text = (html) => html.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim();

function tables(doc) {
  const out = {};
  let heading = null;
  for (const b of doc.blocks) {
    if (b.kind === 'heading') heading = b.text;
    else if (b.kind === 'table' && heading) out[heading] = b;
  }
  return out;
}

/** Doc-table types are written for people; make them valid TypeScript (`0–4` → `0 | 1 | 2 | 3 | 4`). */
function tsType(t) {
  const range = /^(\d+)\s*[–-]\s*(\d+)$/.exec(t);
  if (range) return Array.from({ length: +range[2] - +range[1] + 1 }, (_, i) => +range[1] + i).join(' | ');
  return !t || t === '—' ? 'unknown' : t;
}

function iface(name, table, { optional }) {
  const generic = table.rows.some((r) => /\bT\b/.test(text(r[1]))) ? '<T = string>' : '';
  const members = table.rows.map((r) => {
    const prop = text(r[0]);
    const type = tsType(text(r[1]));
    const note = text(r.at(-1));
    const opt = optional && text(r[2] ?? '') !== 'required' ? '?' : '';
    return `${note ? `  /** ${note.replace(/\*\//g, '* /')} */\n` : ''}  ${/^[\w$]+$/.test(prop) ? prop : JSON.stringify(prop)}${opt}: ${type};`;
  });
  return `export interface ${name}${generic} {\n${members.join('\n')}\n}`;
}

export function renderDts(docs, iconNames) {
  const parts = docs.flatMap((doc) => {
    const t = tables(doc);
    const selector = doc.meta[0];
    const out = [`/** ${selector} — ${doc.name}. ${text(doc.summary)} */`];
    if (t['Inputs']) out.push(iface(`${doc.name}Props`, t['Inputs'], { optional: true }));
    if (t['Models (two-way)']) out.push(iface(`${doc.name}Models`, t['Models (two-way)'], { optional: false }));
    if (t['Outputs']) {
      const o = t['Outputs'];
      out.push(iface(`${doc.name}Outputs`, { rows: o.rows.map((r) => [r[0], r[1], 'required', r.at(-1)]) }, { optional: false }));
    }
    return out.length > 1 ? [out.join('\n')] : [];
  });
  return `/**
 * Paper UI — Angular API (documentation types), GENERATED from the ngx-paper-ui repo's docs pages
 * (apps/ui-demo-app/src/app/pages/<kebab>-docs-page/<kebab>.docs.ts) by tools/design-system-sync. Do not edit here: edit the repo.
 * \`<Comp>Props\` = inputs, \`<Comp>Models\` = two-way model() signals, \`<Comp>Outputs\` = outputs.
 * Every component is standalone + OnPush; form controls are Signal Forms controls bound with [formField].
 */

export type IconName = ${iconNames.map((n) => `'${n}'`).join(' | ')};
export type IconSize = 'sm' | 'md' | 'lg';
export type Tone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export interface BadgeSpec { tone: Tone; label: string }
export interface ValidationError { kind: string; message?: string }
export interface SelectOption<T = string> { value: T; label: string; disabled?: boolean }
export interface TabItem { value: string; label: string; icon?: IconName; count?: number }
export interface DetailField { label: string; value: string; copyable?: boolean }

${parts.join('\n\n')}
`;
}
