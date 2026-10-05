Paper UI is a generic Angular component library that looks and feels like ink on paper: cream paper surfaces, sepia ink, muted pigment accents, one configurable primary colour, Inter throughout, and a sidebar app layout. It should read as quiet and precise, and stay dense enough for productivity tools. No decorative gradients, no illustrations, no emoji.

## Angular stack

- **Target:** Angular 21.2+ (Signal Forms from `@angular/forms/signals`; `touched` is a two-way model, set on blur). **Every component is standalone and uses `ChangeDetectionStrategy.OnPush`.** Inputs are `input()` / `model()` / `output()` signals, templates use `@if` / `@for`, no NgModules, zoneless-ready.
- **Forms are Signal Forms** (`@angular/forms/signals`). TextInput, Select and PasswordField implement `FormValueControl`; Checkbox and Switch implement `FormCheckboxControl`. Build the form with `form(model, schema)` and bind each control with the `FormField` directive: `<lib-text-input label="Name" [formField]="f.name" />`. The directive syncs value, disabled, readonly, required, touched and errors; each validator's `message` shows under the control once it's touched. Without a form, bind `[(value)]` / `[(checked)]`. There is no ControlValueAccessor.
- **Package:** `npm i ngx-paper-ui @angular/cdk`, and import from `ngx-paper-ui`. Peer dependencies: `@angular/core`, `@angular/common`, `@angular/forms` (signals), `@angular/cdk` (Dialog, Clipboard), `rxjs`.
- **Source:** `components/src/angular/` — `index.ts` is the public API; import everything with `imports: [PAPER_UI]` or single classes (`Button`, `TextInput`, …). `components/src/docs/` holds the documentation showcases.
- **Prefixes:** selectors `lib-` / `lib…` (`<lib-select>`, `<button libButton>`), classes unprefixed (`Button`, `TextInput`), rendered CSS classes `ui-`.
- **Styles are global.** Components carry no styles of their own. From the package, add `node_modules/ngx-paper-ui/paper-ui.css` to `angular.json` → `styles` (plain CSS: tokens, every component, the CDK overlay styles and the Inter import). Apps need no CSS framework, only this library's rules. In this design system, the same CSS is `tokens.css` then `components/bundle.css`.
- **Native elements first.** Buttons, links, nav items and info cards are attribute components on real `<button>`/`<a>`, so `routerLink`, `routerLinkActive`, `type="submit"` and `disabled` stay native.
- **Overlays** open through the CDK Dialog: `DialogService.open()`, `await ConfirmService.ask()`; toasts come from `ToastService` with one `<lib-toaster />` in the root.
- **Documentation pages.** Every component card on this page is its documentation page, in three sections: **Showcase** (the real Angular component, live — `components/bundle.js` is the AOT-compiled library plus showcases, mounted zoneless with `PaperUI.mount(name, element)`), **API** (models, inputs, outputs, content slots, Signal Forms contract, usage) and **CSS tokens** (every token the component reads, with light/dark values and usage; derived tokens are marked).

## Theming: one configurable colour

- **`primary` is the theme input** (with its pair `on-primary`). Set it and every primary-like colour follows: primary buttons, checked checkboxes, switches, active tabs and nav items, selected info cards, progress bars, links, primary badges, the default avatar, the logo mark, and every focus ring.
- The tints are **derived**, not set: `primary-hover`, `primary-text`, `primary-soft`, `nav-item-active-bg`, `focus-ring` and `shadow-focus` are computed from `primary` in `components/bundle.css` with `color-mix()`. Their values in the token list are the results for the default sepia.
- To re-theme the whole app: `inject(ThemeService).setPrimary('#7c3aed')`, or set `--primary` and `--on-primary` on `:root` and on each `[data-theme]` in your global styles.
- To re-theme one region: `<section libTheme primary="#e11d48">`. It supplies a dark-theme variant and a readable `on-primary` automatically unless you pass `primaryDark` / `onPrimary`.
- Pick a primary with at least 4.5:1 against `surface` (paper white). `THEME_PRESETS` lists seven checked pairs in muted ink hues — Sepia (default), Indigo ink, Sage, Terracotta, Plum, Ochre, Ink; the **Colors → Theme** card compares them and has a picker for trying your own.
- Everything else is fixed: neutrals, `secondary`, `danger`, `success`, `warning`.
- Dark mode: `inject(ThemeService).setMode('dark')` sets `data-theme="dark"` on `<html>`; follow `prefers-color-scheme` with a `matchMedia` listener if you want it automatic.

## Content fundamentals

- Sentence case everywhere except sidebar section overlines ("MAIN MENU"), which are uppercase `overline`.
- Buttons are short verbs: "Create", "Save changes", "Delete". Toasts are past tense: "Copied", "Changes saved", "Moved to Trash".
- Address the user as "you".
- State consequences exactly, especially destructive ones: "It moves to Trash and is removed for good after 30 days."

## Visual foundations

### Color

