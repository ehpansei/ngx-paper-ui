import { ComponentDoc } from '../../docs/doc-types';

/** Ported from the Paper UI design system card "Link" (API + CSS tokens). */
export const LINK_DOC: ComponentDoc = {
  "name": "Link",
  "title": "Link",
  "summary": "Inline text link for navigation within running text.",
  "group": "Actions",
  "subtitle": null,
  "meta": [
    "a[libLink]",
    "Link",
    "libs/ui/src/components/link/link.ts"
  ],
  "blocks": [
    {
      "kind": "heading",
      "text": "Inputs"
    },
    {
      "kind": "empty",
      "text": "None."
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
      "html": "<ul><li>default — link text</li></ul>"
    },
    {
      "kind": "heading",
      "text": "Usage"
    },
    {
      "kind": "code",
      "code": "<p>Read the <a libLink routerLink=\"/docs/setup\">setup guide</a> before inviting your team.</p>"
    }
  ],
  "tokens": [
    "primary-text",
    "shadow-focus"
  ]
};
