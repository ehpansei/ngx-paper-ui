import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, model, output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import type { FormValueControl } from '@angular/forms/signals';
import { Icon } from '../../../icon';
import { FieldControl } from '../../field-control';
import { uid } from '../../uid';

/**
 * <lib-password-field [formField]="signup.password" autocomplete="new-password" [copyable]="false" />
 * Signal Forms control (FormValueControl<string>). Masked by default, with reveal and copy.
 */
@Component({
  selector: 'lib-password-field',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"ui-field" + (block() ? " is-block" : "")' },
  templateUrl: './password-field.html',
})
export class PasswordField extends FieldControl implements FormValueControl<string> {
  private readonly clipboard = inject(Clipboard);
  readonly id = uid('lib-password');
  readonly value = model('');
  readonly label = input<string | null>('Password');
  readonly copyable = input(true, { transform: booleanAttribute });
  /** Two-way: [(revealed)]. */
  readonly revealed = model(false);
  readonly block = input(false, { transform: booleanAttribute });
  readonly autocomplete = input<'current-password' | 'new-password' | 'off'>('off');
  /** Emits after the value was copied to the clipboard; show a Toast from it. */
  readonly copied = output<void>();

  noun() { return (this.label() || 'password').toLowerCase(); }
  copy() { if (this.clipboard.copy(this.value())) this.copied.emit(); }
}
