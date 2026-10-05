import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { contrast, onColor, PAPER_UI, THEME_PRESETS, themeVars } from 'ngx-paper-ui';

@Component({
  selector: 'app-theme-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row">
      <label class="ui-label" for="pc">Custom primary</label>
      <input id="pc" type="color" class="doc-color" [value]="custom()" (input)="custom.set($any($event.target).value)" />
      <span class="doc-hint">on-primary: <code>{{ onColor(custom()) }}</code> · contrast on surface <code>{{ contrast(custom()) }}:1</code></span>
      @if (contrast(custom()) < 4.5) { <lib-badge tone="warning">Below 4.5:1</lib-badge> } @else { <lib-badge tone="success">Passes 4.5:1</lib-badge> }
    </div>
    @for (p of rows(); track p.name) {
      <div class="doc-theme-row" libTheme [primary]="p.primary" [primaryDark]="p.primaryDark">
        <div class="doc-theme-name"><strong>{{ p.name }}</strong><code>light {{ p.primary }}</code><code>dark {{ p.primaryDark ?? vars(p.primary) + ' (auto)' }}</code></div>
        <div class="doc-swatches">
          @for (s of swatches; track s.v) {
            <div class="doc-swatch"><div class="doc-chip" [style.background]="'var(' + s.v + ')'" [style.color]="s.fg ? 'var(' + s.fg + ')' : null">{{ s.fg ? 'Aa' : '' }}</div>{{ s.n }}</div>
          }
        </div>
        <div class="doc-row tight">
          <button libButton size="sm" icon="plus">Create</button><button libButton size="sm" variant="secondary">Cancel</button>
          <lib-checkbox [checked]="true">On</lib-checkbox><lib-switch [checked]="true" ariaLabel="Toggle" />
          <lib-badge tone="primary">New</lib-badge><a libLink href="#" (click)="$event.preventDefault()">Link</a>
          <lib-progress [value]="64" style="width:90px" /><a libNavItem icon="home" active style="width:120px">Active</a>
        </div>
      </div>
    }`,
})
export class ThemeShowcase {
  readonly custom = signal('#6b4f3a');
  readonly rows = computed(() => [{ name: 'Custom', primary: this.custom(), primaryDark: undefined as string | undefined }, ...THEME_PRESETS]);
  readonly swatches = [
    { v: '--primary', fg: '--on-primary', n: 'primary' }, { v: '--primary-hover', fg: '--on-primary', n: 'primary-hover' },
    { v: '--primary-soft', fg: '--primary-text', n: 'primary-soft' }, { v: '--primary-text', fg: '', n: 'primary-text' },
    { v: '--nav-item-active-bg', fg: '--nav-item-active-color', n: 'nav active' },
  ];
  onColor = onColor;
  contrast = (c: string) => Math.round(contrast(c, '#fbf7ef') * 100) / 100;
  vars = (c: string) => themeVars({ primary: c })['--theme-primary-dark'];
}
