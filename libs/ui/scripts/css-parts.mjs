/*
 * The component stylesheet as one file: paper-ui/*.css in the order src/styles/index.css imports them.
 * Shared by build-styles.mjs (the published paper-ui.css) and the design-system sync
 * (components/bundle.css), so both join the parts the same way.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const STYLES_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/styles');
export const STYLES_ENTRY = join(STYLES_DIR, 'index.css');
export const PAPER_UI_CSS = join(STYLES_DIR, 'paper-ui');

export const FONT_IMPORT = /^@import url\([^)]*fonts\.googleapis[^)]*\);\s*$/m;

const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null);

/** The component CSS files, in the order index.css imports them. */
export function cssParts() {
  const entry = read(STYLES_ENTRY);
  const files = [...entry.matchAll(/@import "\.\/paper-ui\/([\w-]+\.css)";/g)].map((m) => m[1]);
  const onDisk = readdirSync(PAPER_UI_CSS).filter((f) => f.endsWith('.css'));
  const missing = onDisk.filter((f) => !files.includes(f));
  if (missing.length) throw new Error(`paper-ui/${missing.join(', ')} not imported by index.css`);
  return files.map((file) => ({ file, text: read(join(PAPER_UI_CSS, file)) }));
}

/** The Inter `@import url(…)` line from index.css, if any. */
export const fontImport = () => read(STYLES_ENTRY).match(FONT_IMPORT)?.[0];

/** The parts joined, preceded by the font import unless `font: false`. */
export function joinCss(parts = cssParts(), { font = true } = {}) {
  const line = font ? fontImport() : undefined;
  return (line ? line + '\n\n' : '') + parts.map((p) => p.text.trimEnd()).join('\n') + '\n';
}
