import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-nav-item-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-sidebar-strip">
      <button libNavItem icon="home" [count]="12">Dashboard</button>
      <button libNavItem icon="home" [count]="12" disabled>Dashboard</button>
    </div>
    <div class="doc-note">Default and disabled. Active is set with <code>[active]</code> (usually from <code>routerLinkActive</code>).</div>`,
})
export class NavItemShowcase {}
