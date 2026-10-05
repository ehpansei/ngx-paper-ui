import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PAPER_UI, ToastService } from 'ngx-paper-ui';

@Component({
  selector: 'app-toast-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row">
      <lib-toast>Copied</lib-toast>
      <lib-toast dismissible>Changes saved</lib-toast>
      <lib-toast icon="trash">Moved to Trash<button libToastAction libButton variant="ghost" size="sm" style="color:inherit">Undo</button></lib-toast>
    </div>
    <div class="doc-row">
      <button libButton variant="secondary" (click)="toast.show('Copied')">Show a toast</button>
      <button libButton variant="secondary" (click)="toast.show('Moved to Trash', { icon: 'trash', actionLabel: 'Undo', action: undo })">With Undo</button>
    </div>
    <lib-toaster />`,
})
export class ToastShowcase { readonly toast = inject(ToastService); readonly undo = () => this.toast.show('Restored'); }
