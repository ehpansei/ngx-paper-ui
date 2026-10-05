import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Icon" (API + CSS tokens). */
export const ICON_DOC: ComponentDoc = {
  "name": "Icon",
  "title": "Icon",
  "summary": "Stroke icon set: 24px grid, 1.75px stroke, drawn in <code>currentColor</code>.",
  "group": "Foundations",
  "subtitle": "Stroke icons in currentColor",
  "meta": [
    "lib-icon",
    "Icon",
    "libs/ui/src/components/icon/icon.ts"
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
          "<code>name</code>",
          "IconName",
          "required",
          "One of <code>ICON_NAMES</code> (generated from <code>src/assets/icons/*.svg</code>)"
        ],
        [
          "<code>size</code>",
          "'sm' | 'md' | 'lg' | number",
          "<code>'md'</code>",
          "16 / 18 / 20px"
        ],
        [
          "<code>strokeWidth</code>",
          "number",
          "<code>1.75</code>",
          "Keep the default"
        ],
        [
          "<code>title</code>",
          "string",
          "—",
          "Accessible name when the icon stands alone"
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
      "html": "<p>Icons are drawn from the sprite <code>assets/ui/icons.svg</code> with <code>&lt;use&gt;</code>, built from <code>libs/ui/src/assets/icons/*.svg</code> by <code>nx run ui:icons</code>. To add an icon, add <code>&lt;name&gt;.svg</code> there (24px grid, 1.75 stroke, <code>currentColor</code>); <code>IconName</code> is generated. Apps copy the sprite into <code>assets/ui/</code>, or point <code>provideIconSprite(url)</code> at it (same origin).</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<lib-icon name=\"search\" size=\"sm\" />\n<span style=\"color: var(--danger-text)\"><lib-icon name=\"alert\" title=\"Error\" /></span>"
    }
  ],
  "tokens": [
    "on-surface",
    "on-surface-muted",
    "icon-size",
    "icon-size-sm",
    "icon-size-md",
    "icon-size-lg"
  ]
};
