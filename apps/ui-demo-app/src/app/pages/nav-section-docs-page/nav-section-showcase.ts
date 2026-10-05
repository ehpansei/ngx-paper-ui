import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-nav-section-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row top">
      <div class="doc-sidebar-strip">
        <lib-nav-section title="Main menu">
          <button libNavItem icon="home" active>Dashboard</button>
          <button libNavItem icon="inbox" [count]="12">Inbox</button>
          <button libNavItem icon="folder" [count]="8">Projects</button>
          <button libNavItem icon="user">Team</button>
        </lib-nav-section>
      </div>
      <div class="doc-sidebar-strip" style="gap: var(--space-5)">
        <lib-nav-section title="Forms" collapsible [(expanded)]="formsOpen">
          <button libNavItem>Text input</button>
          <button libNavItem>Select</button>
          <lib-nav-section title="Passwords" collapsible>
            <button libNavItem active>Password field</button>
            <button libNavItem>Strength meter</button>
          </lib-nav-section>
          <button libNavItem>Checkbox</button>
        </lib-nav-section>
        <lib-nav-section title="Feedback" collapsible [expanded]="false">
          <button libNavItem>Toast</button>
          <button libNavItem>Modal</button>
        </lib-nav-section>
      </div>
    </div>`,
})
export class NavSectionShowcase {
  readonly formsOpen = signal(true);
}
