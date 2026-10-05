import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Logo, MainView, NavItem, NavSection, Sidebar, Switch, ThemeService } from 'ngx-paper-ui';
import { filter, map } from 'rxjs';
import { DOC_NAV, isNavGroup, navLinks } from './docs/doc-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MainView, Sidebar, Logo, NavSection, NavItem, Switch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lib-main-view [title]="section()" brandName="Paper UI">
      <lib-sidebar libMainSidebar>
        <lib-logo libSidebarLogo name="Paper UI" />
        @for (g of nav; track g.title) {
          <lib-nav-section [title]="g.title" collapsible [expanded]="open().has(g.title)" (expandedChange)="setOpen(g.title, $event)">
            @for (e of g.links; track $index) {
              @if (isNavGroup(e)) {
                @let key = g.title + '/' + e.title;
                <lib-nav-section [title]="e.title" collapsible [expanded]="open().has(key)" (expandedChange)="setOpen(key, $event)">
                  @for (l of e.links; track l.path) {
                    <a libNavItem [routerLink]="l.path" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">{{ l.label }}</a>
                  }
                </lib-nav-section>
              } @else {
                <a libNavItem [routerLink]="e.path" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">{{ e.label }}</a>
              }
            }
          </lib-nav-section>
        }
      </lib-sidebar>
      <lib-switch libMainActions [checked]="dark()" (checkedChange)="setDark($event)">Dark mode</lib-switch>
      <router-outlet />
    </lib-main-view>
  `,
})
export class App {
  private readonly theme = inject(ThemeService);
  private readonly router = inject(Router);

  protected readonly nav = DOC_NAV;
  protected readonly isNavGroup = isNavGroup;
  protected readonly dark = signal(false);
  /** Open sidebar sections, keyed "Group" or "Group/Sub-group". */
  protected readonly open = signal<ReadonlySet<string>>(new Set());

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  private readonly path = computed(() => this.url().split(/[?#]/)[0]);

  /** The pane title: the top-level nav group of the current page. */
  protected readonly section = computed(
    () => DOC_NAV.find((g) => navLinks(g).some((l) => l.path === this.path()))?.title ?? 'Paper UI',
  );

  constructor() {
    this.theme.setMode('light');
    // Open the sections holding the current page; sections the user opened or closed elsewhere stay as they are.
    effect(() => {
      const path = this.path();
      const keys = DOC_NAV.flatMap((g) =>
        g.links.flatMap((e) =>
          isNavGroup(e) ? (e.links.some((l) => l.path === path) ? [g.title, `${g.title}/${e.title}`] : []) : e.path === path ? [g.title] : [],
        ),
      );
      if (keys.length) this.open.update((open) => new Set([...open, ...keys]));
    });
  }

  protected setOpen(key: string, open: boolean) {
    this.open.update((keys) => {
      const next = new Set(keys);
      if (open) next.add(key);
      else next.delete(key);
      return next;
    });
  }

  protected setDark(dark: boolean) {
    this.dark.set(dark);
    this.theme.setMode(dark ? 'dark' : 'light');
  }
}
