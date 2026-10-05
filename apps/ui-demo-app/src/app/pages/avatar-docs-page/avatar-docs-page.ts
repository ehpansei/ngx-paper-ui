import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { AvatarShowcase } from './avatar-showcase';
import { AVATAR_DOC } from './avatar.docs';

@Component({
  selector: 'app-avatar-docs-page',
  imports: [DocPage, AvatarShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-avatar-showcase /></app-doc-page>`,
})
export class AvatarDocsPage {
  protected readonly doc = AVATAR_DOC;
}
