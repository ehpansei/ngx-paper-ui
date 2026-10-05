import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "NavSection" (API + CSS tokens). */
export const NAV_SECTION_DOC: ComponentDoc = {
  "name": "NavSection",
  "title": "NavSection",
  "summary": "A titled group of NavItems inside the Sidebar — e.g. just “Main menu” or just “Navigation”. It can collapse, and nest one level for a sub-group.",
  "group": "Navigation",
  "subtitle": null,
  "meta": [
    "lib-nav-section",
    "NavSection",
    "libs/ui/src/components/nav-section/nav-section.ts"
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
          "<code>title</code>",
          "string",
          "—",
          "Overline and the <code>&lt;nav&gt;</code> <code>aria-label</code>"
        ],
        [
          "<code>collapsible</code>",
          "boolean",
          "false",
          "The title becomes a toggle button (<code>aria-expanded</code>) with a chevron"
        ],
        [
          "<code>expanded</code>",
          "boolean",
          "true",
          "Whether a collapsible section shows its items. Bound by <code>[(expanded)]</code>"
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
      "html": "<ul><li>default — <code>libNavItem</code>s, and nested <code>lib-nav-section</code>s for sub-groups</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-nav-section title=\"Main menu\">\n  <a libNavItem routerLink=\"/dashboard\" icon=\"home\">Dashboard</a>\n  <a libNavItem routerLink=\"/inbox\" icon=\"inbox\" [count]=\"unread()\">Inbox</a>\n</lib-nav-section>\n\n<lib-nav-section title=\"Forms\" collapsible [(expanded)]=\"formsOpen\">\n  <a libNavItem routerLink=\"/text-input\">Text input</a>\n  <lib-nav-section title=\"Passwords\" collapsible>\n    <a libNavItem routerLink=\"/password-field\">Password field</a>\n  </lib-nav-section>\n</lib-nav-section>"
    }
  ],
  "tokens": [
    "on-surface-muted",
    "on-surface",
    "text-2xs",
    "nav-item-padding-x",
    "nav-item-radius",
    "nav-section-items-bg",
    "radius-md",
    "space-1",
    "space-2",
    "space-3"
  ]
};
