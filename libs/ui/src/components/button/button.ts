import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon, IconName } from '../icon';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * <button libButton variant="primary" icon="plus">Create</button>
 * Attribute component on a native <button> or <a>, so type, disabled, routerLink, form submit all work natively.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- attribute component on a native element
  selector: 'button[libButton], a[libButton]',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'iconOnly() ? label() : null',
  },
  templateUrl: './button.html',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly icon = input<IconName>();
  readonly iconRight = input<IconName>();
  /** Square icon-only button. Requires `label`. */
  readonly iconOnly = input(false, { transform: booleanAttribute });
  /** Accessible name for icon-only buttons. */
  readonly label = input<string>();

  readonly classes = computed(() =>
    ['ui-btn', 'ui-btn-' + this.variant(), this.size() !== 'md' ? 'ui-btn-' + this.size() : '', this.iconOnly() ? 'ui-btn-icon-only' : '']
      .filter(Boolean).join(' '));
}
