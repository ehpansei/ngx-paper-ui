import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { TabsShowcase } from './tabs-showcase';
import { TABS_DOC } from './tabs.docs';

@Component({
  selector: 'app-tabs-docs-page',
  imports: [DocPage, TabsShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-tabs-showcase /></app-doc-page>`,
})
export class TabsDocsPage {
  protected readonly doc = TABS_DOC;
}
