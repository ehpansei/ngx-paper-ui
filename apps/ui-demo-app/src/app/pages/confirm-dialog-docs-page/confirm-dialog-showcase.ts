import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ConfirmService, PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-confirm-dialog-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-cols two">
      <div class="ui-scrim is-inline" style="min-height:240px;border-radius:12px"><lib-confirm-dialog title="Delete “Quarterly report”?" description="It moves to Trash and is removed for good after 30 days." /></div>
      <div class="ui-scrim is-inline" style="min-height:240px;border-radius:12px"><lib-confirm-dialog tone="neutral" icon="log-out" title="Sign out of all devices?" description="You will need to sign in again on each device." confirmLabel="Sign out" /></div>
    </div>
    <div class="doc-row"><button libButton variant="danger" icon="trash" (click)="ask()">Delete…</button> @if (answer() !== null) { <span class="doc-hint">ask() resolved {{ answer() }}</span> }</div>`,
})
export class ConfirmDialogShowcase {
  private readonly confirm = inject(ConfirmService);
  readonly answer = signal<boolean | null>(null);
  async ask() { this.answer.set(await this.confirm.ask({ title: 'Delete “Quarterly report”?', description: 'It moves to Trash and is removed for good after 30 days.' })); }
}
