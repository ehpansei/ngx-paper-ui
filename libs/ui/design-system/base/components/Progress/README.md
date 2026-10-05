Horizontal bar showing how far a task has got.

**Angular:** `lib-progress` · `Progress` (standalone, OnPush) · source `libs/ui/src/components/progress/progress.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `number` | `0` | 0–100 |
| `label` | `string` | — |  |
| `showValue` | `boolean` | `false` | Shows the % |
| `tone` | `'success' \| 'danger'` | — | Default follows primary |

```html
<lib-progress label="Uploading" [value]="upload.progress()" showValue />
```

**Design**
- 6px track on `surface-hover`, `radius-full`. Fill `primary`, or `success` / `danger`.

**CSS tokens:** `surface-hover`, `primary`, `success`, `danger`, `on-surface`, `on-surface-muted`, `radius-full`, `text-xs`
