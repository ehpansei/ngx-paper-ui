import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "MainView" (API + CSS tokens). */
export const MAIN_VIEW_DOC: ComponentDoc = {
  "name": "MainView",
  "title": "MainView",
  "summary": "Responsive app layout, mobile first: a header with menu, brand and avatar on mobile; sidebar · main · detail columns from md up.",
  "group": "Layout",
  "subtitle": "Mobile first: header + drawer + full-view detail → columns at md / lg",
  "meta": [
    "lib-main-view",
    "MainView",
    "libs/ui/src/layouts/main-view/main-view.ts"
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
          "<code>detailOpen</code>",
          "boolean",
          "<code>false</code>",
          "Shows the detail: a column on md+, the whole view on mobile"
        ],
        [
          "<code>sidebarOpen</code>",
          "boolean",
          "<code>false</code>",
          "Mobile drawer state; the ☰ button toggles it"
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
          "<code>title</code>",
          "string",
          "—",
          "Page title"
        ],
        [
          "<code>brandName</code>",
          "string",
          "<code>'Paper UI'</code>",
          "Mobile header logo (unless <code>[libMainBrand]</code> is projected)"
        ],
        [
          "<code>userName</code>",
          "string",
          "—",
          "Mobile header avatar (unless <code>[libMainUser]</code> is projected)"
        ],
        [
          "<code>backLabel</code>",
          "string",
          "<code>'Back'</code>",
          "Mobile detail back button"
        ],
        [
          "<code>detailLabel</code>",
          "string",
          "<code>'Details'</code>",
          "Detail region <code>aria-label</code>"
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
      "html": "<ul><li><code>[libMainSidebar]</code> — a <code>lib-sidebar</code> (column on md+, drawer on mobile)</li><li><code>[libMainActions]</code> — header buttons next to the title</li><li>default — main content (e.g. <code>&lt;router-outlet /&gt;</code>)</li><li><code>[libMainDetail]</code> — e.g. <code>lib-detail-view</code></li><li><code>[libMainBrand]</code> / <code>[libMainUser]</code> — replace the mobile header logo / avatar</li></ul>"
    },
    {
      "kind": "html",
      "html": "<p>Mobile first, with container queries on the component's own width (breakpoint tokens <code>bp-md</code> 768px, <code>bp-lg</code> 1024px), so it adapts to whatever holds it — give it <code>height: 100dvh</code> at the app root. Escape closes the drawer, then the detail; choosing a nav item closes the drawer.</p>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "readonly detailOpen = signal(false);\nreadonly selected = signal<Project | null>(null);\nopen(p: Project) { this.selected.set(p); this.detailOpen.set(true); }\n\n<lib-main-view title=\"Projects\" brandName=\"Acme\" [userName]=\"user().name\" [(detailOpen)]=\"detailOpen\">\n  <lib-sidebar libMainSidebar>…</lib-sidebar>\n  <button libButton libMainActions icon=\"plus\">New project</button>\n  @for (p of projects(); track p.id) { <button libInfoCard [title]=\"p.name\" (click)=\"open(p)\"></button> }\n  @if (selected(); as s) { <lib-detail-view libMainDetail [title]=\"s.name\" … /> }\n</lib-main-view>"
    }
  ],
  "tokens": [
    "bp-md",
    "bp-lg",
    "header-height",
    "sidebar-width",
    "sidebar-width-md",
    "detail-width",
    "detail-width-md",
    "sidebar-bg",
    "sidebar-border",
    "surface",
    "surface-raised",
    "border",
    "scrim",
    "shadow-lg",
    "radius-lg",
    "space-4",
    "space-5",
    "space-6",
    "space-8",
    "text-xl",
    "text-2xl"
  ]
};
