import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { Avatar } from '../../components/avatar';
import { Icon } from '../../components/icon';
import { Logo } from '../../components/logo';

/**
 * Responsive app layout, mobile first (container queries on the component's own width):
 *  - < 768px (mobile): a header with hamburger, brand and user avatar; the sidebar is a drawer opened from the
 *    hamburger; the main view fills the screen; when `detailOpen` is true the detail takes over the whole view,
 *    with a Back button.
 *  - ≥ 768px (md) and ≥ 1024px (lg): the classic sidebar · main · detail columns.
 *
 * <lib-main-view title="Projects" brandName="Acme" userName="Pedro Castro" [(detailOpen)]="detailOpen">
 *   <lib-sidebar libMainSidebar>…</lib-sidebar>
 *   <button libButton libMainActions icon="plus">New project</button>
 *   …main content…
 *   <lib-detail-view libMainDetail …/>
 * </lib-main-view>
 */
@Component({
  selector: 'lib-main-view',
  standalone: true,
  imports: [Icon, Logo, Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-app',
    '[class.is-nav-open]': 'sidebarOpen()',
    '[class.is-detail-open]': 'detailOpen()',
    '(keydown.escape)': 'onEscape()',
  },
  templateUrl: './main-view.html',
})
export class MainView {
  private static seq = 0;
  readonly navId = `lib-main-nav-${++MainView.seq}`;
  readonly title = input<string>();
  /** Product name for the mobile header logo (ignored when [libMainBrand] is projected). */
  readonly brandName = input('Paper UI');
  /** Name for the mobile header avatar (ignored when [libMainUser] is projected). */
  readonly userName = input<string>();
  /** Shows the detail: a column on md+, the whole view on mobile. Two-way: [(detailOpen)]. */
  readonly detailOpen = model(false);
  /** Mobile drawer state. Two-way: [(sidebarOpen)]. */
  readonly sidebarOpen = model(false);
  readonly backLabel = input('Back');
  readonly detailLabel = input('Details');

  onEscape() { if (this.sidebarOpen()) this.sidebarOpen.set(false); else if (this.detailOpen()) this.detailOpen.set(false); }
  /** Picking a destination in the mobile drawer closes it. */
  onNavClick(e: Event) { if ((e.target as HTMLElement).closest('.ui-nav-item:not(.is-disabled)')) this.sidebarOpen.set(false); }
}
