import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { PasswordFieldShowcase } from './password-field-showcase';
import { PASSWORD_FIELD_DOC } from './password-field.docs';

@Component({
  selector: 'app-password-field-docs-page',
  imports: [DocPage, PasswordFieldShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-password-field-showcase /></app-doc-page>`,
})
export class PasswordFieldDocsPage {
  protected readonly doc = PASSWORD_FIELD_DOC;
}
