import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "InfoCard" (API + CSS tokens). */
export const INFO_CARD_DOC: ComponentDoc = {
  "name": "InfoCard",
  "title": "InfoCard",
  "summary": "Selectable card row for a list of records — accounts, files, projects, people — with an icon, two lines of text and status badges.",
  "group": "Data display",
  "subtitle": null,
  "meta": [
    "button[libInfoCard], a[libInfoCard]",
    "InfoCard",
    "libs/ui/src/components/info-card/info-card.ts"
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
          "Second line"
        ],
        [
          "<code>icon</code>",
          "IconName",
          "—",
          "Else the title's initial"
        ],
        [
          "<code>badges</code>",
          "BadgeSpec[]",
          "<code>[]</code>",
          "<code>{ tone, label }</code>"
        ],
        [
          "<code>selected</code>",
          "boolean",
          "<code>false</code>",
          "<code>aria-pressed</code>"
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
      "html": "<ul><li><code>[libLeading]</code> — replaces the icon tile</li><li><code>[libTrailing]</code> — after the badges</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<div class=\"ui-list\">\n  @for (item of items(); track item.id) {\n    <button libInfoCard [title]=\"item.name\" [description]=\"item.account\" [badges]=\"item.badges\"\n            [selected]=\"item.id === selectedId()\" (click)=\"selectedId.set(item.id)\"></button>\n  }\n</div>"
    }
  ],
  "tokens": [
    "card-bg",
    "card-border",
    "card-bg-hover",
    "card-border-hover",
    "card-bg-selected",
    "card-border-selected",
    "surface-hover",
    "on-surface",
    "on-surface-muted",
    "card-height",
    "item-icon-size",
    "radius-lg",
    "radius-md",
    "space-4",
    "space-6",
    "space-2"
  ]
};
