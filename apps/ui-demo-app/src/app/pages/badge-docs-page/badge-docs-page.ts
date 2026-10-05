import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { BadgeShowcase } from './badge-showcase';
import { BADGE_DOC } from './badge.docs';

@Component({
  selector: 'app-badge-docs-page',
  imports: [DocPage, BadgeShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-badge-showcase /></app-doc-page>`,
})
export class BadgeDocsPage {
  protected readonly doc = BADGE_DOC;
}
