import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-logo-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-row">
      <div class="doc-tile"><lib-logo /></div>
      <div class="doc-tile"><lib-logo name="Acme" /></div>
      <div class="doc-tile"><lib-logo name="Northwind" icon="star" /></div>
      <div class="doc-tile"><lib-logo name="Acme" markOnly /></div>
      <div class="doc-tile" libTheme primary="#3f5a7a"><lib-logo name="Indigo ink" /></div>
    </div>`,
})
export class LogoShowcase {}
