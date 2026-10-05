import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { ButtonShowcase } from './button-showcase';
import { BUTTON_DOC } from './button.docs';

@Component({
  selector: 'app-button-docs-page',
  imports: [DocPage, ButtonShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-button-showcase /></app-doc-page>`,
})
export class ButtonDocsPage {
  protected readonly doc = BUTTON_DOC;
}
