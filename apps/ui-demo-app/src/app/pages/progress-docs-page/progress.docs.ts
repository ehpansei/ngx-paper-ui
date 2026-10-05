import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Progress" (API + CSS tokens). */
export const PROGRESS_DOC: ComponentDoc = {
  "name": "Progress",
  "title": "Progress",
  "summary": "Horizontal bar showing how far a task has got.",
  "group": "Feedback",
  "subtitle": null,
  "meta": [
    "lib-progress",
    "Progress",
    "libs/ui/src/components/progress/progress.ts"
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
          "<code>value</code>",
          "number",
          "<code>0</code>",
          "0–100"
        ],
        [
          "<code>label</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>showValue</code>",
          "boolean",
          "<code>false</code>",
          "Shows the %"
        ],
        [
          "<code>tone</code>",
          "'success' | 'danger'",
          "—",
          "Default follows primary"
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
      "code": "<lib-progress label=\"Uploading\" [value]=\"upload.progress()\" showValue />"
    }
  ],
  "tokens": [
    "surface-hover",
    "primary",
    "success",
    "danger",
    "on-surface",
    "on-surface-muted",
    "radius-full",
    "text-xs"
  ]
};
