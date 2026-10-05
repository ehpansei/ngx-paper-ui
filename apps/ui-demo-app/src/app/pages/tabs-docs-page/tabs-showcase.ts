import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PAPER_UI, TabItem } from 'ngx-paper-ui';

@Component({
  selector: 'app-tabs-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lib-tabs [items]="items" [(value)]="tab" style="max-width:560px" />
    <div class="doc-note">value: <code>{{ tab() }}</code> · use ← → when a tab has focus.</div>`,
})
export class TabsShowcase {
  readonly items: TabItem[] = [{ value: 'overview', label: 'Overview' }, { value: 'activity', label: 'Activity', count: 12 }, { value: 'members', label: 'Members', count: 4 }, { value: 'settings', label: 'Settings' }];
  readonly tab = signal('overview');
}
