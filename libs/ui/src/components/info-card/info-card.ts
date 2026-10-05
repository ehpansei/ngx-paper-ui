import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon, IconName } from '../icon';
import { Badge, BadgeSpec } from '../badge';

/**
 * <button libInfoCard title="github.com" description="pedro@example.com" icon="globe" [badges]="badges" [selected]="sel === id" (click)="sel = id"></button>
 * Project a custom leading node with [libLeading] and trailing content with [libTrailing].
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- attribute component on a native element
  selector: 'button[libInfoCard], a[libInfoCard]',
  standalone: true,
  imports: [Icon, Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-card', '[class.is-selected]': 'selected()', '[attr.aria-pressed]': 'selected() || null' },
  templateUrl: './info-card.html',
})
export class InfoCard {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly icon = input<IconName>();
  readonly badges = input<BadgeSpec[]>([]);
  readonly selected = input(false, { transform: booleanAttribute });
  readonly initial = computed(() => this.title().replace(/^www\./, '').charAt(0).toUpperCase());
}
