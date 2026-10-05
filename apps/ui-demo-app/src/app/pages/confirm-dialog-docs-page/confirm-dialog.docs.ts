import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "ConfirmDialog" (API + CSS tokens). */
export const CONFIRM_DIALOG_DOC: ComponentDoc = {
  "name": "ConfirmDialog",
  "title": "ConfirmDialog",
  "summary": "A short dialog that asks the user to confirm an action before it happens.",
  "group": "Feedback",
  "subtitle": null,
  "meta": [
    "lib-confirm-dialog",
    "ConfirmService",
    "ConfirmDialog",
    "libs/ui/src/components/confirm-dialog/confirm-dialog.ts"
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
          "<code>'Delete this item?'</code>",
          "Name the thing"
        ],
        [
          "<code>description</code>",
          "string",
          "—",
          "The consequence"
        ],
        [
          "<code>confirmLabel</code>",
          "string",
          "<code>'Delete'</code>",
          ""
        ],
        [
          "<code>cancelLabel</code>",
          "string",
          "<code>'Cancel'</code>",
          ""
        ],
        [
          "<code>tone</code>",
          "'danger' | 'neutral'",
          "<code>'danger'</code>",
          ""
        ],
        [
          "<code>icon</code>",
          "IconName | null",
          "<code>'trash'</code>",
          ""
        ]
      ]
    },
    {
      "kind": "heading",
      "text": "Outputs"
    },
    {
      "kind": "table",
      "head": [
        "Name",
        "Payload",
        "Notes"
      ],
      "rows": [
        [
          "<code>confirm</code>",
          "void",
          ""
        ],
        [
          "<code>cancel</code>",
          "void",
          "Also × and Escape"
        ]
      ]
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "private confirm = inject(ConfirmService);\n\nasync remove(item: Item) {\n  if (await this.confirm.ask({ title: `Delete “${item.name}”?`, description: 'It moves to Trash…' })) this.items.delete(item.id);\n}"
    }
  ],
  "tokens": [
    "danger",
    "on-danger",
    "danger-soft",
    "danger-text",
    "surface-hover",
    "on-surface-muted",
    "button-primary-bg",
    "surface",
    "scrim",
    "shadow-lg",
    "radius-xl"
  ]
};
