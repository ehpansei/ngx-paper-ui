import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { TextInputShowcase } from './text-input-showcase';
import { TEXT_INPUT_DOC } from './text-input.docs';

@Component({
  selector: 'app-text-input-docs-page',
  imports: [DocPage, TextInputShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-text-input-showcase /></app-doc-page>`,
})
export class TextInputDocsPage {
  protected readonly doc = TEXT_INPUT_DOC;
}
