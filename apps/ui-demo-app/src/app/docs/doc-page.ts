import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentDoc } from './doc-types';
import { TokenTable } from './token-table';

/**
 * A component documentation page in three sections, as in the design system:
 * Showcase (the projected live component) · API · CSS tokens.
 */
@Component({
  selector: 'app-doc-page',
  imports: [TokenTable],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'doc' },
  template: `
    <header>
      <h1>{{ doc().title }}</h1>
      <p [innerHTML]="doc().summary"></p>
      <div class="doc-meta">@for (m of doc().meta; track m) { <code>{{ m }}</code> }</div>
    </header>

    <section class="doc-section" aria-labelledby="doc-showcase">
      <h2 id="doc-showcase">Showcase</h2>
      <div class="doc-stage"><ng-content /></div>
    </section>

    <section class="doc-section" aria-labelledby="doc-api">
      <h2 id="doc-api">API</h2>
      @for (b of doc().blocks; track $index) {
        @switch (b.kind) {
          @case ('heading') { <h3>{{ b.text }}</h3> }
          @case ('table') {
            <div class="doc-table-wrap">
              <table class="doc-table">
                <thead><tr>@for (h of b.head; track $index) { <th>{{ h }}</th> }</tr></thead>
                <tbody>
                  @for (row of b.rows; track $index) {
                    <tr>@for (cell of row; track $index) { <td [innerHTML]="cell"></td> }</tr>
                  }
                </tbody>
              </table>
            </div>
          }
          @case ('empty') { <div class="doc-empty">{{ b.text }}</div> }
          @case ('html') { <div class="doc-p" [innerHTML]="b.html"></div> }
          @case ('code') { <pre class="doc-code">{{ b.code }}</pre> }
        }
      }
    </section>

    <section class="doc-section" aria-labelledby="doc-tokens">
      <h2 id="doc-tokens">CSS tokens</h2>
      <app-token-table [names]="doc().tokens" />
    </section>
  `,
})
export class DocPage {
  readonly doc = input.required<ComponentDoc>();
}
