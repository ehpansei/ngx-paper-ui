import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { SidebarUserShowcase } from './sidebar-user-showcase';
import { SIDEBAR_USER_DOC } from './sidebar-user.docs';

@Component({
  selector: 'app-sidebar-user-docs-page',
  imports: [DocPage, SidebarUserShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-sidebar-user-showcase /></app-doc-page>`,
})
export class SidebarUserDocsPage {
  protected readonly doc = SIDEBAR_USER_DOC;
}
