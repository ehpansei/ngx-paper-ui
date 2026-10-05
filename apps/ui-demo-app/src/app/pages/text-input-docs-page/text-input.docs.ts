import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "TextInput" (API + CSS tokens). */
export const TEXT_INPUT_DOC: ComponentDoc = {
  "name": "TextInput",
  "title": "TextInput",
  "summary": "Single-line text field with label, helper and error text.",
  "group": "Forms",
  "subtitle": "Signal Forms control",
  "meta": [
    "lib-text-input",
    "TextInput",
    "libs/ui/src/components/form/inputs/text-input/text-input.ts"
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
          "<code>''</code>",
          "The text; bound by <code>[formField]</code> or <code>[(value)]</code>"
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
          "<code>label</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>placeholder</code>",
          "string",
          "<code>''</code>",
          ""
        ],
        [
          "<code>helper</code>",
          "string",
          "—",
          "Hint under the field"
        ],
        [
          "<code>leadingIcon</code>",
          "IconName",
          "—",
          "e.g. <code>search</code>"
        ],
        [
          "<code>type</code>",
          "'text' | 'email' | 'search' | 'url' | 'tel'",
          "<code>'text'</code>",
          ""
        ],
        [
          "<code>autocomplete</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>block</code>",
          "boolean",
          "<code>false</code>",
          "Full width instead of <code>input-width</code> 220"
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
      "html": "<ul><li><code>[libTrailing]</code> — an action inside the box, e.g. <code>&lt;button libTrailing class=\"ui-field-btn\"&gt;</code></li></ul>"
    },
    {
      "kind": "heading",
      "text": "Signal Forms"
    },
    {
      "kind": "html",
      "html": "<p>Signal Forms control — implements <code>FormValueControl&lt;string&gt;</code> from <code>@angular/forms/signals</code>. Bind it with the <code>FormField</code> directive: <code>[formField]=\"myForm.field\"</code>; the directive syncs the value and the field state (disabled, readonly, required, errors, touched). Without a form, use two-way binding: <code>[(value)]</code>.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "readonly model = signal({ name: '' });\nreadonly f = form(this.model, p => {\n  required(p.name, { message: 'Name is required' });\n  minLength(p.name, 3, { message: 'Must be at least 3 characters' });\n});\n\n<lib-text-input label=\"Name\" [formField]=\"f.name\" helper=\"Shown to your team\" />"
    }
  ],
  "tokens": [
    "input-bg",
    "input-border",
    "input-border-hover",
    "on-surface",
    "on-surface-muted",
    "danger",
    "danger-text",
    "shadow-focus",
    "input-height",
    "input-width",
    "radius-md",
    "space-3",
    "text-sm",
    "text-xs-plus",
    "text-xs",
    "disabled-opacity"
  ]
};
