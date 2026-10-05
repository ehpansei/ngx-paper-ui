import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { authorPart, cssParts, generatedPart, iconFromDs, iconToDs, joinCss, puToLib, splitCss } from './convert.mjs';
import { hash } from './fsutil.mjs';
import { ICONS_DIR } from './paths.mjs';

describe('icons', () => {
  const names = readdirSync(ICONS_DIR).filter((f) => f.endsWith('.svg'));

  it.each(names)('%s round-trips repo → DS → repo', (name) => {
    const repo = readFileSync(join(ICONS_DIR, name), 'utf8');
    const ds = iconToDs(repo);
    expect(ds).toContain('stroke="#6b5a47"');
    expect(ds).toContain('width="24"');
    expect(iconFromDs(ds)).toBe(repo);
  });

  it('compares by drawing, not serialisation', () => {
    const page = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b5a47"><path d="M5 12h14"></path></svg>';
    const ours = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#6b5a47">\n  <path d="M5 12h14"/>\n</svg>\n';
    expect(hash('a.svg', page)).toBe(hash('a.svg', ours));
    expect(hash('a.svg', page)).not.toBe(hash('a.svg', ours.replace('M5', 'M6')));
  });
});

describe('bundle.css', () => {
  it('joins the component CSS and splits it back into the same files', () => {
    const parts = cssParts();
    const { files, unplaced } = splitCss(joinCss(parts), parts);
    expect(unplaced).toEqual([]);
    expect(files).toEqual(parts.map((p) => ({ file: p.file, text: p.text.trimEnd() + '\n' })));
  });

  it('puts an edited rule back in the file that owns its section', () => {
    const parts = cssParts();
    const edited = joinCss(parts).replace('.ui-btn { font: inherit;', '.ui-btn { font: inherit; letter-spacing: 0.01em;');
    const button = splitCss(edited, parts).files.find((f) => f.file === 'button.css');
    expect(button.text).toContain('letter-spacing: 0.01em');
  });
});

describe('README', () => {
  it('syncs only the author part above the generated section', () => {
    const md = 'Paper UI is warm.\n\n---\n\n## Consuming this system\n\nGenerated.\n';
    expect(authorPart(md)).toBe('Paper UI is warm.\n');
    expect(authorPart(md) + generatedPart(md)).toBe(md.replace(/\n$/, '') + '\n');
  });
});

describe('puToLib', () => {
  it('cites the real source file and translates the prefix conventions', () => {
    expect(puToLib('source `components/src/angular/button.component.ts`.', 'libs/ui/src/components/button/button.ts'))
      .toBe('source `libs/ui/src/components/button/button.ts`.');
    expect(puToLib('selectors `pu-` / `pu…`, classes `Pu…`')).toBe('selectors `lib-` / `lib…`, classes unprefixed (`Button`, `TextInput`)');
  });

  it('maps the design system names to the repo names', () => {
    expect(puToLib('<pu-text-input [formField]="f.name" /> <button puButton>, PuConfirmService, PU_ICONS, puScorePassword()'))
      .toBe('<lib-text-input [formField]="f.name" /> <button libButton>, ConfirmService, ICONS, scorePassword()');
  });
});
