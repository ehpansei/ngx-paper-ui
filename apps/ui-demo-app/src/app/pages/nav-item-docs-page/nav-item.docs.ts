import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "NavItem" (API + CSS tokens). */
export const NAV_ITEM_DOC: ComponentDoc = {
  "name": "NavItem",
  "title": "NavItem",
  "summary": "One entry of a NavSection: icon, label and optional count.",
  "group": "Navigation",
  "subtitle": null,
  "meta": [
    "a[libNavItem], button[libNavItem]",
    "NavItem",
    "libs/ui/src/components/nav-item/nav-item.ts"
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
          "<code>icon</code>",
          "IconName",
          "—",
          ""
        ],
        [
          "<code>active</code>",
          "boolean",
          "<code>false</code>",
          "Bind from <code>routerLinkActive</code>"
        ],
        [
          "<code>disabled</code>",
          "boolean",
          "<code>false</code>",
          "Not clickable or focusable"
        ],
        [
          "<code>count</code>",
          "number | null",
          "<code>null</code>",
          "Right-aligned"
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
      "html": "<ul><li>default — the label</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<a libNavItem routerLink=\"/projects\" routerLinkActive #rla=\"routerLinkActive\" [active]=\"rla.isActive\" icon=\"folder\" [count]=\"4\">Projects</a>\n<a libNavItem icon=\"card\" disabled>Billing</a>"
    }
  ],
  "tokens": [
    "nav-item-bg",
    "nav-item-color",
    "nav-item-hover-bg",
    "nav-item-active-bg",
    "nav-item-active-color",
    "on-surface",
    "on-surface-muted",
    "nav-item-height",
    "nav-item-radius",
    "nav-item-padding-x",
    "nav-item-gap",
    "text-sm",
    "text-xs",
    "disabled-opacity",
    "shadow-focus"
  ]
};
