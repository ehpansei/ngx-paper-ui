import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, minLength } from '@angular/forms/signals';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-password-field-showcase', imports: [PAPER_UI, FormField], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row top">
      <lib-password-field value="c0rrect-Horse-battery!" (copied)="copied.set(true)" />
      <lib-password-field label="Revealed" value="c0rrect-Horse-battery!" [revealed]="true" />
      <lib-password-field label="New password" autocomplete="new-password" [copyable]="false" [formField]="f.password" />
      @if (copied()) { <lib-toast>Password copied</lib-toast> }
    </div>
    <div class="doc-note">The third field is bound with Signal Forms (min 8 characters) — type a few characters and tab away.</div>`,
})
export class PasswordFieldShowcase {
  readonly copied = signal(false);
  readonly model = signal({ password: '' });
  readonly f = form(this.model, p => { minLength(p.password, 8, { message: 'Use at least 8 characters' }); });
}
