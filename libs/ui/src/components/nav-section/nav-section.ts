import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { uid } from '../form/uid';
import { Icon } from '../icon';

/**
 * <lib-nav-section title="Main menu"> <a libNavItem …> … </lib-nav-section>
 * `collapsible` turns the title into a toggle; `[(expanded)]` holds its state. Nest a section inside another
 * for a sub-group (rendered as a `role="group"`, not a second `<nav>`).
 */
@Component({
  selector: 'lib-nav-section',
  standalone: true,
  imports: [Icon, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-section.html',
})
export class NavSection {
  readonly title = input<string>();
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly expanded = model(true);

  protected readonly nested = !!inject(NavSection, { optional: true, skipSelf: true });
  protected readonly itemsId = uid('ui-nav-section');

  toggle() {
    this.expanded.update((e) => !e);
  }
}
