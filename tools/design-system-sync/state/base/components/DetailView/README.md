Detail panel for one record: header, status badges, copyable read-only fields, an optional masked password with strength, and a footer.

**Angular:** `lib-detail-view` · `DetailView` (standalone, OnPush) · source `libs/ui/src/components/detail-view/detail-view.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | required |  |
| `subtitle` | `string` | — |  |
| `href` | `string` | — | Shown as a link |
| `icon` | `IconName` | — |  |
| `badges` | `BadgeSpec[]` | `[]` |  |
| `fields` | `DetailField[]` | `[]` | `{ label, value, copyable? }` |
| `password` | `string \| null` | `null` | Adds PasswordField + StrengthMeter |
| `passwordLabel` | `string` | `'Password'` |  |
| `strength` | `0–4` | — |  |
| `strengthHint` | `string` | — |  |
| `showStrength` | `boolean` | `true` |  |
| `meta` | `string` | — | Footer text |
| `editable` | `boolean` | `false` | Shows Edit |
| `deletable` | `boolean` | `false` | Shows Delete |

**Outputs**

| Name | Payload | Notes |
| --- | --- | --- |
| `copied` | `string` | Label of the copied field |
| `edit` | `void` |  |
| `delete` | `void` | Ask with `ConfirmService` first |

**Content slots:** `[libLeading]` — replaces the icon tile · default — extra content under the fields

```html
<lib-detail-view [title]="item().name" [href]="item().url" [fields]="[{ label: 'Username', value: item().username }]"
  [password]="item().password" editable deletable (delete)="remove()" (copied)="toast.show($event + ' copied')" />
```

**Design**
- `surface`, 1px `border`, `radius-lg`, padding and gap `space-6`. Title `section-title`.
- Fields are read-only TextInputs, `space-4` apart.

**CSS tokens:** `surface`, `border`, `primary-text`, `on-surface-muted`, `radius-lg`, `space-6`, `space-4`, `text-xl`, `text-xs`
