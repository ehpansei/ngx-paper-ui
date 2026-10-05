Stroke icon set: 24px grid, 1.75px stroke, drawn in `currentColor`.

**Angular:** `lib-icon` · `Icon` (standalone, OnPush) · source `libs/ui/src/components/icon/icon.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `IconName` | required | One of `ICON_NAMES` (generated from `libs/ui/src/assets/icons/*.svg`) |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | 16 / 18 / 20px |
| `strokeWidth` | `number` | `1.75` | Keep the default |
| `title` | `string` | — | Accessible name when the icon stands alone |

Icons are drawn from one sprite with `<use href="…/icons.svg#<name>">`: no inline paths, no sanitizer bypass. Each icon is a file in `libs/ui/src/assets/icons/` (24px grid, 1.75 stroke, `currentColor`); add one and run `nx run ui:icons` to rebuild the sprite and `IconName`. Apps serve the sprite at `assets/ui/icons.svg`, or point `provideIconSprite(url)` at it (same origin).

```html
<lib-icon name="search" size="sm" />
<span style="color: var(--danger-text)"><lib-icon name="alert" title="Error" /></span>
```

**Design**
- Icons take the surrounding text colour: `on-surface-muted` at rest, `primary-text` / `nav-item-active-color` when active.
- Three sizes only — see Icon sizes. The Icons asset group has the same icons as SVG files.

**CSS tokens:** `on-surface`, `on-surface-muted`, `icon-size`, `icon-size-sm`, `icon-size-md`, `icon-size-lg`
