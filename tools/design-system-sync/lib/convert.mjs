/*
 * Reversible conversions between repo files and their design-system form.
 */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { read } from './fsutil.mjs';
import { PAPER_UI_CSS, STYLES_ENTRY } from './paths.mjs';

/* ---------- Icons: the repo draws in currentColor; the DS shows files via <img>, which can't inherit ---------- */

export const ICON_INK = '#6b5a47'; // on-surface-muted, light theme (the DS Icons README)
/** DS form: fixed ink, and an intrinsic 24×24 size for <img> tiles. */
export const iconToDs = (svg) =>
  svg.replaceAll('"currentColor"', `"${ICON_INK}"`).replace(/<svg\b(?![^>]*\swidth=)/, '<svg width="24" height="24"');
/** Repo form: currentColor, no intrinsic size (<lib-icon> sizes it), one shape per line. */
export const iconFromDs = (svg) =>
  svg
    .replaceAll(`"${ICON_INK}"`, '"currentColor"')
    .replace(/<svg\b([^>]*)>/, (_, a) => `<svg${a.replace(/\s(width|height)="[^"]*"/g, '')}>`)
    .replace(/<(\w+)([^<>]*?)\s*><\/\1>/g, '<$1$2/>')
    .replace(/>\s*</g, '>\n  <')
    .replace(/\n {2}<\/svg>/, '\n</svg>')
    .trimEnd() + '\n';

/* ---------- bundle.css: paper-ui/*.css joined in import order; splits back by section header ---------- */

const FONT_IMPORT = /^@import url\([^)]*fonts\.googleapis[^)]*\);\s*$/m;
const SECTION = /^\/\* ---- /;

/** The component CSS files, in the order index.css imports them. */
export function cssParts() {
  const entry = read(STYLES_ENTRY);
  const files = [...entry.matchAll(/@import "\.\/paper-ui\/([\w-]+\.css)";/g)].map((m) => m[1]);
  const onDisk = readdirSync(PAPER_UI_CSS).filter((f) => f.endsWith('.css'));
  const missing = onDisk.filter((f) => !files.includes(f));
  if (missing.length) throw new Error(`paper-ui/${missing.join(', ')} not imported by index.css`);
  return files.map((file) => ({ file, text: read(join(PAPER_UI_CSS, file)) }));
}

export function joinCss(parts = cssParts()) {
  const font = read(STYLES_ENTRY).match(FONT_IMPORT)?.[0];
  return (font ? font + '\n\n' : '') + parts.map((p) => p.text.trimEnd()).join('\n') + '\n';
}

/**
 * Splits a DS bundle.css back into the repo files. Each `/* ---- X` section goes to the file that has that
 * header today; an unknown header stays with the section before it (reported in `unplaced`).
 */
export function splitCss(bundle, parts = cssParts()) {
  const owner = new Map();
  for (const p of parts) for (const line of p.text.split('\n')) if (SECTION.test(line)) owner.set(sectionKey(line), p.file);
  const out = new Map(parts.map((p) => [p.file, []]));
  const unplaced = [];
  let current = parts[0].file;
  for (const line of bundle.replace(FONT_IMPORT, '').replace(/^\s+/, '').split('\n')) {
    if (SECTION.test(line)) {
      const f = owner.get(sectionKey(line));
      if (f) current = f;
      else unplaced.push(line.trim());
    }
    out.get(current).push(line);
  }
  return {
    files: [...out].map(([file, lines]) => ({ file, text: lines.join('\n').trimEnd() + '\n' })),
    unplaced,
  };
}

const sectionKey = (line) => line.replace(/^\/\* ---- /, '').replace(/ ----.*$/, '').replace(/\(.*$/, '').trim().toLowerCase();

/* ---------- README.md: the page appends a generated part below a `---` rule; only the author's part syncs ---------- */

const GENERATED = /\n-{3,}\s*\n+## Consuming this system[\s\S]*$/;
export const authorPart = (md) => (md ?? '').replace(GENERATED, '').trimEnd() + '\n';
export const generatedPart = (md) => (md ?? '').match(GENERATED)?.[0] ?? '';

/* ---------- pu → lib renames (first sync: the DS's prose moves to the repo's names) ---------- */

const FNS = { puUid: 'uid', puScorePassword: 'scorePassword', puContrast: 'contrast', puOnColor: 'onColor', puThemeVars: 'themeVars' };
/** `source`: the repo file a card documents; the DS cited its old grouped file (components/src/angular/*.ts). */
export function puToLib(s, source = 'libs/ui/src') {
  for (const [a, b] of Object.entries(FNS)) s = s.replaceAll(a, b);
  return s
    .replace(/(?:components\/)?src\/angular\/[\w.-]+\.ts/g, source)
    .replace(/`pu-` \/ `pu…`/g, '`lib-` / `lib…`')
    .replace(/classes `Pu…`/g, 'classes unprefixed (`Button`, `TextInput`)')
    .replace(/\bPU_/g, '')
    .replace(/\bPu([A-Z]\w*)/g, '$1')
    .replace(/\bpu([A-Z]\w*)/g, 'lib$1')
    .replace(/\bpu-([a-z])/g, 'lib-$1');
}
