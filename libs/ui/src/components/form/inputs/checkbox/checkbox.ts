import { booleanAttribute, ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import type { FormCheckboxControl } from '@angular/forms/signals';
import { Icon } from '../../../icon';
import { FieldControl } from '../../field-control';

/** <lib-checkbox [formField]="settings.notify">Notify members</lib-checkbox> — FormCheckboxControl. */
@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox.html',
})
export class Checkbox extends FieldControl implements FormCheckboxControl {
  /** Bound by [formField], or two-way with [(checked)]. */
  readonly checked = model(false);
  readonly indeterminate = input(false, { transform: booleanAttribute });
}
