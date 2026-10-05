import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-badge-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row">
      <lib-badge>Draft</lib-badge><lib-badge tone="primary">New</lib-badge><lib-badge tone="success">Active</lib-badge>
      <lib-badge tone="warning">Pending</lib-badge><lib-badge tone="danger">Failed</lib-badge><lib-badge [icon]="null">12</lib-badge>
    </div>`,
})
export class BadgeShowcase {}
