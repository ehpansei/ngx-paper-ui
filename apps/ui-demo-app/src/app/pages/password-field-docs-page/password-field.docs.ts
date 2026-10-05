import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "PasswordField" (API + CSS tokens). */
export const PASSWORD_FIELD_DOC: ComponentDoc = {
  "name": "PasswordField",
  "title": "PasswordField",
  "summary": "Masked secret field with reveal and copy controls.",
  "group": "Forms",
  "subtitle": "Signal Forms control",
  "meta": [
    "lib-password-field",
    "PasswordField",
    "libs/ui/src/components/form/inputs/password-field/password-field.ts"
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
          "The secret"
        ],
        [
          "<code>revealed</code>",
          "boolean",
          "<code>false</code>",
          "Two-way: <code>[(revealed)]</code>"
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
          "string | null",
          "<code>'Password'</code>",
          "Also names the buttons"
        ],
        [
          "<code>copyable</code>",
          "boolean",
          "<code>true</code>",
          "Show the copy button"
        ],
        [
          "<code>autocomplete</code>",
          "'current-password' | 'new-password' | 'off'",
          "<code>'off'</code>",
          ""
        ],
        [
          "<code>block</code>",
          "boolean",
          "<code>false</code>",
          ""
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
      "kind": "table",
      "head": [
        "Name",
        "Payload",
        "Notes"
      ],
      "rows": [
        [
          "<code>copied</code>",
          "void",
          "After the value was copied (CDK Clipboard); show a Toast"
        ]
      ]
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
      "code": "readonly model = signal({ password: '' });\nreadonly f = form(this.model, p => minLength(p.password, 8, { message: 'Use at least 8 characters' }));\n\n<lib-password-field [formField]=\"f.password\" autocomplete=\"new-password\" [copyable]=\"false\" />\n<lib-strength-meter [password]=\"model().password\" />"
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
    "disabled-opacity",
    "surface-hover"
  ]
};
