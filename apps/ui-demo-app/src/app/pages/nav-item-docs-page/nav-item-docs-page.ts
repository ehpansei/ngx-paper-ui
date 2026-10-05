import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { NavItemShowcase } from './nav-item-showcase';
import { NAV_ITEM_DOC } from './nav-item.docs';

@Component({
  selector: 'app-nav-item-docs-page',
  imports: [DocPage, NavItemShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-nav-item-showcase /></app-doc-page>`,
})
export class NavItemDocsPage {
  protected readonly doc = NAV_ITEM_DOC;
}
