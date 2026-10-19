Small status label: one or two words beside a title.

**Angular:** `lib-badge` · `Badge` (standalone, OnPush) · source `libs/ui/src/components/badge/badge.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `tone` | `'neutral' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` | `info` = `primary` |
| `icon` | `IconName \| null` | per tone | `null` hides it |

**Content slots:** default — the text

```html
<lib-badge tone="success">Active</lib-badge>
<lib-badge [icon]="null">{{ count() }}</lib-badge>
```

**Design**
- Soft ground + text token per tone; each status tone carries an icon.
- `warning` and `success` are never text colours.

**CSS tokens:** `surface-hover`, `on-surface-muted`, `primary-soft`, `primary-text`, `success-soft`, `success-text`, `warning-soft`, `warning-text`, `danger-soft`, `danger-text`, `radius-sm`, `text-xs`, `space-2`
