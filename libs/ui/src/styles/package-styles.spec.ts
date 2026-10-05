import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Guards the published stylesheet (package/paper-ui.css) against a stale generation:
// it's built from tokens/ and paper-ui/ by `nx run ui:styles`.
describe('published stylesheet', () => {
  const dir = __dirname;
  const read = (p: string) => readFileSync(join(dir, p), 'utf8');
  const plain = read('package/paper-ui.css');
  const parts = readdirSync(join(dir, 'paper-ui')).filter((f) => f.endsWith('.css'));

  it('paper-ui.css has every paper-ui/*.css rule and the tokens, as plain CSS', () => {
    const missing = parts.filter((f) => !plain.includes(read(`paper-ui/${f}`).trim()));
    expect(missing).toEqual([]);
    expect(plain).toContain(read('tokens/tokens.css').trim());
    expect(plain).not.toMatch(/@theme|@apply|@layer/);
    expect(plain.trimStart()).toMatch(/^@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Inter/);
  });

  it('keeps the component parts in the order index.css imports them', () => {
    const order = [...read('index.css').matchAll(/@import "\.\/paper-ui\/([\w-]+\.css)";/g)].map((m) => m[1]);
    const at = order.map((f) => plain.indexOf(read(`paper-ui/${f}`).trim()));
    expect(at).toEqual([...at].sort((a, b) => a - b));
  });
});
