import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IconName, PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-sidebar-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="height:520px;display:flex">
      <lib-sidebar>
        <lib-logo libSidebarLogo name="Acme" />
        <lib-nav-section title="Main menu">
          @for (i of items; track i.label) { <button libNavItem [icon]="i.icon" [count]="i.count ?? null" [active]="active() === i.label" (click)="active.set(i.label)">{{ i.label }}</button> }
        </lib-nav-section>
        <lib-nav-section title="Navigation">
          <button libNavItem icon="bell">Notifications</button>
          <button libNavItem icon="settings" disabled>Settings</button>
        </lib-nav-section>
        <lib-sidebar-user libSidebarFooter name="Pedro Castro" email="pedro@example.com">
          <button libButton variant="ghost" size="sm" icon="log-out" iconOnly label="Sign out"></button>
        </lib-sidebar-user>
      </lib-sidebar>
    </div>`,
})
export class SidebarShowcase {
  readonly active = signal('Dashboard');
  readonly items: { icon: IconName; label: string; count?: number }[] = [{ icon: 'home', label: 'Dashboard' }, { icon: 'inbox', label: 'Inbox', count: 12 }, { icon: 'folder', label: 'Projects', count: 8 }, { icon: 'user', label: 'Team' }];
}
