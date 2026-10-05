import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "IconSizes" (API + CSS tokens). */
export const ICON_SIZES_DOC: ComponentDoc = {
  "name": "IconSizes",
  "title": "IconSizes",
  "summary": "The three icon sizes and where each one goes.",
  "group": "Foundations",
  "subtitle": "sm 16 · md 18 · lg 20",
  "meta": [
    "lib-icon [size]",
    "Icon",
    "ICON_SIZES",
    "libs/ui/src/components/icon/icons.ts"
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
          "<code>size</code>",
          "'sm' | 'md' | 'lg'",
          "<code>'md'</code>",
          "sm 16 · md 18 · lg 20"
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
      "kind": "html",
      "html": "<p>Components pick their own icon size; you only choose one for standalone icons.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-icon name=\"plus\" size=\"sm\" />\n<lib-icon name=\"plus\" />\n<lib-icon name=\"plus\" size=\"lg\" />"
    }
  ],
  "tokens": [
    "icon-size-sm",
    "icon-size-md",
    "icon-size-lg",
    "icon-size"
  ]
};
