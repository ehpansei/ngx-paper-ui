# libs/ui — Paper UI (`ngx-paper-ui` on npm)

This library **is** the Paper UI design system. The source of truth is the design-system artifact:
https://claude.ai/artifact/YamgBYyuomodpWN4SFgSTB (brand book in `project/README.md`, tokens in `project/tokens.json`,
per-component guidelines in `project/components/<Name>/README.md`). When a rule here and the artifact disagree, the
artifact wins; update this file.

Paper UI looks like ink on paper: cream paper surfaces, sepia ink, muted pigment accents, one configurable primary
colour, Inter throughout, a sidebar app layout. Quiet, precise, dense enough for productivity tools.
**No decorative gradients, no illustrations, no emoji.**

## Angular rules

- Every component is **standalone** with `ChangeDetectionStrategy.OnPush`. No NgModules. Zoneless-ready.
- Inputs are signals: `input()`, `input.required()`, `model()` for two-way, `output()`. Boolean inputs use
  `{ transform: booleanAttribute }`. Templates use `@if` / `@for` / `@switch`.
- **Forms are Signal Forms** (`@angular/forms/signals`). There is no ControlValueAccessor.
  - Value controls (TextInput, Select, PasswordField) implement `FormValueControl<T>` with `value = model<T>()`.
  - Checkbox and Switch implement `FormCheckboxControl` with `checked = model(false)`.
  - All of them extend `FieldControl` (`components/form/field-control.ts`), which carries the field-state inputs
    (`disabled`, `readonly`, `required`, `invalid`, `name`, `errors`, a manual `error`) and `message()`.
  - **Angular 21.2 adaptation:** `touched` is a `model(false)`; controls call `touched.set(true)` on blur. (The
    design system targets Angular 22, where this is a `touch` output — switch when the repo upgrades.)
  - Consumers bind with `[formField]="f.name"`; without a form, `[(value)]` / `[(checked)]`.
- **Native elements first.** Buttons, links, nav items and info cards are attribute components on real
  `<button>`/`<a>` (`button[libButton]`, `a[libLink]`, `a[libNavItem]`, `button[libInfoCard]`) so `routerLink`,
  `type="submit"` and `disabled` stay native. ESLint's component-selector rule needs a disable comment on those.
- Overlays go through the **CDK Dialog** (`DialogService.open()`, `await ConfirmService.ask()`); clipboard through
  the CDK `Clipboard`. Toasts: `ToastService.show()` with one `<lib-toaster />` in the app root.
- Peer deps (`package.json`): `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/cdk`, `rxjs`.
- Import from **`ngx-paper-ui`** (the tsconfig path alias in this repo, the package name outside it).

## Naming

| Thing | Convention | Example |
|---|---|---|
| Element selectors | `lib-` + kebab | `lib-text-input`, `lib-main-view` |
| Attribute selectors / directives | `lib` + camel | `button[libButton]`, `[libTheme]` |
| Content-projection slots | `lib` + camel attribute | `libTrailing`, `libLeading`, `libMainSidebar`, `libModalFooter` |
| Classes | unprefixed PascalCase | `Button`, `TextInput`, `ConfirmService` |
| Constants / helpers | unprefixed | `ICON_NAMES`, `THEME_PRESETS`, `scorePassword()`, `contrast()` |
| Rendered CSS classes | `ui-` | `ui-btn`, `ui-field`, `ui-card` |

The design system documents these same `lib-` names; it used `pu-` / `Pu…` before the first sync.

## Styles

- **Styles are global.** Components have no `styles`/`styleUrls`. This is intentional: a component is two files,
  `<name>.ts` and its template `<name>.html` (`templateUrl: './<name>.html'`), and every rule lives in
  `styles/paper-ui/*.css`. In this repo the docs app imports `src/styles/index.css` (the in-repo entry: the
  Inter import, `tokens.css`, `paper-ui/*.css`).
  - Why global and not scoped: the same CSS ships as `paper-ui.css` and as the design system's two-way
    `bundle.css`; many rules style child components (`.ui-list > .ui-card`, the shared focus rule, dark-mode and
    `.ui-theme` rules); `cdk.css` must be global anyway; and apps use `ui-*` classes on plain markup.
  - **No third-party styling libraries.** Consumers only need this library's rules: no Tailwind or other utility
    framework, in the package or its docs. Responsive structure ships as layout components (container queries +
    tokens, like `MainView`), kept coarse: page-level shells, not spacing or flex helpers.
- **Templates** sit next to their component, named after the `.ts` file (`button.ts` → `button.html`). The one
  exception is the private `ConfirmHost` in `confirm.service.ts`, whose template is `confirm-host.html`. They
  are linted with the Angular template rules and synced to the design system as sources.
