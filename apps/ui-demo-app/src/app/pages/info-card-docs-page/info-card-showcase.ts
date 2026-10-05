import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';
import { CARDS } from '../../docs/sample-data';

@Component({
  selector: 'app-info-card-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ui-list" style="max-width:560px">
      @for (c of cards; track c.title; let i = $index) {
        <button libInfoCard [title]="c.title" [description]="c.description" [icon]="c.icon" [badges]="c.badges" [selected]="sel() === i" (click)="sel.set(i)"></button>
      }
      <button libInfoCard title="Ana Silva" description="ana@example.com" [badges]="[{ tone: 'success', label: 'Online' }]"><lib-avatar libLeading name="Ana Silva" tone="alt" [size]="36" /></button>
    </div>
    <div class="doc-note">Click a card to select it.</div>`,
})
export class InfoCardShowcase { readonly cards = CARDS; readonly sel = signal(2); }
