import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { ConfirmDialogShowcase } from './confirm-dialog-showcase';
import { CONFIRM_DIALOG_DOC } from './confirm-dialog.docs';

@Component({
  selector: 'app-confirm-dialog-docs-page',
  imports: [DocPage, ConfirmDialogShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-confirm-dialog-showcase /></app-doc-page>`,
})
export class ConfirmDialogDocsPage {
  protected readonly doc = CONFIRM_DIALOG_DOC;
}
