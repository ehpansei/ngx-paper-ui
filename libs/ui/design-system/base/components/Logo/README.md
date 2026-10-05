Product logo block for the top of the Sidebar: a primary tile and the product name.

**Angular:** `lib-logo` · `Logo` (standalone, OnPush) · source `libs/ui/src/components/logo/logo.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | `'Paper UI'` |  |
| `icon` | `IconName` | — | Drawn in the tile instead of the initial |
| `markOnly` | `boolean` | `false` | Tile only |

```html
<lib-logo libSidebarLogo name="Acme" />
```

**Design**
- 28px tile, `radius-md`, `primary` fill with `on-primary` initial (follows primary). Name in `wordmark`.
- No logo artwork ships; project your own mark with `libSidebarLogo`.

**CSS tokens:** `primary`, `on-primary`, `on-surface`, `radius-md`, `text-lg`, `space-1`
