import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfirmService, PAPER_UI, ToastService } from 'ngx-paper-ui';

@Component({
  selector: 'app-detail-view-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="max-width:400px">
      <lib-detail-view title="figma.com" href="https://figma.com/login" [badges]="[{ tone: 'warning', label: 'Reused' }]"
        [fields]="[{ label: 'Username', value: 'pedro@example.com' }]" password="Summer2024!" strengthHint="Used on 3 sites"
        meta="Updated Sep 12, 2026" editable deletable (copied)="toast.show($event + ' copied')" (delete)="remove()" />
    </div>
    <lib-toaster />`,
})
export class DetailViewShowcase {
  readonly toast = inject(ToastService);
  private readonly confirm = inject(ConfirmService);
  async remove() { const ok = await this.confirm.ask({ title: 'Delete “figma.com”?', description: 'It moves to Trash and is removed for good after 30 days.' }); this.toast.show(ok ? 'Deleted' : 'Kept'); }
}
