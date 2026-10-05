import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { NavSectionShowcase } from './nav-section-showcase';
import { NAV_SECTION_DOC } from './nav-section.docs';

@Component({
  selector: 'app-nav-section-docs-page',
  imports: [DocPage, NavSectionShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-nav-section-showcase /></app-doc-page>`,
})
export class NavSectionDocsPage {
  protected readonly doc = NAV_SECTION_DOC;
}
