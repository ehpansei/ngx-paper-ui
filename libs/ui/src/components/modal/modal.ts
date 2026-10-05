import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Icon, IconName } from '../icon';
import { Button } from '../button';

/**
 * Presentational dialog panel. Open it with the CDK Dialog (DialogService.open) so you get focus trap,
 * Escape to close, scroll blocking and the scrim — or render it inline in docs.
 *
 * <lib-modal title="New project" (closed)="ref.close()">
 *   …form…
 *   <ng-container libModalFooter><button libButton variant="secondary">Cancel</button><button libButton>Create</button></ng-container>
 * </lib-modal>
 */
@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [Icon, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-modal', '[attr.role]': 'role()', 'aria-modal': 'true', '[attr.aria-labelledby]': 'titleId' },
  templateUrl: './modal.html',
})
export class Modal {
  private static seq = 0;
  readonly titleId = `lib-modal-title-${++Modal.seq}`;
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly icon = input<IconName>();
  readonly iconTone = input<'neutral' | 'primary' | 'danger'>('neutral');
  readonly role = input<'dialog' | 'alertdialog'>('dialog');
  readonly closable = input(true, { transform: booleanAttribute });
  readonly closed = output<void>();
}
