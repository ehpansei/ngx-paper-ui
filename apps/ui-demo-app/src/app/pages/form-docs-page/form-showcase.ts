import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormConfig, FormModel, PAPER_UI, ToastService } from 'ngx-paper-ui';

@Component({
  selector: 'app-form-showcase',
  imports: [PAPER_UI, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-cols two">
      <div class="doc-panel">
        <div class="doc-panel-head"><strong>Create account</strong><code>required · email · minLength · pattern</code></div>
        <lib-form [formConfig]="signup" (submitted)="created($event)" (invalidSubmit)="blocked.set(blocked() + 1)">
          <div class="doc-row"><button libButton type="submit" icon="plus">Create account</button></div>
        </lib-form>
        <div class="doc-note">
          Press <strong>Create account</strong> with the form empty to see every error, then fill it in.
          @if (blocked()) { Blocked submits: <code>{{ blocked() }}</code>. }
        </div>
        @if (account(); as a) { <pre class="doc-code">submitted: {{ a | json }}</pre> }
      </div>

      <div class="doc-panel">
        <div class="doc-panel-head"><strong>Account settings</strong><code>value · disabled · helper</code></div>
        <lib-form [formConfig]="settings" (submitted)="saved.set($event)">
          <div class="doc-row"><button libButton type="submit">Save changes</button></div>
        </lib-form>
        <div class="doc-note">Pre-filled from each field's <code>value</code>; the plan is <code>disabled</code> but still submitted.</div>
        @if (saved(); as s) { <pre class="doc-code">submitted: {{ s | json }}</pre> }
      </div>
    </div>

    <div class="doc-cols two">
      <div class="doc-col"><span class="doc-label" style="width:auto">Create account config</span><pre class="doc-code">{{ signup | json }}</pre></div>
      <div class="doc-col"><span class="doc-label" style="width:auto">Account settings config</span><pre class="doc-code">{{ settings | json }}</pre></div>
    </div>
    <lib-toaster />
  `,
})
export class FormShowcase {
  private readonly toast = inject(ToastService);

  // The configs are plain data; the panels below print these same objects, so the docs can't drift.
  readonly signup: FormConfig = [
    { controlType: 'input', key: 'name', label: 'Full name', placeholder: 'Ana Silva', required: true, minLength: 2 },
    { controlType: 'input', key: 'email', label: 'Email', type: 'email', placeholder: 'ana@example.com', required: 'Add your email', email: true },
    {
      controlType: 'input', key: 'website', label: 'Website', type: 'url', placeholder: 'https://', helper: 'Optional',
      pattern: { value: '^https?://', message: 'Start with http:// or https://' },
    },
    {
      controlType: 'select', key: 'role', label: 'Role', required: 'Choose a role',
      options: [{ value: 'viewer', label: 'Viewer' }, { value: 'editor', label: 'Editor' }, { value: 'admin', label: 'Admin' }],
    },
  ];

  readonly settings: FormConfig = [
    { controlType: 'input', key: 'displayName', label: 'Display name', value: 'Pedro Castro', required: true, maxLength: { value: 40, message: 'Keep it under 40 characters' } },
    { controlType: 'input', key: 'plan', label: 'Plan', value: 'Free', disabled: true, helper: 'Change your plan in Billing' },
    {
      controlType: 'select', key: 'timeout', label: 'Lock after', value: 15, helper: 'Vault locks itself when idle',
      options: [{ value: 5, label: '5 minutes' }, { value: 15, label: '15 minutes' }, { value: 60, label: '1 hour' }],
    },
  ];

  readonly account = signal<FormModel | null>(null);
  readonly saved = signal<FormModel | null>(null);
  readonly blocked = signal(0);

  created(value: FormModel) {
    this.account.set(value);
    this.toast.show('Account created');
  }
}
