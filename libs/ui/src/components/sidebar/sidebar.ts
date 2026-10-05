import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Logo } from '../logo';

/**
 * <lib-sidebar>
 *   <lib-logo libSidebarLogo name="Acme" />
 *   <lib-nav-section title="Main menu">…</lib-nav-section>
 *   <lib-sidebar-user libSidebarFooter name="Pedro Castro" email="…" />
 * </lib-sidebar>
 */
@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-sidebar' },
  templateUrl: './sidebar.html',
})
export class Sidebar {}
