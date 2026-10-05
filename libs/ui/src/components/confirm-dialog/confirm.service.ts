import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { firstValueFrom } from 'rxjs';
import { DialogService } from '../modal';
import { ConfirmDialog, ConfirmOptions } from './confirm-dialog';

@Component({
  selector: 'lib-confirm-host',
  standalone: true,
  imports: [ConfirmDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-host.html',
})
class ConfirmHost {
  readonly d = inject<ConfirmOptions>(DIALOG_DATA);
  readonly ref = inject<DialogRef<boolean>>(DialogRef);
}

/** const ok = await confirm.ask({ title: 'Delete “Report”?', description: 'It moves to Trash…' }); */
@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private readonly dialogs = inject(DialogService);
  async ask(options: ConfirmOptions): Promise<boolean> {
    const ref = this.dialogs.open<boolean, ConfirmOptions, ConfirmHost>(ConfirmHost, options);
    return (await firstValueFrom(ref.closed)) === true;
  }
}
