import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Modal" (API + CSS tokens). */
export const MODAL_DOC: ComponentDoc = {
  "name": "Modal",
  "title": "Modal",
  "summary": "Dialog for focused tasks: forms, settings, short flows. For confirmations use ConfirmDialog.",
  "group": "Feedback",
  "subtitle": null,
  "meta": [
    "lib-modal",
    "DialogService",
    "Modal",
    "libs/ui/src/components/modal/modal.ts"
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
          "<code>title</code>",
          "string",
          "required",
          ""
        ],
        [
          "<code>description</code>",
          "string",
          "—",
          ""
        ],
        [
          "<code>icon</code>",
          "IconName",
          "—",
          ""
        ],
        [
          "<code>iconTone</code>",
          "'neutral' | 'primary' | 'danger'",
          "<code>'neutral'</code>",
          ""
        ],
        [
          "<code>role</code>",
          "'dialog' | 'alertdialog'",
          "<code>'dialog'</code>",
          ""
        ],
        [
          "<code>closable</code>",
          "boolean",
          "<code>true</code>",
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
          "<code>closed</code>",
          "void",
          "× clicked; close the DialogRef"
        ]
      ]
    },
    {
      "kind": "heading",
      "text": "Content slots"
    },
    {
      "kind": "html",
      "html": "<ul><li>default — body</li><li><code>[libModalFooter]</code> — buttons</li></ul>"
    },
    {
      "kind": "html",
      "html": "<p>Opened through the CDK Dialog (focus trap, Escape, scroll block, focus restore). Needs <code>@angular/cdk/overlay-prebuilt.css</code>.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "@Component({ selector: 'app-new-project', imports: [PAPER_UI, FormField], changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `<lib-modal title=\"New project\" (closed)=\"ref.close()\">\n    <lib-text-input label=\"Name\" [formField]=\"f.name\" block />\n    <ng-container libModalFooter>\n      <button libButton variant=\"secondary\" (click)=\"ref.close()\">Cancel</button>\n      <button libButton [disabled]=\"f().invalid()\" (click)=\"ref.close(model().name)\">Create</button>\n    </ng-container></lib-modal>` })\nexport class NewProjectDialog {\n  ref = inject(DialogRef<string>);\n  model = signal({ name: '' });\n  f = form(this.model, p => required(p.name));\n}\n\ninject(DialogService).open<string>(NewProjectDialog).closed.subscribe(name => name && this.create(name));"
    }
  ],
  "tokens": [
    "surface",
    "border",
    "scrim",
    "shadow-lg",
    "radius-xl",
    "surface-hover",
    "on-surface-muted",
    "primary-soft",
    "primary-text",
    "danger-soft",
    "danger-text",
    "space-5",
    "space-6",
    "text-xl"
  ]
};
