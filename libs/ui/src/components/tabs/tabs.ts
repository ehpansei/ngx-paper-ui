import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { Icon, IconName } from '../icon';
import { Badge } from '../badge';

export interface TabItem { value: string; label: string; icon?: IconName; count?: number }

/** <lib-tabs [items]="tabs" [(value)]="tab" /> */
@Component({
  selector: 'lib-tabs',
  standalone: true,
  imports: [Icon, Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-tabs', role: 'tablist', '(keydown)': 'onKey($event)' },
  templateUrl: './tabs.html',
})
export class Tabs {
  readonly items = input.required<TabItem[]>();
  /** Two-way: [(value)]. Defaults to the first item. */
  readonly value = model<string>();
  readonly current = computed(() => this.value() ?? this.items()[0]?.value);
  onKey(e: KeyboardEvent) {
    const i = this.items().findIndex(t => t.value === this.current()), n = this.items().length;
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : -1;
    if (next >= 0) { e.preventDefault(); this.value.set(this.items()[next].value); }
  }
}
