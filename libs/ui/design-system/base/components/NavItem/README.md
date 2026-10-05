One entry of a NavSection: icon, label and optional count.

**Angular:** `a[libNavItem], button[libNavItem]` · `NavItem` (standalone, OnPush) · source `libs/ui/src/components/nav-item/nav-item.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `icon` | `IconName` | — |  |
| `active` | `boolean` | `false` | Bind from `routerLinkActive` |
| `disabled` | `boolean` | `false` | Not clickable or focusable |
| `count` | `number \| null` | `null` | Right-aligned |

**Content slots:** default — the label

```html
<a libNavItem routerLink="/projects" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive" icon="folder" [count]="4">Projects</a>
<a libNavItem icon="card" disabled>Billing</a>
```

**Design**
- Rest `nav-item-bg` + `nav-item-color`; hover `nav-item-hover-bg`; active `nav-item-active-bg` + `nav-item-active-color` Semi Bold (follow primary).
- Disabled: `disabled-opacity`, not-allowed cursor, no hover, `aria-disabled`, out of tab order.

**CSS tokens:** `nav-item-bg`, `nav-item-color`, `nav-item-hover-bg`, `nav-item-active-bg`, `nav-item-active-color`, `on-surface`, `on-surface-muted`, `nav-item-height`, `nav-item-radius`, `nav-item-padding-x`, `nav-item-gap`, `text-sm`, `text-xs`, `disabled-opacity`, `shadow-focus`
