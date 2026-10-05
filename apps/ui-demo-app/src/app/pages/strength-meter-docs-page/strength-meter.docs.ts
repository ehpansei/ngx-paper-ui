import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "StrengthMeter" (API + CSS tokens). */
export const STRENGTH_METER_DOC: ComponentDoc = {
  "name": "StrengthMeter",
  "title": "StrengthMeter",
  "summary": "Four-segment strength meter with a text label, for passwords and other secrets.",
  "group": "Forms",
  "subtitle": null,
  "meta": [
    "lib-strength-meter",
    "StrengthMeter",
    "libs/ui/src/components/form/inputs/strength-meter/strength-meter.ts"
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
          "<code>score</code>",
          "0–4",
          "—",
          "Explicit score; wins over <code>password</code>"
        ],
        [
          "<code>password</code>",
          "string | null",
          "—",
          "Scored with <code>scorePassword()</code>"
        ],
        [
          "<code>hint</code>",
          "string",
          "—",
          "Right-aligned, e.g. \"Used on 3 sites\""
        ],
        [
          "<code>hideLabel</code>",
          "boolean",
          "<code>false</code>",
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
      "html": "<p><code>scorePassword()</code> is a UI hint; pass a real estimator's score (e.g. zxcvbn) in production.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-strength-meter [password]=\"model().password\" />\n<lib-strength-meter [score]=\"zxcvbnScore()\" hint=\"Used on 3 sites\" />"
    }
  ],
  "tokens": [
    "danger",
    "warning",
    "primary",
    "success",
    "surface-hover",
    "on-surface",
    "on-surface-muted",
    "radius-full",
    "space-1",
    "text-xs"
  ]
};
