import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { EmptyStateShowcase } from './empty-state-showcase';
import { EMPTY_STATE_DOC } from './empty-state.docs';

@Component({
  selector: 'app-empty-state-docs-page',
  imports: [DocPage, EmptyStateShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-empty-state-showcase /></app-doc-page>`,
})
export class EmptyStateDocsPage {
  protected readonly doc = EMPTY_STATE_DOC;
}
