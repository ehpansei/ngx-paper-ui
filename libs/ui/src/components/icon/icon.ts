import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ICON_SIZES, IconName, IconSize } from './icons';
import { ICON_SPRITE_URL } from './icon-sprite';

/** <lib-icon name="search" size="sm" /> — stroke icon in currentColor, drawn from the icon sprite. */
@Component({
  selector: 'lib-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-icon-host' },
  templateUrl: './icon.html',
})
export class Icon {
  private readonly sprite = inject(ICON_SPRITE_URL);
  readonly name = input.required<IconName>();
  /** 'sm' 16 · 'md' 18 (default) · 'lg' 20, or a number of px. */
  readonly size = input<IconSize | number>('md');
  readonly strokeWidth = input(1.75);
  /** Accessible name. Only when the icon stands alone and carries meaning. */
  readonly title = input<string>();

  readonly px = computed(() => { const s = this.size(); return typeof s === 'number' ? s : ICON_SIZES[s]; });
  readonly href = computed(() => `${this.sprite}#${this.name()}`);
}
