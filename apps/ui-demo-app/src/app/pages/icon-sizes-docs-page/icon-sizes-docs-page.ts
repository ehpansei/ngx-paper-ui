import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { IconSizesShowcase } from './icon-sizes-showcase';
import { ICON_SIZES_DOC } from './icon-sizes.docs';

@Component({
  selector: 'app-icon-sizes-docs-page',
  imports: [DocPage, IconSizesShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-icon-sizes-showcase /></app-doc-page>`,
})
export class IconSizesDocsPage {
  protected readonly doc = ICON_SIZES_DOC;
}
