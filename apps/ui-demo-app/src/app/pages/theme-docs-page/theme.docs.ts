import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Theme" (API + CSS tokens). */
export const THEME_DOC: ComponentDoc = {
  "name": "Theme",
  "title": "Theme",
  "summary": "Scopes a primary colour to part of the page — or the whole app — and everything primary-like follows.",
  "group": "Colors",
  "subtitle": "Change primary — every primary-like colour follows",
  "meta": [
    "[libTheme]",
    "ThemeService",
    "Theme",
    "libs/ui/src/theme/theme.ts"
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
          "<code>primary</code>",
          "string",
          "required",
          "Hex, light theme"
        ],
        [
          "<code>primaryDark</code>",
          "string",
          "lightened 45%",
          "Hex, dark theme"
        ],
        [
          "<code>onPrimary</code>",
          "string",
          "auto",
          "Paper white or deep sepia, whichever reaches 4.5:1"
        ],
        [
          "<code>onPrimaryDark</code>",
          "string",
          "auto",
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
      "html": "<p>Configurable: <code>primary</code> and <code>on-primary</code>. Derived in the global CSS and recomputed in every <code>.ui-theme</code> scope: primary-hover, primary-text, primary-soft, nav-item-active-bg, focus-ring, shadow-focus, and the primary component aliases. <code>THEME_PRESETS</code>: Sepia (default), Indigo ink, Sage, Terracotta, Plum, Ochre, Ink.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<section libTheme primary=\"#a84a2c\"><button libButton>Terracotta</button></section>\n\nconst theme = inject(ThemeService);\ntheme.setPrimary('#3f5a7a');   // app-wide; dark variant and on-primary derived\ntheme.setMode('dark');"
    }
  ],
  "tokens": [
    "primary",
    "on-primary",
    "primary-hover",
    "primary-text",
    "primary-soft",
    "nav-item-active-bg",
    "nav-item-active-color",
    "focus-ring",
    "shadow-focus",
    "button-primary-bg",
    "card-bg-selected",
    "card-border-selected"
  ]
};
