import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Avatar" (API + CSS tokens). */
export const AVATAR_DOC: ComponentDoc = {
  "name": "Avatar",
  "title": "Avatar",
  "summary": "Round initials avatar for people.",
  "group": "Data display",
  "subtitle": null,
  "meta": [
    "lib-avatar",
    "Avatar",
    "libs/ui/src/components/avatar/avatar.ts"
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
          "Initials derive from it"
        ],
        [
          "<code>size</code>",
          "number",
          "<code>32</code>",
          "px"
        ],
        [
          "<code>tone</code>",
          "'primary' | 'alt'",
          "<code>'primary'</code>",
          ""
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
      "html": "<p>Decorative (<code>aria-hidden</code>): always show the name next to it.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-avatar name=\"Ana Silva\" tone=\"alt\" [size]=\"40\" />"
    }
  ],
  "tokens": [
    "primary",
    "avatar-alt",
    "on-primary",
    "avatar-size",
    "radius-full"
  ]
};
