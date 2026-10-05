import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-switch-showcase', imports: [PAPER_UI, FormField], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row">
      <lib-switch>Off</lib-switch>
      <lib-switch [checked]="true">On</lib-switch>
      <lib-switch [checked]="true" disabled>Disabled</lib-switch>
      <lib-switch [formField]="f.notifications">Notifications (Signal Forms: {{ model().notifications }})</lib-switch>
    </div>`,
})
export class SwitchShowcase {
  readonly model = signal({ notifications: true });
  readonly f = form(this.model);
}
