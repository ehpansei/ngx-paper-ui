Masked secret field with reveal and copy controls.

**Angular:** `lib-password-field` · `PasswordField` (standalone, OnPush) · source `libs/ui/src/components/form/inputs/password-field/password-field.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Models (two-way)**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `string` | `''` | The secret |
| `revealed` | `boolean` | `false` | Two-way: `[(revealed)]` |

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string \| null` | `'Password'` | Also names the buttons |
| `copyable` | `boolean` | `true` | Show the copy button |
| `autocomplete` | `'current-password' \| 'new-password' \| 'off'` | `'off'` |  |
| `block` | `boolean` | `false` |  |
| `disabled` | `boolean` | `false` | From the field (`disabled()` rule) or set directly |
| `readonly` | `boolean` | `false` | From the field (`readonly()` rule) |
| `required` | `boolean` | `false` | From the field (`required()` rule); adds `aria-required` |
| `invalid` | `boolean` | `false` | From the field |
| `touched` | `boolean` | `false` | Two-way with the field (`model`); set on blur. Errors show once touched |
| `name` | `string` | `''` | From the field |
| `errors` | `ValidationError[]` | `[]` | From the field; the first error's `message` is shown |
| `error` | `string \| null` | `null` | Manual message, for use without a form |

**Outputs**

| Name | Payload | Notes |
| --- | --- | --- |
| `copied` | `void` | After the value was copied (CDK Clipboard); show a Toast |

**Signal Forms:** Signal Forms control — implements `FormValueControl<string>` from `@angular/forms/signals`. Bind it with the `FormField` directive: `[formField]="myForm.field"`; the directive syncs the value and the field state (disabled, readonly, required, errors, touched). Without a form, use two-way binding: `[(value)]`. Angular 21.2: `touched` is a two-way model (set on blur); there is no `touch` output.

```ts
readonly model = signal({ password: '' });
readonly f = form(this.model, p => minLength(p.password, 8, { message: 'Use at least 8 characters' }));

<lib-password-field [formField]="f.password" autocomplete="new-password" [copyable]="false" />
<lib-strength-meter [password]="model().password" />
```

**Design**
- Same box as TextInput; value in tabular figures with slight tracking.
- Masked by default; reveal is a toggle (`aria-pressed`). Field buttons use `sm` icons.

**CSS tokens:** `input-bg`, `input-border`, `input-border-hover`, `on-surface`, `on-surface-muted`, `danger`, `danger-text`, `shadow-focus`, `input-height`, `input-width`, `radius-md`, `space-3`, `text-sm`, `text-xs-plus`, `text-xs`, `disabled-opacity`, `surface-hover`
