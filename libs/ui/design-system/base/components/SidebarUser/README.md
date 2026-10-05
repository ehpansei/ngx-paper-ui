The signed-in user block pinned to the bottom of the Sidebar.

**Angular:** `lib-sidebar-user` · `SidebarUser` (standalone, OnPush) · source `libs/ui/src/components/sidebar-user/sidebar-user.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `string` | required |  |
| `email` | `string` | — | Truncated with an ellipsis |
| `tone` | `'primary' \| 'alt'` | `'primary'` | Avatar tone |

**Content slots:** default — an action, e.g. an icon-only sign-out button

```html
<lib-sidebar-user libSidebarFooter name="Pedro Castro" email="pedro@example.com">
  <button libButton variant="ghost" size="sm" icon="log-out" iconOnly label="Sign out" (click)="auth.signOut()"></button>
</lib-sidebar-user>
```

**Design**
- 32px Avatar; name `label-sm` in `on-surface`, email 12px `on-surface-muted`; 1px `border` top rule.

**CSS tokens:** `border`, `on-surface`, `on-surface-muted`, `avatar-size`, `text-xs-plus`, `text-xs`, `space-3`
