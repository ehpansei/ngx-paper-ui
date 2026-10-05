import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "EmptyState" (API + CSS tokens). */
export const EMPTY_STATE_DOC: ComponentDoc = {
  "name": "EmptyState",
  "title": "EmptyState",
  "summary": "Centred message for an empty page, list or search.",
  "group": "Feedback",
  "subtitle": null,
  "meta": [
    "lib-empty-state",
    "EmptyState",
    "libs/ui/src/components/empty-state/empty-state.ts"
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
          "required",
          ""
        ],
        [
          "<code>description</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>icon</code>",
          "IconName",
          "<code>'inbox'</code>",
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
      "kind": "heading",
      "text": "Content slots"
    },
    {
      "kind": "html",
      "html": "<ul><li>default — usually one Button</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "@if (projects().length === 0) {\n  <lib-empty-state icon=\"folder\" title=\"No projects yet\" description=\"Projects group your files and tasks.\">\n    <button libButton icon=\"plus\" (click)=\"create()\">New project</button>\n  </lib-empty-state>\n}"
    }
  ],
  "tokens": [
    "surface-hover",
    "on-surface",
    "on-surface-muted",
    "radius-lg",
    "space-8",
    "text-base",
    "text-sm"
  ]
};
