Single-line text field with label, helper and error text.

**Angular:** `lib-text-input` · `TextInput` (standalone, OnPush) · source `libs/ui/src/components/form/inputs/text-input/text-input.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Models (two-way)**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `string` | `''` | The text; bound by `[formField]` or `[(value)]` |

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string` | — |  |
| `placeholder` | `string` | `''` |  |
| `helper` | `string` | — | Hint under the field |
| `leadingIcon` | `IconName` | — | e.g. `search` |
| `type` | `'text' \| 'email' \| 'search' \| 'url' \| 'tel'` | `'text'` |  |
| `autocomplete` | `string` | — |  |
| `block` | `boolean` | `false` | Full width instead of `input-width` 220 |
| `disabled` | `boolean` | `false` | From the field (`disabled()` rule) or set directly |
| `readonly` | `boolean` | `false` | From the field (`readonly()` rule) |
| `required` | `boolean` | `false` | From the field (`required()` rule); adds `aria-required` |
| `invalid` | `boolean` | `false` | From the field |
| `touched` | `boolean` | `false` | Two-way with the field (`model`); set on blur. Errors show once touched |
| `name` | `string` | `''` | From the field |
| `errors` | `ValidationError[]` | `[]` | From the field; the first error's `message` is shown |
| `error` | `string \| null` | `null` | Manual message, for use without a form |

**Outputs:** none.

**Content slots:** `[libTrailing]` — an action inside the box, e.g. `<button libTrailing class="ui-field-btn">`

**Signal Forms:** Signal Forms control — implements `FormValueControl<string>` from `@angular/forms/signals`. Bind it with the `FormField` directive: `[formField]="myForm.field"`; the directive syncs the value and the field state (disabled, readonly, required, errors, touched). Without a form, use two-way binding: `[(value)]`. Angular 21.2: `touched` is a two-way model (set on blur); there is no `touch` output.

```ts
readonly model = signal({ name: '' });
readonly f = form(this.model, p => {
  required(p.name, { message: 'Name is required' });
  minLength(p.name, 3, { message: 'Must be at least 3 characters' });
});

<lib-text-input label="Name" [formField]="f.name" helper="Shown to your team" />
```

**Design**
- States: default (`input-border`), hover (`input-border-hover`), focus (`shadow-focus`, follows primary), disabled (`disabled-opacity`), error (`danger` border + `danger-text` message with an alert icon).
- Placeholder `on-surface-muted`; label `label-sm`; helper/error `caption`.
- Give every validator a `message`; it shows after the field is touched.

**CSS tokens:** `input-bg`, `input-border`, `input-border-hover`, `on-surface`, `on-surface-muted`, `danger`, `danger-text`, `shadow-focus`, `input-height`, `input-width`, `radius-md`, `space-3`, `text-sm`, `text-xs-plus`, `text-xs`, `disabled-opacity`
