import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import type { FormCheckboxControl } from '@angular/forms/signals';
import { FieldControl } from '../../field-control';

/** <lib-switch [formField]="settings.notifications">Notifications</lib-switch> — applies immediately. */
@Component({
  selector: 'lib-switch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './switch.html',
})
export class Switch extends FieldControl implements FormCheckboxControl {
  readonly checked = model(false);
  /** Only when there is no projected label. */
  readonly ariaLabel = input<string>();
}
