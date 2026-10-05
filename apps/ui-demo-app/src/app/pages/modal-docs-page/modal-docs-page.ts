import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { ModalShowcase } from './modal-showcase';
import { MODAL_DOC } from './modal.docs';

@Component({
  selector: 'app-modal-docs-page',
  imports: [DocPage, ModalShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-modal-showcase /></app-doc-page>`,
})
export class ModalDocsPage {
  protected readonly doc = MODAL_DOC;
}
