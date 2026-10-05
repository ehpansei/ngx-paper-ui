import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DERIVED_TOKENS, TOKEN_FAMILIES, TYPE_STYLES, tokenValue } from '../../docs/design-tokens';
import { TokenTable } from '../../docs/token-table';

/** Every token family from tokens.json. Colours render in both themes side by side. */
@Component({
  selector: 'app-tokens-page',
  imports: [TokenTable],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'doc' },
  template: `
    <header>
      <h1>Tokens</h1>
      <p>
        Two themes on the same token names. Components read tokens, never hex. <code>primary</code> and
        <code>on-primary</code> are the only configurable colours; tokens marked derived follow them.
      </p>
      <div class="doc-meta"><code>libs/ui/src/styles/tokens/tokens.css</code></div>
    </header>

    <section class="doc-section" aria-labelledby="tok-color">
      <h2 id="tok-color">Color</h2>
      <div class="doc-table-wrap">
        <table class="doc-table">
          <thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Usage</th></tr></thead>
          <tbody>
            @for (t of colors.tokens; track t.name) {
              <tr>
                <td><code>--{{ t.name }}</code>@if (derived.has(t.name)) { <span class="doc-derived">derived</span> }</td>
                <td><div class="doc-theme-cell" data-theme="light"><span class="doc-sw" [style.background]="'var(--' + t.name + ')'"></span><code>{{ value(t, 'light') }}</code></div></td>
                <td><div class="doc-theme-cell" data-theme="dark"><span class="doc-sw" [style.background]="'var(--' + t.name + ')'"></span><code>{{ value(t, 'dark') }}</code></div></td>
                <td>{{ t.usage }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <section class="doc-section" aria-labelledby="tok-type">
      <h2 id="tok-type">Typography</h2>
      <p class="doc-p">Inter only (400, 500, 600, 700), from Google Fonts. Apply with <code>.type-&lt;style&gt;</code>.</p>
      <div class="doc-col">
        @for (s of typeStyles; track s.name) {
          <div class="doc-type-row">
            <div class="doc-type-name"><strong>{{ s.name }}</strong><code>{{ s.fontSize }}/{{ s.lineHeight }} · {{ s.fontWeight }}</code></div>
            <div [class]="'type-' + s.name">{{ s.sample }}</div>
            <div class="doc-note">{{ s.usage }}</div>
          </div>
        }
      </div>
    </section>

    @for (f of others; track f.key) {
      <section class="doc-section" [attr.aria-labelledby]="'tok-' + f.key">
        <h2 [id]="'tok-' + f.key">{{ f.label }}</h2>
        <app-token-table [names]="names(f.tokens)" />
        @if (f.key === 'breakpoint') {
          <p class="doc-p">
            Mobile first: start at the smallest width and add structure with <code>min-width</code> queries.
            CSS can't read <code>var()</code> in a query condition, so write the values in your queries. Prefer
            container queries, as <code>lib-main-view</code> does, so a layout adapts to the space it's given rather
            than to the window.
          </p>
          <pre class="doc-code">{{ containerSnippet }}</pre>
        }
      </section>
    }
  `,
})
export class TokensPage {
  protected readonly colors = TOKEN_FAMILIES.find((f) => f.key === 'color') ?? TOKEN_FAMILIES[0];
  protected readonly others = TOKEN_FAMILIES.filter((f) => f.key !== 'color');
  protected readonly typeStyles = TYPE_STYLES;
  protected readonly derived = DERIVED_TOKENS;
  protected readonly value = tokenValue;
  protected readonly names = (tokens: { name: string }[]) => tokens.map((t) => t.name);
  protected readonly containerSnippet = `.orders { container: orders / inline-size; }
.orders-grid { display: grid; gap: var(--space-4); }
@container orders (min-width: 768px) {
  .orders-grid { grid-template-columns: 1fr 1fr; }
}`;
}
