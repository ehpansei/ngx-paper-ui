import { Injectable, signal } from '@angular/core';
import { IconName } from '../icon';

export interface ToastItem { id: number; message: string; icon?: IconName; actionLabel?: string; action?: () => void }

/** toast.show('Copied') · toast.show('Moved to Trash', { icon: 'trash', actionLabel: 'Undo', action: () => restore() }) */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private seq = 0;
  readonly items = signal<ToastItem[]>([]);
  show(message: string, opts: Omit<ToastItem, 'id' | 'message'> & { duration?: number } = {}) {
    const item = { id: ++this.seq, message, ...opts };
    this.items.update(list => [...list, item]);
    setTimeout(() => this.dismiss(item.id), opts.duration ?? (opts.action ? 5000 : 2500));
    return item.id;
  }
  dismiss(id: number) { this.items.update(list => list.filter(t => t.id !== id)); }
}
