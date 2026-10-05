import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { MainViewShowcase } from './main-view-showcase';
import { MAIN_VIEW_DOC } from './main-view.docs';

@Component({
  selector: 'app-main-view-docs-page',
  imports: [DocPage, MainViewShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-main-view-showcase /></app-doc-page>`,
})
export class MainViewDocsPage {
  protected readonly doc = MAIN_VIEW_DOC;
}
