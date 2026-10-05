import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-link-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p class="doc-prose">Read the <a libLink href="#" (click)="$event.preventDefault()">setup guide</a> before inviting your team, or <a libLink href="#" (click)="$event.preventDefault()">open the changelog</a> to see what changed.</p>`,
})
export class LinkShowcase {}
