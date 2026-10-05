import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Select" (API + CSS tokens). */
export const SELECT_DOC: ComponentDoc = {
  "name": "Select",
  "title": "Select",
  "summary": "Dropdown for picking one option from a short list.",
  "group": "Forms",
  "subtitle": "Signal Forms control",
  "meta": [
    "lib-select",
    "Select<T>",
    "libs/ui/src/components/form/inputs/select/select.ts"
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
          "T | null",
          "<code>null</code>",
          "The selected option's value"
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
          "<code>options</code>",
          "SelectOption&lt;T&gt;[]",
          "required",
          "<code>{ value, label, disabled? }</code>"
        ],
        [
          "<code>label</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>placeholder</code>",
          "string",
          "<code>'Select…'</code>",
          ""
        ],
        [
          "<code>helper</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>block</code>",
          "boolean",
          "<code>false</code>",
          ""
        ],
        [
          "<code>defaultOpen</code>",
          "boolean",
          "<code>false</code>",
          "Open initially (docs, tests)"
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
      "text": "Signal Forms"
    },
    {
      "kind": "html",
      "html": "<p>Signal Forms control — implements <code>FormValueControl&lt;T | null&gt;</code> from <code>@angular/forms/signals</code>. Bind it with the <code>FormField</code> directive: <code>[formField]=\"myForm.field\"</code>; the directive syncs the value and the field state (disabled, readonly, required, errors, touched). Without a form, use two-way binding: <code>[(value)]</code>.</p>"
    },
    {
      "kind": "html",
      "html": "<p>Keyboard: ↑/↓, Home/End, Enter/Space, Escape; outside clicks close it. Inside clipping containers, move the menu into a CDK connected overlay.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "readonly roles: SelectOption[] = [{ value: 'viewer', label: 'Viewer' }, { value: 'editor', label: 'Editor' }];\nreadonly model = signal<{ role: string | null }>({ role: null });\nreadonly f = form(this.model, p => required(p.role, { message: 'Choose a role' }));\n\n<lib-select label=\"Role\" [options]=\"roles\" [formField]=\"f.role\" />"
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
    "surface",
    "border",
    "surface-hover",
    "primary-text",
    "shadow-md",
    "menu-item-height",
    "radius-sm",
    "space-1",
    "space-2"
  ]
};
