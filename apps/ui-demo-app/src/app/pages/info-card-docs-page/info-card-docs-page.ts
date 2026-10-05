import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { InfoCardShowcase } from './info-card-showcase';
import { INFO_CARD_DOC } from './info-card.docs';

@Component({
  selector: 'app-info-card-docs-page',
  imports: [DocPage, InfoCardShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-info-card-showcase /></app-doc-page>`,
})
export class InfoCardDocsPage {
  protected readonly doc = INFO_CARD_DOC;
}
