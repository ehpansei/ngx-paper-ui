import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Icon, IconName } from '../icon';

/** <lib-toast icon="check">Changes saved</lib-toast> — presentational; normally rendered by <lib-toaster>. */
@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-toast', role: 'status', 'aria-live': 'polite' },
  templateUrl: './toast.html',
})
export class Toast {
  readonly icon = input<IconName>('check');
  readonly dismissible = input(false, { transform: booleanAttribute });
  readonly dismissed = output<void>();
}
