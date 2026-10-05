import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { SidebarShowcase } from './sidebar-showcase';
import { SIDEBAR_DOC } from './sidebar.docs';

@Component({
  selector: 'app-sidebar-docs-page',
  imports: [DocPage, SidebarShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-sidebar-showcase /></app-doc-page>`,
})
export class SidebarDocsPage {
  protected readonly doc = SIDEBAR_DOC;
}
