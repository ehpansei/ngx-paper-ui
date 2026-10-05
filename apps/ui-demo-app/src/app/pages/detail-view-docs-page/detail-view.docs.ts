import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "DetailView" (API + CSS tokens). */
export const DETAIL_VIEW_DOC: ComponentDoc = {
  "name": "DetailView",
  "title": "DetailView",
  "summary": "Detail panel for one record: header, status badges, copyable read-only fields, an optional masked password with strength, and a footer.",
  "group": "Data display",
  "subtitle": null,
  "meta": [
    "lib-detail-view",
    "DetailView",
    "libs/ui/src/components/detail-view/detail-view.ts"
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
          "<code>subtitle</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>href</code>",
          "string",
          "—",
          "Shown as a link"
        ],
        [
          "<code>icon</code>",
          "IconName",
          "—",
          ""
        ],
        [
          "<code>badges</code>",
          "BadgeSpec[]",
          "<code>[]</code>",
          ""
        ],
        [
          "<code>fields</code>",
          "DetailField[]",
          "<code>[]</code>",
          "<code>{ label, value, copyable? }</code>"
        ],
        [
          "<code>password</code>",
          "string | null",
          "<code>null</code>",
          "Adds PasswordField + StrengthMeter"
        ],
        [
          "<code>passwordLabel</code>",
          "string",
          "<code>'Password'</code>",
          ""
        ],
        [
          "<code>strength</code>",
          "0–4",
          "—",
          ""
        ],
        [
          "<code>strengthHint</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>showStrength</code>",
          "boolean",
          "<code>true</code>",
          ""
        ],
        [
          "<code>meta</code>",
          "string",
          "—",
          "Footer text"
        ],
        [
          "<code>editable</code>",
          "boolean",
          "<code>false</code>",
          "Shows Edit"
        ],
        [
          "<code>deletable</code>",
          "boolean",
          "<code>false</code>",
          "Shows Delete"
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
          "<code>copied</code>",
          "string",
          "Label of the copied field"
        ],
        [
          "<code>edit</code>",
          "void",
          ""
        ],
        [
          "<code>delete</code>",
          "void",
          "Ask with <code>ConfirmService</code> first"
        ]
      ]
    },
    {
      "kind": "heading",
      "text": "Content slots"
    },
    {
      "kind": "html",
      "html": "<ul><li><code>[libLeading]</code> — replaces the icon tile</li><li>default — extra content under the fields</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-detail-view [title]=\"item().name\" [href]=\"item().url\" [fields]=\"[{ label: 'Username', value: item().username }]\"\n  [password]=\"item().password\" editable deletable (delete)=\"remove()\" (copied)=\"toast.show($event + ' copied')\" />"
    }
  ],
  "tokens": [
    "surface",
    "border",
    "primary-text",
    "on-surface-muted",
    "radius-lg",
    "space-6",
    "space-4",
    "text-xl",
    "text-xs"
  ]
};
