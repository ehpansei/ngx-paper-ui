A titled group of NavItems inside the Sidebar — e.g. just “Main menu” or just “Navigation”.

**Angular:** `lib-nav-section` · `NavSection` (standalone, OnPush) · source `libs/ui/src/components/nav-section/nav-section.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | — | Overline and the `<nav>` `aria-label` |

**Content slots:** default — `libNavItem`s

```html
<lib-nav-section title="Main menu">
  <a libNavItem routerLink="/dashboard" icon="home">Dashboard</a>
  <a libNavItem routerLink="/inbox" icon="inbox" [count]="unread()">Inbox</a>
</lib-nav-section>
```

**Design**
- Items stack with a 2px gap. Title in `overline`: 11px Semi Bold uppercase, `on-surface-muted`.

**CSS tokens:** `on-surface-muted`, `text-2xs`, `nav-item-padding-x`, `space-2`
