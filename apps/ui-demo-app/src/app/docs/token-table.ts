import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DERIVED_TOKENS, DesignToken, findToken, tokenValue } from './design-tokens';

interface Row {
  name: string;
  family: string;
  light: string;
  dark: string;
  usage: string;
  derived: boolean;
}

/** <app-token-table [names]="['primary', 'surface']" /> — every token a component reads, with light/dark values. */
@Component({
  selector: 'app-token-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (rows().length) {
      <div class="doc-table-wrap">
        <table class="doc-table">
          <thead><tr><th>Token</th><th>Value (light / dark)</th><th>Usage</th></tr></thead>
          <tbody>
            @for (r of rows(); track r.name) {
              <tr>
                <td><code>--{{ r.name }}</code>@if (r.derived) { <span class="doc-derived">derived</span> }</td>
                <td>
                  <div class="doc-swatch-cell">
                    @switch (r.family) {
                      @case ('color') { <span class="doc-sw" [style.background]="'var(--' + r.name + ')'"></span> }
                      @case ('shadow') { <span class="doc-sw is-shadow" [style.box-shadow]="'var(--' + r.name + ')'"></span> }
                      @case ('spacing') { <span class="doc-sw is-len" [style.width]="'min(var(--' + r.name + '), 120px)'"></span> }
                      @case ('size') { <span class="doc-sw is-len" [style.width]="'min(var(--' + r.name + '), 120px)'"></span> }
                    }
                    <code>{{ r.light }}</code>@if (r.dark !== r.light) { / <code>{{ r.dark }}</code> }
                  </div>
                </td>
                <td>{{ r.usage }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <div class="doc-empty">None.</div>
    }
  `,
})
export class TokenTable {
  readonly names = input.required<string[]>();

  readonly rows = computed<Row[]>(() =>
    this.names().flatMap((name) => {
      const found = findToken(name);
      if (!found) return [];
      const t: DesignToken = found.token;
      return [{ name, family: found.family, light: tokenValue(t, 'light'), dark: tokenValue(t, 'dark'), usage: t.usage, derived: DERIVED_TOKENS.has(name) }];
    }),
  );
}
