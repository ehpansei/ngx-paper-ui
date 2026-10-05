import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Logo" (API + CSS tokens). */
export const LOGO_DOC: ComponentDoc = {
  "name": "Logo",
  "title": "Logo",
  "summary": "Product logo block for the top of the Sidebar: a primary tile and the product name.",
  "group": "Foundations",
  "subtitle": null,
  "meta": [
    "lib-logo",
    "Logo",
    "libs/ui/src/components/logo/logo.ts"
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
          "<code>'Paper UI'</code>",
          ""
        ],
        [
          "<code>icon</code>",
          "IconName",
          "—",
          "Drawn in the tile instead of the initial"
        ],
        [
          "<code>markOnly</code>",
          "boolean",
          "<code>false</code>",
          "Tile only"
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
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-logo libSidebarLogo name=\"Acme\" />"
    }
  ],
  "tokens": [
    "primary",
    "on-primary",
    "on-surface",
    "radius-md",
    "text-lg",
    "space-1"
  ]
};
