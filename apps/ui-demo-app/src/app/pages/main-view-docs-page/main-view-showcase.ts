import { afterNextRender, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { PAPER_UI, TabItem } from 'ngx-paper-ui';
import { CARDS } from '../../docs/sample-data';

const DEVICES = [
  { key: 'mobile', label: 'Mobile', width: 390, height: 720 },
  { key: 'tablet', label: 'Tablet · md', width: 820, height: 640 },
  { key: 'desktop', label: 'Desktop · lg', width: 1280, height: 640 },
] as const;

@Component({
  selector: 'app-main-view-showcase', imports: [PAPER_UI, FormField, DecimalPipe], changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display:block; min-width:0', '(window:resize)': 'measure()' },
  template: `
    <div class="doc-row">
      <lib-tabs [items]="deviceTabs" [(value)]="device" />
      <span class="doc-hint">{{ current().width }} × {{ current().height }}px{{ scale() < 1 ? ' · shown at ' + (scale() * 100 | number: '1.0-0') + '%' : '' }}</span>
    </div>
    <div #fit class="doc-device-fit" [style.height.px]="current().height * scale()">
      <div class="doc-device" [style.width.px]="current().width" [style.height.px]="current().height" [style.transform]="'scale(' + scale() + ')'">
        <lib-main-view title="Projects" brandName="Acme" userName="Pedro Castro" [(detailOpen)]="detailOpen" [(sidebarOpen)]="sidebarOpen">
          <lib-sidebar libMainSidebar>
            <lib-logo libSidebarLogo name="Acme" />
            <lib-nav-section title="Main menu">
              <button libNavItem icon="home">Dashboard</button>
              <button libNavItem icon="folder" [count]="4" active>Projects</button>
              <button libNavItem icon="inbox" [count]="12">Inbox</button>
            </lib-nav-section>
            <lib-sidebar-user libSidebarFooter name="Pedro Castro" email="pedro@example.com" />
          </lib-sidebar>
          <button libButton libMainActions icon="plus" [iconOnly]="current().key === 'mobile'" label="New project">{{ current().key === 'mobile' ? '' : 'New project' }}</button>
          <lib-text-input placeholder="Search projects" leadingIcon="search" block [formField]="search.q" />
          <div class="ui-list">
            @for (c of visible(); track c.title) {
              <button libInfoCard [title]="c.title" [description]="c.description" [icon]="c.icon" [badges]="c.badges"
                      [selected]="detailOpen() && selected().title === c.title" (click)="open(c)"></button>
            }
          </div>
          <lib-detail-view libMainDetail [title]="selected().title" [subtitle]="selected().description" [icon]="selected().icon" [badges]="selected().badges"
            [fields]="[{ label: 'Owner', value: 'pedro@example.com' }]" meta="Updated Sep 12, 2026" editable deletable />
        </lib-main-view>
      </div>
    </div>
    <div class="doc-note">Mobile: tap ☰ for the sidebar drawer, tap a card and the detail takes over the view (Back returns). md and lg: sidebar · main · detail. The layout reacts to its own width (container queries), so it works inside any container.</div>`,
})
export class MainViewShowcase {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly deviceTabs: TabItem[] = DEVICES.map(d => ({ value: d.key, label: d.label }));
  readonly device = signal<string>('mobile');
  readonly current = computed(() => DEVICES.find(d => d.key === this.device()) ?? DEVICES[0]);
  readonly avail = signal(900);
  readonly scale = computed(() => Math.min(1, this.avail() / this.current().width));
  readonly detailOpen = signal(false);
  readonly sidebarOpen = signal(false);
  readonly model = signal({ q: '' });
  readonly search = form(this.model);
  readonly selected = signal<(typeof CARDS)[number]>(CARDS[2]);
  readonly visible = computed(() => CARDS.filter(c => c.title.toLowerCase().includes(this.model().q.toLowerCase())));
  constructor() {
    afterNextRender(() => { this.measure(); new ResizeObserver(() => this.measure()).observe(this.el.nativeElement); });
    effect(() => { if (this.device() !== 'mobile') this.sidebarOpen.set(false); this.detailOpen.set(this.device() !== 'mobile'); });
  }
  measure() {
    const el = this.el.nativeElement, cs = getComputedStyle(el);
    this.avail.set((el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)) || 900);
  }
  open(c: (typeof CARDS)[number]) { this.selected.set(c); this.detailOpen.set(true); }
}
