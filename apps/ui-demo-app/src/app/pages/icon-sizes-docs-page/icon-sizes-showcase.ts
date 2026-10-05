import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_SIZES, IconName, PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-icon-sizes-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-cols">
      @for (s of sizes; track s.key) {
        <div class="doc-panel">
          <div class="doc-panel-head"><strong>{{ s.label }}</strong><code>icon-size-{{ s.key }} · {{ px[s.key] }}px</code></div>
          <div class="doc-row">@for (n of names; track n) { <lib-icon [name]="n" [size]="s.key" /> }</div>
          <div class="doc-row">
            @switch (s.key) {
              @case ('sm') { <button libButton size="sm" icon="plus">Add</button><lib-password-field [label]="null" value="secret-value" block /> }
              @case ('md') { <button libButton icon="plus">Create</button><a libNavItem icon="home" style="width:160px">Dashboard</a> }
              @case ('lg') { <button libButton size="lg" icon="plus">Create</button><span class="ui-modal-icon is-danger"><lib-icon name="trash" size="lg" /></span> }
            }
          </div>
          <div class="doc-note">{{ s.note }}</div>
        </div>
      }
    </div>`,
})
export class IconSizesShowcase {
  readonly px = ICON_SIZES;
  readonly names: IconName[] = ['home', 'search', 'folder', 'bell', 'settings', 'user', 'trash'];
  readonly sizes = [
    { key: 'sm' as const, label: 'Small', note: 'Fields, sm buttons, menus, tabs.' },
    { key: 'md' as const, label: 'Medium (default)', note: 'Nav items, md buttons, toasts.' },
    { key: 'lg' as const, label: 'Large', note: 'lg buttons, modal tiles, headers.' },
  ];
}
