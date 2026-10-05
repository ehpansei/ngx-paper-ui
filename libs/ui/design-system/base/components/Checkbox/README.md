Checkbox for independent on/off choices in forms and lists.

**Angular:** `lib-checkbox` · `Checkbox` (standalone, OnPush) · source `libs/ui/src/components/form/inputs/checkbox/checkbox.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Models (two-way)**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Bound by `[formField]` or `[(checked)]` |

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `indeterminate` | `boolean` | `false` | Mixed state, e.g. “select all” |
| `disabled` | `boolean` | `false` | From the field (`disabled()` rule) or set directly |
| `readonly` | `boolean` | `false` | From the field (`readonly()` rule) |
| `required` | `boolean` | `false` | From the field (`required()` rule); adds `aria-required` |
| `invalid` | `boolean` | `false` | From the field |
| `touched` | `boolean` | `false` | Two-way with the field (`model`); set on blur. Errors show once touched |
| `name` | `string` | `''` | From the field |
| `errors` | `ValidationError[]` | `[]` | From the field; the first error's `message` is shown |
| `error` | `string \| null` | `null` | Manual message, for use without a form |

**Outputs:** none.

**Content slots:** default — the label

**Signal Forms:** Signal Forms control — implements `FormCheckboxControl` from `@angular/forms/signals`. Bind it with the `FormField` directive: `[formField]="myForm.field"`; the directive syncs the checked state and the field state (disabled, readonly, required, errors, touched). Without a form, use two-way binding: `[(checked)]`. Angular 21.2: `touched` is a two-way model (set on blur); there is no `touch` output.

```ts
readonly model = signal({ notify: true });
readonly f = form(this.model);

<lib-checkbox [formField]="f.notify">Notify members</lib-checkbox>
```

**Design**
- 18px box, 1.5px `border-hover`. Checked/indeterminate: `primary` fill, `on-primary` mark; hover `primary-hover`.
- Focus ring on the box. Use Switch for settings that apply immediately.

**CSS tokens:** `border-hover`, `surface`, `primary`, `primary-hover`, `on-primary`, `on-surface`, `on-surface-muted`, `shadow-focus`, `disabled-opacity`, `space-2`
