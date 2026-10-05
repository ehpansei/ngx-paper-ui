import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

/** Line endings, trailing whitespace and the final newline don't count as changes. */
export const normalize = (text) =>
  text.replace(/\r\n?/g, '\n').split('\n').map((l) => l.trimEnd()).join('\n').replace(/\n*$/, '\n');

/** SVG compares by drawing: whitespace between tags, `<x></x>` vs `<x/>` and the root's width/height don't count. */
export const canonicalSvg = (svg) =>
  svg
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/<(\w+)([^<>]*?)\s*><\/\1>/g, '<$1$2/>')
    .replace(/<svg\b([^>]*)>/, (_, attrs) => `<svg${attrs.replace(/\s(width|height)="[^"]*"/g, '')}>`)
    .replace(/\s*\/>/g, '/>')
    .trim() + '\n';

/** JSON compares by value (the page may reformat it); SVG by drawing. */
export const canonical = (path, text) =>
  path.endsWith('.json') ? JSON.stringify(JSON.parse(text), null, 2) + '\n' : path.endsWith('.svg') ? canonicalSvg(text) : normalize(text);

export const hash = (path, text) => (text == null ? null : createHash('sha256').update(canonical(path, text)).digest('hex').slice(0, 16));

export const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null);

export function write(p, text) {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, text);
}

export function clean(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

/** All files under dir, as `/`-separated paths relative to it. */
export function walk(dir, base = dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p, base) : [relative(base, p).split('\\').join('/')];
  });
}

/** A readable unified-ish diff for the sync report (line based, no dependency). */
export function lineDiff(a, b, context = 2) {
  const x = (a ?? '').split('\n');
  const y = (b ?? '').split('\n');
  const n = x.length;
  const m = y.length;
  const lcs = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) lcs[i][j] = x[i] === y[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
  const ops = [];
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && x[i] === y[j]) ops.push([' ', x[i++], j++]);
    else if (j < m && (i >= n || lcs[i][j + 1] >= lcs[i + 1][j])) ops.push(['+', y[j++]]);
    else ops.push(['-', x[i++]]);
  }
  const keep = ops.map((o, k) => o[0] !== ' ' || ops.slice(Math.max(0, k - context), k + context + 1).some((q) => q[0] !== ' '));
  const out = [];
  ops.forEach((o, k) => {
    if (keep[k]) out.push(`${o[0]} ${o[1]}`);
    else if (keep[k - 1]) out.push('  …');
  });
  return out.join('\n');
}
