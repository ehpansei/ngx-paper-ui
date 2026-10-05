import { inject, Injectable, Type } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

/** Opens any component in a CDK Dialog with the Paper UI scrim. The component usually renders a <lib-modal>. */
@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly dialog = inject(Dialog);
  open<R, D = unknown, C = unknown>(component: Type<C>, data?: D) {
    return this.dialog.open<R, D, C>(component, {
      data, hasBackdrop: true, backdropClass: 'ui-scrim-backdrop', panelClass: 'ui-dialog-panel', autoFocus: 'first-tabbable', restoreFocus: true,
      // CDK writes maxWidth inline (default 80vw), which beats .ui-dialog-panel; set the 440px panel here.
      width: '100%', maxWidth: 'min(440px, calc(100vw - 32px))',
    });
  }
}
