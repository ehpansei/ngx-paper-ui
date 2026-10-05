A titled group of NavItems inside the Sidebar — e.g. just “Main menu” or just “Navigation”. It can collapse, and nest one level for a sub-group.

**Angular:** `lib-nav-section` · `NavSection` (standalone, OnPush) · source `libs/ui/src/components/nav-section/nav-section.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — | Overline and the `<nav>` `aria-label` |
| `collapsible` | `boolean` | `false` | The title becomes a toggle button (`aria-expanded`) with a chevron |
| `expanded` | `boolean` (two-way) | `true` | Whether a collapsible section shows its items; bind `[(expanded)]` to control it |

**Content slots:** default — `libNavItem`s, and nested `lib-nav-section`s for sub-groups

```html
<lib-nav-section title="Main menu">
  <a libNavItem routerLink="/dashboard" icon="home">Dashboard</a>
  <a libNavItem routerLink="/inbox" icon="inbox" [count]="unread()">Inbox</a>
</lib-nav-section>

<lib-nav-section title="Forms" collapsible [(expanded)]="formsOpen">
  <a libNavItem routerLink="/text-input">Text input</a>
  <lib-nav-section title="Passwords" collapsible>
    <a libNavItem routerLink="/password-field">Password field</a>
  </lib-nav-section>
</lib-nav-section>
```

**Design**
- Items stack with a 2px gap. Title in `overline`: 11px Semi Bold uppercase, `on-surface-muted`.
- Collapsible: the whole title row is the toggle, with a 16px `chevron-down` at the right that turns −90° when collapsed; hover lifts the title to `on-surface`. Collapsed items stay in the DOM but are `hidden`.
- Nested: indented by `space-3`, rendered as a `role="group"` (not a second `<nav>` landmark).
- Top-level collapsible sections sit their items on a `nav-section-items-bg` panel (`surface`, `radius-md`, `space-1` inset) — a shade lighter than the sidebar; nested sub-groups share the parent's panel.

**CSS tokens:** `on-surface-muted`, `on-surface`, `text-2xs`, `nav-item-padding-x`, `nav-item-radius`, `nav-section-items-bg`, `radius-md`, `space-1`, `space-2`, `space-3`
