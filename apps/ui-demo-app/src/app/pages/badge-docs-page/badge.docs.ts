import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Badge" (API + CSS tokens). */
export const BADGE_DOC: ComponentDoc = {
  "name": "Badge",
  "title": "Badge",
  "summary": "Small status label: one or two words beside a title.",
  "group": "Data display",
  "subtitle": null,
  "meta": [
    "lib-badge",
    "Badge",
    "libs/ui/src/components/badge/badge.ts"
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
          "<code>tone</code>",
          "'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger'",
          "<code>'neutral'</code>",
          "<code>info</code> = <code>primary</code>"
        ],
        [
          "<code>icon</code>",
          "IconName | null",
          "per tone",
          "<code>null</code> hides it"
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
      "html": "<ul><li>default — the text</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-badge tone=\"success\">Active</lib-badge>\n<lib-badge [icon]=\"null\">{{ count() }}</lib-badge>"
    }
  ],
  "tokens": [
    "surface-hover",
    "on-surface-muted",
    "primary-soft",
    "primary-text",
    "success-soft",
    "success-text",
    "warning-soft",
    "warning-text",
    "danger-soft",
    "danger-text",
    "radius-sm",
    "text-xs",
    "space-2"
  ]
};
