import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { PAPER_UI, SelectOption } from 'ngx-paper-ui';

@Component({
  selector: 'app-select-showcase', imports: [PAPER_UI, FormField], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row top" style="min-height:190px">
      <lib-select label="Closed" [options]="roles" placeholder="Role" />
      <lib-select label="Open" [options]="roles" [value]="'editor'" defaultOpen />
      <lib-select label="Disabled" [options]="roles" [value]="'viewer'" disabled />
      <lib-select label="Signal Forms" [options]="roles" [formField]="f.role" />
    </div>
    <div class="doc-note">Signal Forms value: <code>{{ model().role ?? 'null' }}</code> · open it and pick with the keyboard (↑ ↓ Enter).</div>`,
})
export class SelectShowcase {
  readonly roles: SelectOption[] = [{ value: 'viewer', label: 'Viewer' }, { value: 'editor', label: 'Editor' }, { value: 'admin', label: 'Admin' }, { value: 'owner', label: 'Owner' }];
  readonly model = signal<{ role: string | null }>({ role: null });
  readonly f = form(this.model, p => { required(p.role, { message: 'Choose a role' }); });
}
