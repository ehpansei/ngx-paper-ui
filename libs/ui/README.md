# ngx-paper-ui

**Paper UI for Angular.** Components that look like ink on paper: cream surfaces, sepia ink, one configurable
primary colour, and Inter throughout. They're quiet and precise, and dense enough for productivity tools.

- Standalone, OnPush components with signal inputs, zoneless-ready
- Form controls are **Signal Forms** controls (`@angular/forms/signals`), bound with `[formField]`
- A config-driven form (`lib-form`) with validation rules as plain JSON
- One theme input (`primary`), with the other primary shades derived automatically; light and dark themes
- 31 stroke icons, a sidebar app layout, dialogs, toasts, tabs, cards and more

**Docs and live examples:** https://ehpansei.github.io/ngx-paper-ui/

## Install

```sh
npm i ngx-paper-ui @angular/cdk
```

Requires **Angular ≥ 21.2** (`@angular/core`, `@angular/common`, `@angular/forms`, `@angular/cdk`) and
`rxjs` 7.8.

## 1. Add the styles

Components carry no styles of their own; one global stylesheet styles them all. In `angular.json` →
`build.options.styles`:

```json
"styles": ["node_modules/ngx-paper-ui/paper-ui.css", "src/styles.css"]
```

`paper-ui.css` is plain CSS: the design tokens (as CSS custom properties such as `var(--surface)`), every
component style and the Inter font import. It needs no CSS framework or build plugin.

## 2. Make the icons available

`<lib-icon>` draws from an SVG sprite. Pick one:

**Inline (no configuration).** The sprite (about 4 KB) is added to the page once at startup:

```ts
// app.config.ts
import { provideInlineIconSprite } from 'ngx-paper-ui';

export const appConfig: ApplicationConfig = {
  providers: [provideInlineIconSprite()],
};
```

**As a cached file.** Copy the sprite into your build. In `angular.json` → `build.options.assets`:

```json
{ "glob": "icons.svg", "input": "node_modules/ngx-paper-ui/assets", "output": "assets/ui" }
```

`<lib-icon>` reads `assets/ui/icons.svg` by default. To serve the sprite somewhere else, use
`provideIconSprite('/static/icons.svg')`. It must be same-origin, because browsers block cross-origin `<use>`.

## 3. Use the components

Import everything with `PAPER_UI`, or import single classes:

```ts
import { Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-root',
  imports: [PAPER_UI],
  template: `
    <button libButton icon="plus">Create</button>
    <button libButton variant="secondary">Cancel</button>
    <lib-badge tone="success">Active</lib-badge>
    <lib-icon name="search" size="sm" />
  `,
})
export class App {}
```

Selectors are `lib-*` for elements (`<lib-text-input>`) and `lib*` for attributes on native elements
(`<button libButton>`, `<a libLink>`, `<a libNavItem>`). Because those are real buttons and links,
`routerLink`, `type="submit"` and `disabled` work as usual.

### Signal Forms

`TextInput`, `Select` and `PasswordField` are `FormValueControl`s, and `Checkbox` and `Switch` are
`FormCheckboxControl`s. Bind them with Angular's `FormField` directive:

```ts
import { Component, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-owner',
  imports: [PAPER_UI, FormField],
  template: `
    <lib-text-input label="Name" [formField]="f.name" />
    <lib-text-input label="Email" type="email" [formField]="f.email" />
    <lib-select label="Role" [formField]="f.role" [options]="roles" />
  `,
})
export class Owner {
  readonly roles = [{ value: 'viewer', label: 'Viewer' }, { value: 'editor', label: 'Editor' }];
  readonly model = signal({ name: '', email: '', role: 'viewer' });
  readonly f = form(this.model, (p) => {
    required(p.name, { message: 'Name is required' });
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Enter a valid email' });
  });
}
```

Each validator's `message` appears under the control once it has been touched (on blur). Without a form, bind
`[(value)]` or `[(checked)]` instead. There is no ControlValueAccessor.

### A form from a config

