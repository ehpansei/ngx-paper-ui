import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Button" (API + CSS tokens). */
export const BUTTON_DOC: ComponentDoc = {
  "name": "Button",
  "title": "Button",
  "summary": "Buttons trigger actions; one primary per view, the rest secondary or ghost.",
  "group": "Actions",
  "subtitle": "Primary · Secondary · Danger · Ghost",
  "meta": [
    "button[libButton], a[libButton]",
    "Button",
    "libs/ui/src/components/button/button.ts"
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
          "<code>variant</code>",
          "'primary' | 'secondary' | 'danger' | 'ghost'",
          "<code>'primary'</code>",
          ""
        ],
        [
          "<code>size</code>",
          "'sm' | 'md' | 'lg'",
          "<code>'md'</code>",
          "32 / 40 / 48px"
        ],
        [
          "<code>icon</code>",
          "IconName",
          "—",
          "Leading icon, sized to the button"
        ],
        [
          "<code>iconRight</code>",
          "IconName",
          "—",
          "Trailing icon"
        ],
        [
          "<code>iconOnly</code>",
          "boolean",
          "<code>false</code>",
          "Square button; requires <code>label</code>"
        ],
        [
          "<code>label</code>",
          "string",
          "—",
          "<code>aria-label</code> for icon-only buttons"
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
      "html": "<ul><li>default — the label</li></ul>"
    },
    {
      "kind": "html",
      "html": "<p>An attribute component on a native <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code>, so <code>type</code>, <code>disabled</code>, <code>(click)</code>, form submit and <code>routerLink</code> stay native.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<button libButton icon=\"plus\" (click)=\"create()\">Create</button>\n<button libButton variant=\"secondary\" type=\"button\">Cancel</button>\n<button libButton variant=\"danger\" icon=\"trash\" [disabled]=\"busy()\">Delete</button>\n<a libButton variant=\"ghost\" routerLink=\"/settings\" icon=\"settings\">Settings</a>\n<button libButton variant=\"ghost\" size=\"sm\" icon=\"more\" iconOnly label=\"More actions\"></button>"
    }
  ],
  "tokens": [
    "button-primary-bg",
    "button-primary-bg-hover",
    "button-primary-color",
    "button-secondary-bg",
    "button-secondary-bg-hover",
    "button-secondary-color",
    "button-secondary-border",
    "danger",
    "danger-hover",
    "on-danger",
    "surface-hover",
    "on-surface",
    "shadow-sm",
    "shadow-md",
    "shadow-focus",
    "button-primary-height",
    "button-height-sm",
    "button-height-lg",
    "button-primary-padding",
    "button-primary-gap",
    "button-primary-radius",
    "space-3",
    "space-6",
    "text-sm",
    "disabled-opacity"
  ]
};