- Two themes on the same token names: **Light** and **Dark**. Use tokens, never hex, in components.
- Grounds: `surface` for the main pane, inputs and info cards; `surface-raised` for the sidebar, aside and hover; `surface-hover` for hover fills of rows, menu items, nav items and ghost buttons.
- Text: `on-surface` for primary text, `on-surface-muted` for secondary text, labels, placeholders and resting icons (≥4.5:1 on all three grounds in both themes).
- Accent: `primary` fills; `on-primary` on top of it; `primary-text` for primary-coloured text and icons; `primary-soft` for tinted grounds.
- Status: `danger`, `warning`, `success` are fills. As text use `danger-text`, `warning-text`, `success-text` on `surface` or their `-soft` grounds. `warning` and `success` fail as text on `surface`.
- **Palette:** sepia throughout. Neutrals are one warm family — paper `surface` #fbf7ef, `surface-raised` #f4ecdf, ink `on-surface` #2b2118, muted `on-surface-muted` #6b5a47 — and the dark theme is deep sepia (#1b1712), not black. The default `primary` is sepia brown #8a5a2b; status colours are warm too: brick `danger`, ochre `warning`, olive `success`. Shadows and the scrim are sepia-tinted in both themes; nothing in the system is pure black, pure white or a saturated screen colour. When you pick a custom primary, choose a muted, ink-like hue to keep the paper feel.
- `secondary` / `secondary-hover` sit on the same warm scale.
- Component tokens (`button-*`, `sidebar-*`, `nav-item-*`, `card-*`, `input-*`) alias the base colours.

### Typography

- Inter only (400, 500, 600, 700), from Google Fonts.
- Styles: `heading-1` 34/40 Bold, `page-title` 24/32, `section-title` 20/28, `wordmark` 18/24, `body` 14/20, `label` 14/20 Medium, `label-strong` 14/20 Semi Bold, `label-sm` 13/18 Medium, `caption` 12/16, `overline` 11/16 Semi Bold uppercase.
- `text-*` and `leading-*` tokens back these styles. Body copy is `body` in `on-surface-muted`; titles are `on-surface`.

### Spacing, radius, layout

- 4px scale: `space-1` 4 … `space-6` 24, plus `space-8` 32. Button padding-x is 12/16/24.
- Radii: `radius-sm` 6 (menu items, badges), `radius-md` 8 (buttons, inputs, nav items), `radius-lg` 12 (info cards, toasts, app frame), `radius-xl` 16 (modals), `radius-full` (avatars, switches, progress).
- **Mobile first.** Start every layout at the smallest width and add structure at the breakpoints `bp-md` (768px) and `bp-lg` (1024px) with `min-width` queries. A component's own threshold is a breakpoint token too (`bp-list`, 420px: info cards in a list go from compact to full spacing). CSS can't read `var()` in a query, so the values are written out and must match the tokens. The app layout, `lib-main-view`, uses container queries on its own width: on mobile it shows a header (☰ menu, brand, avatar) and the main view, the sidebar opens as a drawer, and an opened detail takes over the whole view; from md it is the classic sidebar · main · detail columns (`sidebar-width-md` 208 / `detail-width-md` 288 at md, `sidebar-width` 256 / `detail-width` 360 at lg).

### Elevation, borders, states

- 1px `border` separates; hover `border-hover`.
- Shadows: `shadow-sm` on filled buttons, `shadow-md` on their hover plus menus and toasts, `shadow-lg` on modals.
- **Focus:** one treatment everywhere — `shadow-focus` (2px surface gap + 2px `focus-ring`, which is `primary`) on `:focus-visible`.
- **Hover:** fills change; text colour doesn't.
- **Disabled:** `disabled-opacity` 0.5 and `cursor: not-allowed`; labels stay outside the dimmed box.
- **Error:** `danger` border plus a `danger-text` message with an alert icon.
- **Selected:** `card-bg-selected` (`primary-soft`) + `card-border-selected` (`primary`).
- Known gap: `border` on `surface` is 1.3:1, below the 3:1 guideline for control borders; kept from the Figma source. Point `input-border` at a darker gray if you need it.

## Iconography

- Use `<lib-icon>`: a 31-icon stroke set on a 24px grid, 1.75px stroke, round caps, drawn in `currentColor`. Three sizes only — `sm` 16 (`icon-size-sm`: fields, sm buttons, menus, tabs), `md` 18 (`icon-size-md`, default: nav, md buttons, toasts), `lg` 20 (`icon-size-lg`: lg buttons, modal tiles, headers); pass `size="sm" | "md" | "lg"`. Icons render from one sprite (in the repo, add an SVG to `libs/ui/src/assets/icons/` and run `nx run ui:icons`). Apps provide it one of two ways: `providers: [provideInlineIconSprite()]` puts it into the page once, with no asset to serve; or copy `node_modules/ngx-paper-ui/assets/icons.svg` to `assets/ui/` (the default URL), or point `provideIconSprite(url)` at it (same origin).
- The Icons asset group has the same icons as single-ink SVGs for tools that can't run the bundle.
- The library has no logo of its own: `<lib-logo>` renders the product name you pass with a `primary` initial tile.

## Components

Foundations `lib-icon`, `lib-logo`; actions `button[libButton]`, `a[libLink]`; forms `lib-text-input`, `lib-select`, `lib-password-field`, `lib-strength-meter`, `lib-checkbox`, `lib-switch`, `lib-form` (a whole form from a config); navigation `lib-sidebar`, `lib-nav-section`, `a[libNavItem]`, `lib-sidebar-user`, `lib-tabs`; data display `lib-badge`, `lib-avatar`, `button[libInfoCard]`, `lib-detail-view`; feedback `lib-progress`, `lib-toast` + `ToastService`, `lib-empty-state`, `lib-modal` + `DialogService`, `lib-confirm-dialog` + `ConfirmService`; layout `lib-main-view`; colours `[libTheme]` + `ThemeService`. Each card's guide lists its selector, inputs, outputs, content slots and a template example.
