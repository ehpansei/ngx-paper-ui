import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '../button';
import { Toast } from './toast';
import { ToastService } from './toast.service';

/** Place once, e.g. in app.component.html: <lib-toaster /> */
@Component({
  selector: 'lib-toaster',
  standalone: true,
  imports: [Toast, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'position:fixed;left:0;right:0;bottom:24px;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:60;pointer-events:none' },
  templateUrl: './toaster.html',
})
export class Toaster {
  readonly toasts = inject(ToastService);
}
