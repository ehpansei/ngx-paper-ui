import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { ProgressShowcase } from './progress-showcase';
import { PROGRESS_DOC } from './progress.docs';

@Component({
  selector: 'app-progress-docs-page',
  imports: [DocPage, ProgressShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-progress-showcase /></app-doc-page>`,
})
export class ProgressDocsPage {
  protected readonly doc = PROGRESS_DOC;
}
