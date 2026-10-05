import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// CSS can't read var() in a @media/@container condition, so query widths in paper-ui/*.css are written out.
// This keeps each one equal to a token in tokens.json's `breakpoint` group (bp-md, bp-lg, bp-list …).
describe('breakpoints', () => {
  const dir = __dirname;
  const tokens: { name: string; value: string }[] = JSON.parse(readFileSync(join(dir, 'tokens/tokens.json'), 'utf8'))
    .breakpoint.tokens;
  const allowed = new Set(tokens.map((t) => t.value));

  /** Every width in a @media/@container condition: `min-width: 768px`, `max-width: …`, `width >= 768px`. */
  const queryWidths = (css: string) =>
    [...css.matchAll(/@(?:media|container)\b([^{]*)\{/g)].flatMap((q) =>
      [...q[1].matchAll(/(?:min-|max-)?width\s*(?::|[<>]=?)\s*([\d.]+[a-z]+)/g)].map((w) => ({
        value: w[1],
        line: css.slice(0, q.index).split('\n').length,
      })),
    );

  it('finds the query widths it guards', () => {
    expect(queryWidths(readFileSync(join(dir, 'paper-ui/main-view.css'), 'utf8')).map((w) => w.value)).toEqual([
      '420px',
      '768px',
      '1024px',
    ]);
  });

  it('uses only breakpoint token values in paper-ui/*.css queries', () => {
    const stray = readdirSync(join(dir, 'paper-ui'))
      .filter((f) => f.endsWith('.css'))
      .flatMap((f) =>
        queryWidths(readFileSync(join(dir, 'paper-ui', f), 'utf8'))
          .filter((w) => !allowed.has(w.value))
          .map((w) => `paper-ui/${f}:${w.line} ${w.value}`),
      );
    expect(stray, `not a breakpoint token (${[...allowed].join(', ')})`).toEqual([]);
  });
});