- **Templates are Prettier-formatted, one attribute per line** (the `.prettierrc` override for
  `libs/ui/src/**/*.html`: `parser: angular`, `singleAttributePerLine`, `bracketSameLine`, `printWidth` 120). A
  multi-line start tag closes on its last attribute's line (`[id]="titleId">`, `size="sm" />`). `nx lint ui` fails on
  a misformatted template (`prettier/prettier`); fix with `nx lint ui --fix` or `npm run prettier`.
  - Put an `<!-- eslint-disable-next-line … -->` comment **inside** a control-flow block, directly above the
    element. Prettier 3.6 drops a comment placed right before `@if` / `@for`.
- **The published stylesheet** `paper-ui.css` is generated by `nx run ui:styles` (`scripts/build-styles.mjs`,
  which runs before `nx build ui`) into `src/styles/package/`, and lands at the package root: plain CSS for any app
  (Inter import, `tokens.css`, every `paper-ui/*.css` in `index.css` import order).

  The part order and join live in `scripts/css-parts.mjs`, shared with the design-system sync's `bundle.css`.
  `package-styles.spec.ts` fails if the output is stale.
- **`styles/tokens/tokens.json` is the token source**, in the design system's format and synced with it.
  `nx run ui:tokens` (`scripts/build-tokens.mjs`, which also runs before `nx build ui`) generates:
  - `tokens.css`: light values on `:root`, dark on `[data-theme="dark"]`, and `.type-<style>` classes
  - the docs site's copy

  **Never edit the generated CSS.** Change `tokens.json` (or the design system, then sync); a spec fails if the
  outputs are stale. The derived tokens are listed once, in `derived-tokens.json`.
- `styles/paper-ui/*.css`: the component stylesheet (`ui-*` classes), split by area. Add rules to the matching file.
- In CSS, **use tokens and never hex**. Component tokens (`button-*`, `sidebar-*`, `nav-item-*`, `card-*`, `input-*`)
  alias the base colours.

## Theming

- **`primary` (paired with `on-primary`) is the only configurable colour.** `primary-hover`, `primary-text`,
  `primary-soft`, `focus-ring`, `nav-item-active-bg`, `shadow-focus` and the button/nav/card primary aliases are
  **derived** with `color-mix()` in `paper-ui/base.css`. Never set them directly.
- App-wide: `inject(ThemeService).setPrimary('#3f5a7a')`. Scoped: `<section libTheme primary="#a84a2c">`. An
  `on-primary` and a dark variant are computed when you don't pass them. `THEME_PRESETS` lists seven checked pairs.
- A custom primary needs **≥ 4.5:1 against `surface`** (`contrast()` checks it). Choose muted, ink-like hues.
- Everything else is fixed: neutrals, `secondary`, `danger`, `success`, `warning`.
- Dark mode: `ThemeService.setMode('dark')` sets `data-theme="dark"` on `<html>`.

## Visual rules

- **Palette:** one warm sepia family. Paper `surface` #fbf7ef, `surface-raised` #f4ecdf, ink `on-surface` #2b2118,
  `on-surface-muted` #6b5a47. The dark theme is deep sepia (#1b1712), not black. Nothing is pure black, pure white or
  a saturated screen colour. Shadows and the scrim are sepia-tinted.
- **Grounds:** `surface` for the main pane, inputs and cards. `surface-raised` for the sidebar and aside.
  `surface-hover` for hover fills.
- **Text:** `on-surface` for primary text, `on-surface-muted` for secondary text, labels, placeholders and resting
  icons. For primary-coloured text use `primary-text`, not `primary`.
- **Status:** `danger`, `warning`, `success` are fills. As text use `*-text` on `surface` or on `*-soft`.
  `warning` and `success` fail as text.
- **Type:** Inter only (400/500/600/700). The styles are `heading-1` 34/40 bold, `page-title` 24/32,
  `section-title` 20/28, `wordmark` 18/24, `body` 14/20, `label` 14/20 medium, `label-strong` 14/20 semibold,
  `label-sm` 13/18 medium, `caption` 12/16, and `overline` 11/16 semibold uppercase.
- **Spacing:** a 4px scale, `space-1` 4 … `space-6` 24, plus `space-8` 32.
- **Radii:** `radius-sm` 6 (menu items, badges), `radius-md` 8 (buttons, inputs, nav items), `radius-lg` 12
  (cards, toasts, app frame), `radius-xl` 16 (modals), `radius-full` (avatars, switches, progress).
- **Elevation:** a 1px `border` separates, `border-hover` on hover. `shadow-sm` on filled buttons, `shadow-md` on
  their hover and on menus and toasts, `shadow-lg` on modals.
- **States:**
  - Focus: one treatment everywhere, `shadow-focus` on `:focus-visible`.
  - Hover: changes fills, never text colour.
  - Disabled: `disabled-opacity` 0.5 plus `not-allowed`; labels stay outside the dimmed box.
  - Error: `danger` border plus a `danger-text` message with the alert icon.
  - Selected: `card-bg-selected` plus `card-border-selected`.
