import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-text-input-showcase', imports: [PAPER_UI, FormField, JsonPipe], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row top">
      <lib-text-input label="Default" placeholder="Search" leadingIcon="search" />
      <lib-text-input label="Filled" value="Quarterly report" helper="Shown to your team" />
      <lib-text-input label="Disabled" placeholder="Not editable" disabled />
      <lib-text-input label="Error" value="Q" error="Must be at least 3 characters" />
    </div>
    <div class="doc-panel">
      <div class="doc-panel-head"><strong>With Signal Forms</strong><code>[formField]</code></div>
      <div class="doc-row top">
        <lib-text-input label="Project name" [formField]="f.name" helper="3 characters or more" />
        <lib-text-input label="Owner email" type="email" [formField]="f.owner" />
      </div>
      <div class="doc-note">Clear a field and tab away to see validation. Model: <code>{{ model() | json }}</code> · valid: <code>{{ f().valid() }}</code></div>
    </div>`,
})
export class TextInputShowcase {
  readonly model = signal({ name: 'Website redesign', owner: 'pedro@example.com' });
  readonly f = form(this.model, p => {
    required(p.name, { message: 'Name is required' });
    minLength(p.name, 3, { message: 'Must be at least 3 characters' });
    required(p.owner, { message: 'Email is required' });
    email(p.owner, { message: 'Enter a valid email' });
  });
}
