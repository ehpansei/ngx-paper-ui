import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, IconName } from '../icon';

/**
 * <a libNavItem routerLink="/projects" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive" icon="folder" [count]="4">Projects</a>
 * On an <a> (routing) or a <button> (actions).
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- attribute component on a native element
  selector: 'a[libNavItem], button[libNavItem]',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-nav-item',
    '[class.is-active]': 'active() && !disabled()',
    '[class.is-disabled]': 'disabled()',
    '[attr.aria-current]': 'active() && !disabled() ? "page" : null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    '(click)': 'disabled() && $event.preventDefault(); disabled() && $event.stopImmediatePropagation()',
  },
  templateUrl: './nav-item.html',
})
export class NavItem {
  readonly icon = input<IconName>();
  readonly active = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly count = input<number | null>(null);
}