- **Contrast:** text 4.5:1 in every theme; 3:1 for 24px+, control borders, focus rings and icons. Known gap kept
  from the source: `border` on `surface` is 1.3:1.
- **Layout is mobile first.** Start at the smallest width and add structure at `bp-md` 768px and `bp-lg` 1024px with
  `min-width` queries. A component's own threshold is a `breakpoint` token too (`bp-list` 420px). CSS can't read
  `var()` in a query condition, so the values are written out; `breakpoints.spec.ts` fails if a query width in
  `paper-ui/*.css` isn't a `breakpoint` token value. `MainView` uses container queries on its own width: header plus
  drawer on mobile, then sidebar · main · detail columns (208/288 at md, 256/360 at lg).

## Content

- Sentence case everywhere, except sidebar section overlines ("MAIN MENU").
- Buttons are short verbs ("Create", "Save changes", "Delete"). Toasts are past tense ("Copied", "Changes saved").
- Address the user as "you". State consequences exactly, especially destructive ones: "It moves to Trash and is
  removed for good after 30 days."
- Validation messages come from the Signal Forms validator's `message`.

## Icons

- Use `<lib-icon>`: a stroke set on a 24px grid, 1.75px stroke, round caps, drawn in `currentColor`.
- Three sizes only: `sm` 16 (fields, sm buttons, menus, tabs), `md` 18 (the default: nav, md buttons, toasts),
  `lg` 20 (lg buttons, modal tiles, headers).
- **Each icon is a file:** `src/assets/icons/<name>.svg`, the single source of truth. `nx run ui:icons`
  (`scripts/build-icons.mjs`, which also runs before `nx build ui`) generates three things:
  - `src/assets/icons.svg`, a sprite of `<symbol id="<name>">` with shapes only (no stroke or colour attributes).
  - `components/icon/icon-names.ts`, which holds `ICON_NAMES` and `IconName`.
  - `components/icon/icon-sprite-data.ts`, which holds `ICON_SPRITE_SVG` (the sprite as a string).
  Never edit them by hand. A spec fails if they're stale.
- **To add an icon:** add `<name>.svg` in kebab-case, with `viewBox="0 0 24 24"`, `fill="none"`,
  `stroke="currentColor"` and `stroke-width="1.75"` on the root, and plain shapes inside (the script rejects
  hard-coded colours). Then run `nx run ui:icons`. Don't use icon fonts or inline path strings.
- **Rendering:** `<lib-icon>` draws `<svg …><use href="assets/ui/icons.svg#<name>"/></svg>`. Size, stroke,
  `currentColor` and a11y attributes sit on the outer `<svg>` and inherit into the symbol.
- **Apps provide the sprite** one of two ways:
  - `provideInlineIconSprite()`: puts `ICON_SPRITE_SVG` into the page once (a hidden `#lib-icon-sprite`) and
    sets `ICON_SPRITE_URL` to `''`, so hrefs are `#name`. It's a no-op outside the browser. The
    design-system bundle's `mount.ts` uses it.
  - Serve the file: copy `icons.svg` to `assets/ui/` (see `apps/ui-demo-app/project.json` → build `assets`;
    from the package, `node_modules/ngx-paper-ui/assets`), or serve it elsewhere and call
    `provideIconSprite(url)`. It must be same-origin, because browsers block cross-origin `<use>`.
- There is no logo asset. `<lib-logo name="…">` renders the product name with a `primary` initial tile.

## Adding or changing a component

1. Create `src/components/<kebab>/<kebab>.ts`, its template `<kebab>.html` (`templateUrl`), `index.ts` and a
   guideline `README.md` (the first sentence is the summary; it syncs with the design-system card). Use
   `src/layouts/` for page layouts. Put any styles in `styles/paper-ui/*.css` under `ui-*` classes, in a
   `/* ---- Name ---- */` section (the sync splits `bundle.css` back by those headers).
2. Export it from `src/components/index.ts` (grouped by category) and add it to `PAPER_UI` in `src/paper-ui.ts`.
3. Add or extend a spec for any behaviour (keyboard handling, form wiring, computed classes).
4. Add its docs page in `apps/ui-demo-app` (Showcase · API · CSS tokens); see that app's routes.
5. **Keep the design system in step with `/sync-design-system`.** This repo is canonical for code, CSS and
   API docs; tokens, the brand book (`docs/brand-book.md`), component READMEs and icons sync both ways. The
   page's `<kebab>.docs.ts` must stay a JSON literal, because the sync renders it into the card's
   `preview.html`.

## Commands

```sh
nx run ui:icons  # regenerate the icon sprite, ICON_NAMES and icon-sprite-data.ts from src/assets/icons/*.svg
nx run ui:tokens # regenerate tokens.css and the docs copies from tokens.json
nx run ui:styles # regenerate the published paper-ui.css (src/styles/package/)
nx build ui      # runs the three above, then ng-packagr (partial compilation) into dist/libs/ui/
nx test ui       # Vitest
nx lint ui
```
