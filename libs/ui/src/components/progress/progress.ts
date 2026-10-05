import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** <lib-progress label="Uploading" [value]="42" showValue /> */
@Component({
  selector: 'lib-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"ui-progress" + (tone() ? " is-" + tone() : "")' },
  templateUrl: './progress.html',
})
export class Progress {
  readonly value = input(0);
  readonly label = input<string>();
  readonly showValue = input(false, { transform: booleanAttribute });
  readonly tone = input<'success' | 'danger'>();
  readonly pct = computed(() => Math.round(Math.max(0, Math.min(100, this.value()))));
}
