import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Checkbox" (API + CSS tokens). */
export const CHECKBOX_DOC: ComponentDoc = {
  "name": "Checkbox",
  "title": "Checkbox",
  "summary": "Checkbox for independent on/off choices in forms and lists.",
  "group": "Forms",
  "subtitle": "Signal Forms checkbox control",
  "meta": [
    "lib-checkbox",
    "Checkbox",
    "libs/ui/src/components/form/inputs/checkbox/checkbox.ts"
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
          "<code>checked</code>",
          "boolean",
          "<code>false</code>",
          "Bound by <code>[formField]</code> or <code>[(checked)]</code>"
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
          "<code>indeterminate</code>",
          "boolean",
          "<code>false</code>",
          "Mixed state, e.g. “select all”"
        ],
        [
          "<code>disabled</code>",
          "boolean",
          "<code>false</code>",
          "From the field (<code>disabled()</code> rule) or set directly"
        ],
        [
          "<code>readonly</code>",
          "boolean",
          "<code>false</code>",
          "From the field (<code>readonly()</code> rule)"
        ],
        [
          "<code>required</code>",
          "boolean",
          "<code>false</code>",
          "From the field (<code>required()</code> rule); adds <code>aria-required</code>"
        ],
        [
          "<code>invalid</code>",
          "boolean",
          "<code>false</code>",
          "From the field"
        ],
        [
          "<code>touched</code>",
          "boolean",
          "<code>false</code>",
          "Two-way with the field (model); set on blur. Errors show once touched"
        ],
        [
          "<code>name</code>",
          "string",
          "<code>''</code>",
          "From the field"
        ],
        [
          "<code>errors</code>",
          "ValidationError[]",
          "<code>[]</code>",
          "From the field; the first error's <code>message</code> is shown"
        ],
        [
          "<code>error</code>",
          "string | null",
          "<code>null</code>",
          "Manual message, for use without a form"
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
      "kind": "heading",
      "text": "Signal Forms"
    },
    {
      "kind": "html",
      "html": "<p>Signal Forms control — implements <code>FormCheckboxControl</code> from <code>@angular/forms/signals</code>. Bind it with the <code>FormField</code> directive: <code>[formField]=\"myForm.field\"</code>; the directive syncs the checked state and the field state (disabled, readonly, required, errors, touched). Without a form, use two-way binding: <code>[(checked)]</code>.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "readonly model = signal({ notify: true });\nreadonly f = form(this.model);\n\n<lib-checkbox [formField]=\"f.notify\">Notify members</lib-checkbox>"
    }
  ],
  "tokens": [
    "border-hover",
    "surface",
    "primary",
    "primary-hover",
    "on-primary",
    "on-surface",
    "on-surface-muted",
    "shadow-focus",
    "disabled-opacity",
    "space-2"
  ]
};
