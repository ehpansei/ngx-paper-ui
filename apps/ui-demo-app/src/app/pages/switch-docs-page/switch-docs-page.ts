import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { SwitchShowcase } from './switch-showcase';
import { SWITCH_DOC } from './switch.docs';

@Component({
  selector: 'app-switch-docs-page',
  imports: [DocPage, SwitchShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-switch-showcase /></app-doc-page>`,
})
export class SwitchDocsPage {
  protected readonly doc = SWITCH_DOC;
}
