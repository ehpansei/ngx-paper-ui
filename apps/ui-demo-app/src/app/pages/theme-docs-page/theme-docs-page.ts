import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { ThemeShowcase } from './theme-showcase';
import { THEME_DOC } from './theme.docs';

@Component({
  selector: 'app-theme-docs-page',
  imports: [DocPage, ThemeShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-theme-showcase /></app-doc-page>`,
})
export class ThemeDocsPage {
  protected readonly doc = THEME_DOC;
}
