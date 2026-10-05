import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { form, FormField, required } from '@angular/forms/signals';
import { DialogService, PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-new-project-dialog', imports: [PAPER_UI, FormField], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lib-modal title="New project" (closed)="ref.close()">
      <div class="doc-col">
        <lib-text-input label="Name" placeholder="Website redesign" block [formField]="f.name" />
        <lib-checkbox [formField]="f.notify">Notify members</lib-checkbox>
      </div>
      <ng-container libModalFooter>
        <button libButton variant="secondary" (click)="ref.close()">Cancel</button>
        <button libButton [disabled]="f().invalid()" (click)="ref.close(model().name)">Create</button>
      </ng-container>
    </lib-modal>`,
})
class NewProjectDialog {
  readonly ref = inject<DialogRef<string>>(DialogRef);
  readonly model = signal({ name: '', notify: true });
  readonly f = form(this.model, p => { required(p.name, { message: 'Name is required' }); });
}

@Component({
  selector: 'app-modal-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-scrim is-inline" style="min-height:300px;border-radius:12px">
      <lib-modal title="New project" description="Projects group your files and tasks.">
        <lib-text-input label="Name" placeholder="Website redesign" block />
        <ng-container libModalFooter><button libButton variant="secondary">Cancel</button><button libButton>Create</button></ng-container>
      </lib-modal>
    </div>
    <div class="doc-row"><button libButton icon="plus" (click)="open()">Open in a CDK Dialog</button> @if (result()) { <span class="doc-hint">Created “{{ result() }}”</span> }</div>
    <lib-toaster />`,
})
export class ModalShowcase {
  private readonly dialogs = inject(DialogService);
  readonly result = signal<string | null>(null);
  open() { this.dialogs.open<string>(NewProjectDialog).closed.subscribe(r => r && this.result.set(r)); }
}
