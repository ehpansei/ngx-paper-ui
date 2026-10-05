import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { DetailViewShowcase } from './detail-view-showcase';
import { DETAIL_VIEW_DOC } from './detail-view.docs';

@Component({
  selector: 'app-detail-view-docs-page',
  imports: [DocPage, DetailViewShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-detail-view-showcase /></app-doc-page>`,
})
export class DetailViewDocsPage {
  protected readonly doc = DETAIL_VIEW_DOC;
}
