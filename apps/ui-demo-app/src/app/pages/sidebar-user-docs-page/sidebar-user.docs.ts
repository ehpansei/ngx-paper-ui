import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "SidebarUser" (API + CSS tokens). */
export const SIDEBAR_USER_DOC: ComponentDoc = {
  "name": "SidebarUser",
  "title": "SidebarUser",
  "summary": "The signed-in user block pinned to the bottom of the Sidebar.",
  "group": "Navigation",
  "subtitle": null,
  "meta": [
    "lib-sidebar-user",
    "SidebarUser",
    "libs/ui/src/components/sidebar-user/sidebar-user.ts"
  ],
  "blocks": [
    {
      "kind": "heading",
      "text": "Inputs"
    },
    {
      "kind": "table",
      "head": [
        "Name",
        "Type",
        "Default",
        "Notes"
      ],
      "rows": [
        [
          "<code>name</code>",
          "string",
          "required",
          ""
        ],
        [
          "<code>email</code>",
          "string",
          "—",
          "Truncated with an ellipsis"
        ],
        [
          "<code>tone</code>",
          "'primary' | 'alt'",
          "<code>'primary'</code>",
          "Avatar tone"
        ]
      ]
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
      "html": "<ul><li>default — an action, e.g. an icon-only sign-out button</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-sidebar-user libSidebarFooter name=\"Pedro Castro\" email=\"pedro@example.com\">\n  <button libButton variant=\"ghost\" size=\"sm\" icon=\"log-out\" iconOnly label=\"Sign out\" (click)=\"auth.signOut()\"></button>\n</lib-sidebar-user>"
    }
  ],
  "tokens": [
    "border",
    "on-surface",
    "on-surface-muted",
    "avatar-size",
    "text-xs-plus",
    "text-xs",
    "space-3"
  ]
};
