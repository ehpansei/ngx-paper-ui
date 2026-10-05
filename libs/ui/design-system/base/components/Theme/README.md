Scopes a primary colour to part of the page — or the whole app — and everything primary-like follows.

**Angular:** `[libTheme] · ThemeService` · `Theme · ThemeService` (standalone, OnPush) · source `libs/ui/src/theme/theme.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `primary` | `string` | required | Hex, light theme |
| `primaryDark` | `string` | lightened 45% | Hex, dark theme |
| `onPrimary` | `string` | auto | Paper white or deep sepia, whichever reaches 4.5:1 |
| `onPrimaryDark` | `string` | auto |  |

Configurable: `primary` and `on-primary`. Derived in the global CSS and recomputed in every `.ui-theme` scope: primary-hover, primary-text, primary-soft, nav-item-active-bg, focus-ring, shadow-focus, and the primary component aliases. `THEME_PRESETS`: Sepia (default), Indigo ink, Sage, Terracotta, Plum, Ochre, Ink.

```ts
<section libTheme primary="#a84a2c"><button libButton>Terracotta</button></section>

const theme = inject(ThemeService);
theme.setPrimary('#3f5a7a');   // app-wide; dark variant and on-primary derived
theme.setMode('dark');
```

**Design**
- Pick a muted, ink-like primary with ≥4.5:1 on `surface`; the showcase reports it.
- Secondary, danger, success and warning are fixed tokens.

**CSS tokens:** `primary`, `on-primary`, `primary-hover`, `primary-text`, `primary-soft`, `nav-item-active-bg`, `nav-item-active-color`, `focus-ring`, `shadow-focus`, `button-primary-bg`, `card-bg-selected`, `card-border-selected`
