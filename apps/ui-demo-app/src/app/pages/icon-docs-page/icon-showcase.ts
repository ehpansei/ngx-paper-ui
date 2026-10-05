import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_NAMES, PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-icon-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-grid">
      @for (n of names; track n) { <div class="doc-icon-cell" [title]="n"><lib-icon [name]="n" size="lg" /><span>{{ n }}</span></div> }
    </div>`,
})
export class IconShowcase { readonly names = ICON_NAMES; }
