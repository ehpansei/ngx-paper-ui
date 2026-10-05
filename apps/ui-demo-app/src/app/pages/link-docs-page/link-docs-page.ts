import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { LinkShowcase } from './link-showcase';
import { LINK_DOC } from './link.docs';

@Component({
  selector: 'app-link-docs-page',
  imports: [DocPage, LinkShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-link-showcase /></app-doc-page>`,
})
export class LinkDocsPage {
  protected readonly doc = LINK_DOC;
}
