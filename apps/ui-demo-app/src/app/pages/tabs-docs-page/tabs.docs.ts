import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Tabs" (API + CSS tokens). */
export const TABS_DOC: ComponentDoc = {
  "name": "Tabs",
  "title": "Tabs",
  "summary": "Switches between views of the same object without leaving the page.",
  "group": "Navigation",
  "subtitle": null,
  "meta": [
    "lib-tabs",
    "Tabs",
    "libs/ui/src/components/tabs/tabs.ts"
  ],
  "blocks": [
    {
      "kind": "heading",
      "text": "Models (two-way)"
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
          "string",
          "first item",
          "Two-way: <code>[(value)]</code>"
        ]
      ]
    },
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
          "<code>items</code>",
          "TabItem[]",
          "required",
          "<code>{ value, label, icon?, count? }</code>"
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
      "html": "<p>← / → move between tabs.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "readonly tab = signal('overview');\n\n<lib-tabs [items]=\"tabs\" [(value)]=\"tab\" />\n@switch (tab()) { @case ('overview') { <app-overview /> } @case ('activity') { <app-activity /> } }"
    }
  ],
  "tokens": [
    "border",
    "on-surface-muted",
    "on-surface",
    "surface-hover",
    "primary-text",
    "primary",
    "radius-sm",
    "space-3",
    "text-sm",
    "shadow-focus"
  ]
};
