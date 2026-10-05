import { booleanAttribute, ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { Icon, IconName } from '../../../icon';
import { FieldControl } from '../../field-control';
import { uid } from '../../uid';

/**
 * <lib-text-input label="Name" [formField]="projectForm.name" helper="Shown to your team" />
 * Signal Forms control (FormValueControl<string>). Without a form: [(value)]="name".
 * Project a trailing action with [libTrailing].
 */
@Component({
  selector: 'lib-text-input',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"ui-field" + (block() ? " is-block" : "")' },
  templateUrl: './text-input.html',
})
export class TextInput extends FieldControl implements FormValueControl<string> {
  readonly id = uid('lib-input');
  /** The value. Bound by [formField], or two-way with [(value)]. */
  readonly value = model('');
  readonly label = input<string>();
  readonly placeholder = input('');
  readonly helper = input<string>();
  readonly leadingIcon = input<IconName>();
  readonly type = input<'text' | 'email' | 'search' | 'url' | 'tel'>('text');
  readonly autocomplete = input<string>();
  /** Full width instead of input-width (220px). */
  readonly block = input(false, { transform: booleanAttribute });
}
