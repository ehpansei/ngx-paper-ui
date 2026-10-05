Inline text link for navigation within running text.

**Angular:** `a[libLink]` · `Link` (standalone, OnPush) · source `libs/ui/src/components/link/link.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Content slots:** default — link text

```html
<p>Read the <a libLink routerLink="/docs/setup">setup guide</a> before inviting your team.</p>
```

**Design**
- `primary-text` (follows primary), underline at 40% with a 3px offset, full on hover. Focus `shadow-focus`.
- Navigation inside sentences only; actions are Buttons. Link text says where it goes.

**CSS tokens:** `primary-text`, `shadow-focus`
