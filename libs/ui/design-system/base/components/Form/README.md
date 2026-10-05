A whole form from a config array: inputs and selects with labels, helpers, initial values and validation rules, built on Signal Forms.

**Angular:** `lib-form` · `Form` (standalone, OnPush) · source `libs/ui/src/components/form/form.ts`. The documentation page (this card) shows two working forms, their configs, the API and the CSS tokens it uses.

**When to use:** settings panels, sign-up and admin forms whose fields come from data or change often. For custom layout, cross-field rules or controls other than TextInput and Select, build the form by hand with `form()` and `[formField]` on the individual controls.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `formConfig` | `FormConfig` | required | One entry per field, rendered in order. A new array resets the values |

**Outputs**

| Name | Payload | Notes |
| --- | --- | --- |
| `submitted` | `FormModel` | The values, on a valid submit only |
| `invalidSubmit` | `void` | A submit was blocked; every field is now touched, so all errors show |

**Content slots:** default — rendered after the fields: the submit button and any secondary actions.

**Field config** (plain data, so a config can be stored or sent as JSON)

| Key | Type | Notes |
| --- | --- | --- |
| `key`, `label` | `string` | Required. `key` is the property in the submitted value |
| `controlType` | `'input' \| 'select'` | TextInput or Select |
| `type` | `'text' \| 'email' \| 'search' \| 'url' \| 'tel'` | Inputs only |
| `options` | `SelectOption[]` | Selects only |
| `placeholder`, `helper` | `string` | The helper shows until an error replaces it |
| `value` | `string \| number \| null` | Initial value; default `''` (inputs) / `null` (selects) |
| `disabled` | `boolean` | Dimmed, still submitted |
| `required` | `boolean \| string` | A string is the message |
| `email` | `boolean \| string` | Inputs only |
| `minLength`, `maxLength` | `number \| { value, message }` | |
| `pattern` | `string \| { value, message }` | A RegExp source string |

Every rule has a readable default message ("Email is required", "Use at least 2 characters"); give your own where the default is vague, especially for `pattern`. Rules are read once, on init.

```ts
readonly fields: FormConfig = [
  { controlType: 'input', key: 'email', label: 'Email', type: 'email', required: true, email: true },
  { controlType: 'select', key: 'role', label: 'Role', required: 'Choose a role',
    options: [{ value: 'viewer', label: 'Viewer' }, { value: 'editor', label: 'Editor' }] },
];

<lib-form [formConfig]="fields" (submitted)="save($event)">
  <button libButton type="submit">Save</button>
</lib-form>
```

**Design**
- Fields stack at `space-4`, full width (`block`); put the submit button in the default slot, right after the last field.
- Errors follow the field states of TextInput and Select: `danger` border plus a `danger-text` message, shown once touched. A blocked submit touches every field, so all errors appear at once.
- Messages state the fix ("Start with http:// or https://"), in sentence case.

**CSS tokens:** `input-bg`, `input-border`, `input-border-hover`, `input-height`, `border`, `danger`, `danger-text`, `on-surface-muted`, `space-4`, `radius-md`, `disabled-opacity`
