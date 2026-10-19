Dropdown for picking one option from a short list.

**Angular:** `lib-select` · `Select<T>` (standalone, OnPush) · source `libs/ui/src/components/form/inputs/select/select.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Models (two-way)**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `T \| null` | `null` | The selected option's value |

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `options` | `SelectOption<T>[]` | required | `{ value, label, disabled? }` |
| `label` | `string` | — |  |
| `placeholder` | `string` | `'Select…'` |  |
| `helper` | `string` | — |  |
| `block` | `boolean` | `false` |  |
| `defaultOpen` | `boolean` | `false` | Open initially (docs, tests) |
| `disabled` | `boolean` | `false` | From the field (`disabled()` rule) or set directly |
| `readonly` | `boolean` | `false` | From the field (`readonly()` rule) |
| `required` | `boolean` | `false` | From the field (`required()` rule); adds `aria-required` |
| `invalid` | `boolean` | `false` | From the field |
| `touched` | `boolean` | `false` | Two-way with the field (`model`); set on blur. Errors show once touched |
| `name` | `string` | `''` | From the field |
| `errors` | `ValidationError[]` | `[]` | From the field; the first error's `message` is shown |
| `error` | `string \| null` | `null` | Manual message, for use without a form |

**Outputs:** none.

**Signal Forms:** Signal Forms control — implements `FormValueControl<T | null>` from `@angular/forms/signals`. Bind it with the `FormField` directive: `[formField]="myForm.field"`; the directive syncs the value and the field state (disabled, readonly, required, errors, touched). Without a form, use two-way binding: `[(value)]`. Angular 21.2: `touched` is a two-way model (set on blur); there is no `touch` output.

Keyboard: ↑/↓, Home/End, Enter/Space, Escape; outside clicks close it. Inside clipping containers, move the menu into a CDK connected overlay.

```html
readonly roles: SelectOption[] = [{ value: 'viewer', label: 'Viewer' }, { value: 'editor', label: 'Editor' }];
readonly model = signal<{ role: string | null }>({ role: null });
readonly f = form(this.model, p => required(p.role, { message: 'Choose a role' }));

<lib-select label="Role" [options]="roles" [formField]="f.role" />
```

**Design**
- Trigger is the TextInput box with a `sm` chevron; open = `shadow-focus`.
- Menu: `surface`, 1px `border`, `radius-md`, `shadow-md`; items `menu-item-height` 36, `radius-sm`, active/selected `surface-hover`, check in `primary-text`.

**CSS tokens:** `input-bg`, `input-border`, `input-border-hover`, `on-surface`, `on-surface-muted`, `danger`, `danger-text`, `shadow-focus`, `input-height`, `input-width`, `radius-md`, `space-3`, `text-sm`, `text-xs-plus`, `text-xs`, `disabled-opacity`, `surface`, `border`, `surface-hover`, `primary-text`, `shadow-md`, `menu-item-height`, `radius-sm`, `space-1`, `space-2`