`lib-form` builds a Signal Forms form from plain data. That means a form can be stored or sent as JSON:

```ts
readonly signup: FormConfig = [
  { controlType: 'input', key: 'name', label: 'Full name', required: true, minLength: 2 },
  { controlType: 'input', key: 'email', label: 'Email', type: 'email', required: 'Add your email', email: true },
  { controlType: 'input', key: 'website', label: 'Website', pattern: { value: '^https?://', message: 'Start with http:// or https://' } },
  { controlType: 'select', key: 'role', label: 'Role', required: true,
    options: [{ value: 'viewer', label: 'Viewer' }, { value: 'admin', label: 'Admin' }] },
];
```

```html
<lib-form [formConfig]="signup" (submitted)="save($event)" (invalidSubmit)="onInvalid()">
  <button libButton type="submit">Create account</button>
</lib-form>
```

The rules are `required`, `email`, `minLength`, `maxLength` and `pattern`, each either a bare value or
`{ value, message }`. `value` sets a field's initial value and `disabled` disables it. `submitted` fires only
when the form is valid; otherwise `invalidSubmit` fires and every error shows.

### Dialogs and toasts

```ts
const confirm = inject(ConfirmService);
if (await confirm.ask({ title: 'Delete “Q3 report”?', description: 'It moves to Trash and is removed for good after 30 days.' })) {
  inject(ToastService).show('Moved to Trash');
}
```

Put one `<lib-toaster />` in your root template. Dialogs open through the Angular CDK (`DialogService.open()`),
so Escape, focus trapping and the backdrop work as you'd expect.

## Theming

`primary` (with its pair `on-primary`) is the only configurable colour. Hover, soft and focus shades are
derived from it.

```ts
inject(ThemeService).setPrimary('#3f5a7a'); // app-wide
inject(ThemeService).setMode('dark');       // sets data-theme="dark" on <html>
```

```html
<section libTheme primary="#a84a2c">…</section> <!-- one region -->
```

A readable `on-primary` and a dark-theme variant are computed for you. `THEME_PRESETS` lists seven checked
choices, and `contrast()` tells you whether your own colour reaches 4.5:1 against the page.

## Breakpoints

Layouts are mobile first: they start at the smallest width and add structure at these breakpoints.

| Token | Value | What changes |
|---|---|---|
| `bp-md` | 768px | `lib-main-view` goes from a header plus drawer to sidebar, main and detail columns |
| `bp-lg` | 1024px | The sidebar and detail columns reach their full widths |
| `bp-list` | 420px | Info cards in a `.ui-list` switch from compact to full spacing |

They're also defined as `--bp-md`, `--bp-lg` and `--bp-list`, but CSS doesn't allow `var()` inside a `@media` or
`@container` condition, so write the values in your own queries. Prefer **container queries**, as the library
does: a layout then adapts to the space it's given (a pane, a dialog, a split view), not to the whole window.

```css
.orders { container: orders / inline-size; }
.orders-grid { display: grid; gap: var(--space-4); }
@container orders (min-width: 768px) {
  .orders-grid { grid-template-columns: 1fr 1fr; }
}
```

## Design principles

- **One warm sepia family.** Paper surfaces and ink text. Nothing is pure black, pure white or a saturated screen
  colour, and the dark theme is deep sepia rather than black.
- **One accent.** Everything primary-like follows `primary`. Status colours (`danger`, `warning`, `success`)
  are fixed.
- **Quiet and dense.** Inter at 14/20 for body text, a 4px spacing scale, 1px borders and soft sepia shadows.
  No decorative gradients, illustrations or emoji.
- **One focus treatment** everywhere, and text contrast of at least 4.5:1 in both themes.
- **Mobile first.** Layouts gain structure at 768px and 1024px. `lib-main-view` goes from a header plus drawer
  to sidebar, main and detail columns.
- **Plain words.** Sentence case, short verb buttons ("Save changes"), past-tense toasts ("Copied"), and
  consequences stated exactly.

## License

MIT © 2026 Pedro Castro
