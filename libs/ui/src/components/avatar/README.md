Round initials avatar for people.

**Angular:** `lib-avatar` · `Avatar` (standalone, OnPush) · source `libs/ui/src/components/avatar/avatar.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | required | Initials derive from it |
| `size` | `number` | `32` | px |
| `tone` | `'primary' \| 'alt'` | `'primary'` |  |

Decorative (`aria-hidden`): always show the name next to it.

```html
<lib-avatar name="Ana Silva" tone="alt" [size]="40" />
```

**Design**
- `primary` (follows primary) or `avatar-alt`, text `on-primary`, `radius-full`.

**CSS tokens:** `primary`, `avatar-alt`, `on-primary`, `avatar-size`, `radius-full`
