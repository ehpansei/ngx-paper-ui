import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-avatar-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="doc-row"><lib-avatar name="Pedro Castro" /><lib-avatar name="Ana Silva" tone="alt" /><lib-avatar name="Rui Lopes" [size]="40" /><lib-avatar name="Marta" tone="alt" [size]="24" /></div>`,
})
export class AvatarShowcase {}
