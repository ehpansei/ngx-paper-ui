import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, validate } from '@angular/forms/signals';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-checkbox-showcase', imports: [PAPER_UI, FormField], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row">
      <lib-checkbox>Unchecked</lib-checkbox>
      <lib-checkbox [checked]="true">Checked</lib-checkbox>
      <lib-checkbox indeterminate>Indeterminate</lib-checkbox>
      <lib-checkbox [checked]="true" disabled>Disabled</lib-checkbox>
    </div>
    <div class="doc-panel">
      <div class="doc-panel-head"><strong>With Signal Forms</strong><code>FormCheckboxControl</code></div>
      <lib-checkbox [formField]="f.terms">I accept the terms</lib-checkbox>
      <div class="doc-note">terms: <code>{{ model().terms }}</code> · valid: <code>{{ f().valid() }}</code></div>
    </div>`,
})
export class CheckboxShowcase {
  readonly model = signal({ terms: false });
  readonly f = form(this.model, p => { validate(p.terms, ({ value }) => value() ? undefined : { kind: 'terms', message: 'Accept the terms to continue' }); });
}
