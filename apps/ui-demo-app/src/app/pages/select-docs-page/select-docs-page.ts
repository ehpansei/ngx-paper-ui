import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { SelectShowcase } from './select-showcase';
import { SELECT_DOC } from './select.docs';

@Component({
  selector: 'app-select-docs-page',
  imports: [DocPage, SelectShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-select-showcase /></app-doc-page>`,
})
export class SelectDocsPage {
  protected readonly doc = SELECT_DOC;
}
