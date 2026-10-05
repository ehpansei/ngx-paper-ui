import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { LogoShowcase } from './logo-showcase';
import { LOGO_DOC } from './logo.docs';

@Component({
  selector: 'app-logo-docs-page',
  imports: [DocPage, LogoShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-logo-showcase /></app-doc-page>`,
})
export class LogoDocsPage {
  protected readonly doc = LOGO_DOC;
}
