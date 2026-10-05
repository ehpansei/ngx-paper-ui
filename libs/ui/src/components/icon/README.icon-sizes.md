The three icon sizes and where each one goes.

**Angular:** `lib-icon [size]` · `Icon · ICON_SIZES` (standalone, OnPush) · source `libs/ui/src/components/icon/icons.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | sm 16 · md 18 · lg 20 |

Components pick their own icon size; you only choose one for standalone icons.

```html
<lib-icon name="plus" size="sm" />
<lib-icon name="plus" />
<lib-icon name="plus" size="lg" />
```

**Design**
- `sm` 16: inputs, selects, sm buttons, menu checkmarks, field actions, tabs.
- `md` 18 (default): nav items, md buttons, input leading icons, toasts.
- `lg` 20: lg buttons, modal icon tiles, header icons.
- Stroke stays 1.75px at every size; no in-between sizes.

**CSS tokens:** `icon-size-sm`, `icon-size-md`, `icon-size-lg`, `icon-size`
