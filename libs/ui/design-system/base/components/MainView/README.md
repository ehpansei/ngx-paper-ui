Responsive app layout, mobile first: a header with menu, brand and avatar on mobile; sidebar · main · detail columns from md up.

**Angular:** `lib-main-view` · `MainView` (standalone, OnPush) · source `libs/ui/src/layouts/main-view/main-view.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Models (two-way)**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `detailOpen` | `boolean` | `false` | Shows the detail: a column on md+, the whole view on mobile |
| `sidebarOpen` | `boolean` | `false` | Mobile drawer state; the ☰ button toggles it |

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — | Page title |
| `brandName` | `string` | `'Paper UI'` | Mobile header logo (unless `[libMainBrand]` is projected) |
| `userName` | `string` | — | Mobile header avatar (unless `[libMainUser]` is projected) |
| `backLabel` | `string` | `'Back'` | Mobile detail back button |
| `detailLabel` | `string` | `'Details'` | Detail region `aria-label` |

**Content slots:** `[libMainSidebar]` — a `lib-sidebar` (column on md+, drawer on mobile) · `[libMainActions]` — header buttons next to the title · default — main content (e.g. `<router-outlet />`) · `[libMainDetail]` — e.g. `lib-detail-view` · `[libMainBrand]` / `[libMainUser]` — replace the mobile header logo / avatar

Mobile first, with container queries on the component's own width (breakpoint tokens `bp-md` 768px, `bp-lg` 1024px), so it adapts to whatever holds it — give it `height: 100dvh` at the app root. Escape closes the drawer, then the detail; choosing a nav item closes the drawer.

```ts
readonly detailOpen = signal(false);
readonly selected = signal<Project | null>(null);
open(p: Project) { this.selected.set(p); this.detailOpen.set(true); }

<lib-main-view title="Projects" brandName="Acme" [userName]="user().name" [(detailOpen)]="detailOpen">
  <lib-sidebar libMainSidebar>…</lib-sidebar>
  <button libButton libMainActions icon="plus">New project</button>
  @for (p of projects(); track p.id) { <button libInfoCard [title]="p.name" (click)="open(p)"></button> }
  @if (selected(); as s) { <lib-detail-view libMainDetail [title]="s.name" … /> }
</lib-main-view>
```

**Design**
- **Mobile (< 768px):** `header-height` 56 header on `sidebar-bg` — ☰ button, brand, avatar. Main fills the screen (`space-4` padding, title `text-xl`). The sidebar slides in as a drawer (`sidebar-width`, max 85%) over `scrim`. With `detailOpen` the detail covers the whole view with a Back button.
- **md (≥ 768px):** header gone; sidebar column `sidebar-width-md` 208, main (`space-5` padding, title `text-2xl`), detail column `detail-width-md` 288 on `surface-raised`.
- **lg (≥ 1024px):** sidebar `sidebar-width` 256, main padding `space-6`/`space-8`, detail `detail-width` 360.
- 1px `border` frame with `radius-lg`; drop both when it fills the viewport.

**CSS tokens:** `bp-md`, `bp-lg`, `header-height`, `sidebar-width`, `sidebar-width-md`, `detail-width`, `detail-width-md`, `sidebar-bg`, `sidebar-border`, `surface`, `surface-raised`, `border`, `scrim`, `shadow-lg`, `radius-lg`, `space-4`, `space-5`, `space-6`, `space-8`, `text-xl`, `text-2xl`
