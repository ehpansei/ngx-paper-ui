import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-progress-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-cols">
      <lib-progress label="Uploading" [value]="42" showValue />
      <lib-progress label="Complete" [value]="100" tone="success" showValue />
      <lib-progress label="Storage full" [value]="96" tone="danger" showValue />
    </div>`,
})
export class ProgressShowcase {}
