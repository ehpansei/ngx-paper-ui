import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { FormShowcase } from './form-showcase';
import { FORM_DOC } from './form.docs';

@Component({
  selector: 'app-form-docs-page',
  imports: [DocPage, FormShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-form-showcase /></app-doc-page>`,
})
export class FormDocsPage {
  protected readonly doc = FORM_DOC;
}
