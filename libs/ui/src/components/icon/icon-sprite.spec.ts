import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ICON_NAMES } from './icon-names';
import { ICON_SPRITE_SVG } from './icon-sprite-data';

// Guards against a stale generation: run `nx run ui:icons` after changing src/assets/icons/.
describe('icon sprite', () => {
  const assets = join(__dirname, '../../assets');
  const files = readdirSync(join(assets, 'icons')).filter((f) => f.endsWith('.svg')).map((f) => f.slice(0, -4)).sort((a, b) => a.localeCompare(b, 'en'));
  const symbols = [...readFileSync(join(assets, 'icons.svg'), 'utf8').matchAll(/<symbol id="([\w-]+)"/g)].map((m) => m[1]);

  it('has one symbol and one generated name per icon file', () => {
    expect(symbols).toEqual(files);
    expect([...ICON_NAMES]).toEqual(files);
  });

  it('keeps colour and stroke on the rendering <svg>, not in the symbols', () => {
    const sprite = readFileSync(join(assets, 'icons.svg'), 'utf8');
    expect(sprite).not.toMatch(/stroke-width|stroke="(?!none)/);
  });

  it('inlines the same sprite for provideInlineIconSprite()', () => {
    expect(ICON_SPRITE_SVG).toBe(readFileSync(join(assets, 'icons.svg'), 'utf8').replace(/\n\s*/g, ''));
  });
});
