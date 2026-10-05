import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Sidebar" (API + CSS tokens). */
export const SIDEBAR_DOC: ComponentDoc = {
  "name": "Sidebar",
  "title": "Sidebar",
  "summary": "Left app navigation: logo, titled nav sections, and a user block pinned to the bottom.",
  "group": "Navigation",
  "subtitle": null,
  "meta": [
    "lib-sidebar",
    "Sidebar",
    "libs/ui/src/components/sidebar/sidebar.ts"
  ],
  "blocks": [
    {
      "kind": "heading",
      "text": "Inputs"
    },
    {
      "kind": "empty",
      "text": "None."
    },
    {
      "kind": "heading",
      "text": "Outputs"
    },
    {
      "kind": "empty",
      "text": "None."
    },
    {
      "kind": "heading",
      "text": "Content slots"
    },
    {
      "kind": "html",
      "html": "<ul><li><code>[libSidebarLogo]</code> — defaults to <code>&lt;lib-logo /&gt;</code></li><li>default — <code>lib-nav-section</code>s</li><li><code>[libSidebarFooter]</code> — usually <code>lib-sidebar-user</code></li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-sidebar>\n  <lib-logo libSidebarLogo name=\"Acme\" />\n  <lib-nav-section title=\"Main menu\">\n    <a libNavItem routerLink=\"/projects\" routerLinkActive #rla=\"routerLinkActive\" [active]=\"rla.isActive\" icon=\"folder\">Projects</a>\n  </lib-nav-section>\n  <lib-sidebar-user libSidebarFooter [name]=\"user().name\" [email]=\"user().email\" />\n</lib-sidebar>"
    }
  ],
  "tokens": [
    "sidebar-bg",
    "sidebar-border",
    "sidebar-width",
    "sidebar-padding",
    "space-4",
    "space-5",
    "space-6"
  ]
};
