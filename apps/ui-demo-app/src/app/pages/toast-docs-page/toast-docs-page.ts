import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { ToastShowcase } from './toast-showcase';
import { TOAST_DOC } from './toast.docs';

@Component({
  selector: 'app-toast-docs-page',
  imports: [DocPage, ToastShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-toast-showcase /></app-doc-page>`,
})
export class ToastDocsPage {
  protected readonly doc = TOAST_DOC;
}
