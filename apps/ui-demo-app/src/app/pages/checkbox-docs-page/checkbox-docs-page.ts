import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { CheckboxShowcase } from './checkbox-showcase';
import { CHECKBOX_DOC } from './checkbox.docs';

@Component({
  selector: 'app-checkbox-docs-page',
  imports: [DocPage, CheckboxShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-checkbox-showcase /></app-doc-page>`,
})
export class CheckboxDocsPage {
  protected readonly doc = CHECKBOX_DOC;
}
