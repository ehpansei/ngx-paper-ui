import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Toast" (API + CSS tokens). */
export const TOAST_DOC: ComponentDoc = {
  "name": "Toast",
  "title": "Toast",
  "summary": "Short confirmation after an action, e.g. “Copied” or “Changes saved”.",
  "group": "Feedback",
  "subtitle": null,
  "meta": [
    "lib-toast",
    "lib-toaster",
    "Toast",
    "Toaster",
    "ToastService",
    "libs/ui/src/components/toast/toast.ts"
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
          "<code>icon</code>",
          "IconName",
          "<code>'check'</code>",
          ""
        ],
        [
          "<code>dismissible</code>",
          "boolean",
          "<code>false</code>",
          "Shows ×"
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
          "<code>dismissed</code>",
          "void",
          ""
        ]
      ]
    },
    {
      "kind": "heading",
      "text": "Content slots"
    },
    {
      "kind": "html",
      "html": "<ul><li>default — message</li><li><code>[libToastAction]</code> — e.g. Undo</li></ul>"
    },
    {
      "kind": "html",
      "html": "<p>Auto-dismiss after 2.5s (5s with an action); stacked bottom-centre; <code>role=\"status\"</code>.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<!-- once, in the app root -->\n<lib-toaster />\n\nprivate toast = inject(ToastService);\nthis.toast.show('Copied');\nthis.toast.show('Moved to Trash', { icon: 'trash', actionLabel: 'Undo', action: () => this.restore(id) });"
    }
  ],
  "tokens": [
    "on-surface",
    "surface",
    "shadow-md",
    "radius-lg",
    "space-4",
    "text-sm"
  ]
};
