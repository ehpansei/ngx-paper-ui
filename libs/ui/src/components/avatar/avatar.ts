import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** <lib-avatar name="Ana Silva" tone="alt" /> */
@Component({
  selector: 'lib-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"ui-avatar" + (tone() === "alt" ? " ui-avatar-alt" : "")', 'aria-hidden': 'true',
    '[style.width.px]': 'size()', '[style.height.px]': 'size()', '[style.font-size.px]': 'size() * 0.4',
  },
  templateUrl: './avatar.html',
})
export class Avatar {
  readonly name = input.required<string>();
  readonly size = input(32);
  readonly tone = input<'primary' | 'alt'>('primary');
  readonly initials = computed(() => this.name().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase());
}
