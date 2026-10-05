import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Guards against a stale generation: tokens.json is the source (synced with the design system);
// run `nx run ui:tokens` after changing it.
describe('design tokens', () => {
  const dir = __dirname;
  const source = readFileSync(join(dir, 'tokens.json'), 'utf8');
  const tokens = JSON.parse(source);
  const css = readFileSync(join(dir, 'tokens.css'), 'utf8');
  const derived = new Set<string>(JSON.parse(readFileSync(join(dir, 'derived-tokens.json'), 'utf8')));

  it('the docs site copies match', () => {
    const docs = join(dir, '../../../../../apps/ui-demo-app/src/app/docs');
    expect(readFileSync(join(docs, 'tokens.json'), 'utf8')).toBe(source);
    expect(readFileSync(join(docs, 'derived-tokens.json'), 'utf8')).toBe(readFileSync(join(dir, 'derived-tokens.json'), 'utf8'));
  });

  it('tokens.css declares every non-derived token with its light value', () => {
    const missing: string[] = [];
    for (const family of ['color', 'spacing', 'radius', 'shadow', 'typeScale', 'size', 'opacity', 'breakpoint']) {
      for (const t of tokens[family]?.tokens ?? []) {
        const value = typeof t.value === 'string' ? t.value : t.value.light;
        const declared = css.includes(`--${t.name}: ${String(value).replace(/^\{([\w.-]+)\}$/, 'var(--$1)')};`);
        if (derived.has(t.name)) expect(css, `${t.name} is derived; tokens.css must not set it`).not.toContain(`--${t.name}:`);
        else if (!declared) missing.push(css.includes(`--${t.name}:`) ? `${t.name} (stale value)` : t.name);
      }
    }
    expect(missing).toEqual([]);
  });
});
