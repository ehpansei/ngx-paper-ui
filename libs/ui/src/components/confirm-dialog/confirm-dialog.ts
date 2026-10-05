import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconName } from '../icon';
import { Button } from '../button';
import { Modal } from '../modal';

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'neutral';
  icon?: IconName | null;
}

/** <lib-confirm-dialog title="Delete “Report”?" description="…" (confirm)="…" (cancel)="…" /> — usually opened via ConfirmService. */
@Component({
  selector: 'lib-confirm-dialog',
  standalone: true,
  imports: [Modal, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  readonly title = input('Delete this item?');
  readonly description = input<string>();
  readonly confirmLabel = input('Delete');
  readonly cancelLabel = input('Cancel');
  readonly tone = input<'danger' | 'neutral'>('danger');
  readonly icon = input<IconName | null>('trash');
  readonly confirm = output<void>();
  // eslint-disable-next-line @angular-eslint/no-output-native -- the design system's API name
  readonly cancel = output<void>();
}
