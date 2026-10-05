import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-sidebar-user-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-sidebar-strip" style="gap:12px">
      <lib-sidebar-user name="Pedro Castro" email="pedro@example.com"><button libButton variant="ghost" size="sm" icon="log-out" iconOnly label="Sign out"></button></lib-sidebar-user>
      <lib-sidebar-user name="Ana Silva" email="ana.silva@a-very-long-company-domain.com" tone="alt" />
    </div>`,
})
export class SidebarUserShowcase {}
