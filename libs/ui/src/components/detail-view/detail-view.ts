import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Icon, IconName } from '../icon';
import { Badge, BadgeSpec } from '../badge';
import { Button } from '../button';
import { PasswordField, Strength, StrengthMeter, TextInput } from '../form/inputs';

export interface DetailField { label: string; value: string; copyable?: boolean }

/**
 * <lib-detail-view title="figma.com" href="https://figma.com" [fields]="fields" [password]="pw"
 *   editable deletable (copied)="toast.show($event + ' copied')" (edit)="…" (delete)="confirmDelete()" meta="Updated Sep 12" />
 */
@Component({
  selector: 'lib-detail-view',
  standalone: true,
  imports: [Icon, Badge, Button, TextInput, PasswordField, StrengthMeter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-detail', role: 'region', '[attr.aria-label]': 'title()' },
  templateUrl: './detail-view.html',
})
export class DetailView {
  private readonly clipboard = inject(Clipboard);
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly href = input<string>();
  readonly icon = input<IconName>();
  readonly badges = input<BadgeSpec[]>([]);
  readonly fields = input<DetailField[]>([]);
  readonly password = input<string | null>(null);
  readonly passwordLabel = input('Password');
  readonly strength = input<Strength>();
  readonly strengthHint = input<string>();
  readonly showStrength = input(true, { transform: booleanAttribute });
  readonly meta = input<string>();
  readonly editable = input(false, { transform: booleanAttribute });
  readonly deletable = input(false, { transform: booleanAttribute });
  /** Emits the label of the field that was copied. */
  readonly copied = output<string>();
  readonly edit = output<void>();
  readonly delete = output<void>();
  readonly displayHref = computed(() => (this.href() ?? '').replace(/^https?:\/\//, ''));

  copy(label: string, value: string) { if (this.clipboard.copy(value)) this.copied.emit(label); }
}
