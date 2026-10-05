import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { IconShowcase } from './icon-showcase';
import { ICON_DOC } from './icon.docs';

@Component({
  selector: 'app-icon-docs-page',
  imports: [DocPage, IconShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-icon-showcase /></app-doc-page>`,
})
export class IconDocsPage {
  protected readonly doc = ICON_DOC;
}
