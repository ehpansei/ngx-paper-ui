import { ComponentDoc } from '../../docs/doc-types';

/** Docs for the config-driven form (lib-form). Keep it a JSON literal: the design-system sync reads it. */
export const FORM_DOC: ComponentDoc = {
  "name": "Form",
  "title": "Form",
  "summary": "A whole Signal Forms form from a config array: inputs and selects with labels, helpers, initial values and validation rules.",
  "group": "Forms",
  "subtitle": "Config-driven form with validation",
  "meta": [
    "lib-form",
    "Form",
    "libs/ui/src/components/form/form.ts"
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
          "<code>formConfig</code>",
          "FormConfig",
          "required",
          "One entry per field, rendered in order. A new array resets the values"
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
          "<code>submitted</code>",
          "FormModel",
          "The values, on a valid submit only"
        ],
        [
          "<code>invalidSubmit</code>",
          "void",
          "A submit was blocked; every field is now touched, so all errors show"
        ]
      ]
    },
    {
      "kind": "heading",
      "text": "Content slots"
    },
    {
      "kind": "html",
      "html": "<ul><li>default — rendered after the fields: the submit button and any secondary actions</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Field config"
    },
    {
      "kind": "table",
      "head": [
        "Key",
        "Type",
        "Default",
        "Notes"
      ],
      "rows": [
        [
          "<code>key</code>",
          "string",
          "required",
          "The property in the submitted value; unique per form"
        ],
        [
          "<code>label</code>",
          "string",
          "required",
          "Shown above the control and used in default messages"
        ],
        [
          "<code>controlType</code>",
          "'input' | 'select'",
          "required",
          "TextInput or Select"
        ],
        [
          "<code>type</code>",
          "'text' | 'email' | 'search' | 'url' | 'tel'",
          "<code>'text'</code>",
          "Inputs only"
        ],
        [
          "<code>options</code>",
          "SelectOption[]",
          "required for selects",
          "<code>{ value, label, disabled? }</code>"
        ],
        [
          "<code>placeholder</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>helper</code>",
          "string",
          "—",
          "Shown under the control until an error replaces it"
        ],
        [
          "<code>value</code>",
          "string | number | null",
          "<code>''</code> / <code>null</code>",
          "Initial value (inputs / selects)"
        ],
        [
          "<code>disabled</code>",
          "boolean",
          "<code>false</code>",
          "Shown dimmed; still part of the submitted value"
        ],
        [
          "<code>required</code>",
          "boolean | string",
          "—",
          "A string is the message; default “&lt;label&gt; is required”"
        ],
        [
          "<code>email</code>",
          "boolean | string",
          "—",
          "Inputs only; default “Enter a valid email address”"
        ],
        [
          "<code>minLength</code>",
          "number | { value, message }",
          "—",
          "Default “Use at least N characters”"
        ],
        [
          "<code>maxLength</code>",
          "number | { value, message }",
          "—",
          "Default “Use at most N characters”"
        ],
        [
          "<code>pattern</code>",
          "string | { value, message }",
          "—",
          "A RegExp source string, so configs stay JSON"
        ]
      ]
    },
    {
      "kind": "heading",
      "text": "How it works"
    },
    {
      "kind": "html",
      "html": "<ul><li>The model is built from the config: <code>''</code> for inputs, <code>null</code> for selects, or the field's <code>value</code>.</li><li>Rules become Signal Forms validators (<code>required</code>, <code>email</code>, <code>minLength</code>, <code>maxLength</code>, <code>pattern</code>); errors show once a field is touched.</li><li>Submitting touches every field; <code>submitted</code> fires only when the form is valid, <code>invalidSubmit</code> otherwise.</li><li>Rules are read once, on init. Passing a new <code>formConfig</code> array resets the values.</li><li>Need custom layout or cross-field rules? Build the form by hand with <code>form()</code> and <code>[formField]</code> on the individual controls.</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "readonly fields: FormConfig = [\n  { controlType: 'input', key: 'email', label: 'Email', type: 'email', required: true, email: true },\n  { controlType: 'select', key: 'role', label: 'Role', required: 'Choose a role',\n    options: [{ value: 'viewer', label: 'Viewer' }, { value: 'editor', label: 'Editor' }] },\n];\n\n<lib-form [formConfig]=\"fields\" (submitted)=\"save($event)\">\n  <button libButton type=\"submit\">Save</button>\n</lib-form>"
    }
  ],
  "tokens": [
    "input-bg",
    "input-border",
    "input-border-hover",
    "input-height",
    "border",
    "danger",
    "danger-text",
    "on-surface-muted",
    "space-4",
    "radius-md",
    "disabled-opacity"
  ]
};
