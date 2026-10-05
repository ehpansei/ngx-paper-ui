import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon, IconName } from '../icon';

export type Tone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
export interface BadgeSpec { tone: Tone; label: string }
const BADGE_ICON: Partial<Record<Tone, IconName>> = { danger: 'alert', warning: 'alert', success: 'check', info: 'info' };

/** <lib-badge tone="success">Active</lib-badge> */
@Component({
  selector: 'lib-badge',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"ui-badge ui-badge-" + tone()' },
  templateUrl: './badge.html',
})
export class Badge {
  readonly tone = input<Tone>('neutral');
  /** Defaults per tone; pass null to hide. */
  readonly icon = input<IconName | null | undefined>(undefined);
  readonly resolvedIcon = computed(() => this.icon() === undefined ? BADGE_ICON[this.tone()] : this.icon());
}
