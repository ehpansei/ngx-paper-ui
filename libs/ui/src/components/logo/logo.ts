import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon, IconName } from '../icon';

/** <lib-logo name="Acme" /> — primary tile + product name. */
@Component({
  selector: 'lib-logo',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-logo' },
  templateUrl: './logo.html',
})
export class Logo {
  readonly name = input('Paper UI');
  readonly icon = input<IconName>();
  readonly markOnly = input(false, { transform: booleanAttribute });
  readonly initial = computed(() => this.name().charAt(0).toUpperCase());
}
