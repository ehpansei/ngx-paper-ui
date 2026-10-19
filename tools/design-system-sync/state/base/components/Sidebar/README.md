Left app navigation: logo, titled nav sections, and a user block pinned to the bottom.

**Angular:** `lib-sidebar` · `Sidebar` (standalone, OnPush) · source `libs/ui/src/components/sidebar/sidebar.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Content slots:** `[libSidebarLogo]` — defaults to `<lib-logo />` · default — `lib-nav-section`s · `[libSidebarFooter]` — usually `lib-sidebar-user`

```html
<lib-sidebar>
  <lib-logo libSidebarLogo name="Acme" />
  <lib-nav-section title="Main menu">
    <a libNavItem routerLink="/projects" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive" icon="folder">Projects</a>
  </lib-nav-section>
  <lib-sidebar-user libSidebarFooter [name]="user().name" [email]="user().email" />
</lib-sidebar>
```

**Design**
- `sidebar-width` 256, `sidebar-bg`, 1px `sidebar-border`, padding `space-4` / `sidebar-padding`; sections `space-5` apart.
- Building blocks: Logo, NavSection, NavItem, SidebarUser.

**CSS tokens:** `sidebar-bg`, `sidebar-border`, `sidebar-width`, `sidebar-padding`, `space-4`, `space-5`, `space-6`
