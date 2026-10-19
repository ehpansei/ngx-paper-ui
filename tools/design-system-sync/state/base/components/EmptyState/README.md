Centred message for an empty page, list or search.

**Angular:** `lib-empty-state` · `EmptyState` (standalone, OnPush) · source `libs/ui/src/components/empty-state/empty-state.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | required |  |
| `description` | `string` | — |  |
| `icon` | `IconName` | `'inbox'` |  |

**Content slots:** default — usually one Button

```html
@if (projects().length === 0) {
  <lib-empty-state icon="folder" title="No projects yet" description="Projects group your files and tasks.">
    <button libButton icon="plus" (click)="create()">New project</button>
  </lib-empty-state>
}
```

**Design**
- 48px `surface-hover` icon tile; title 16 Semi Bold; description `body` muted, max 320px.
- One next step: first use → primary; no results → secondary.

**CSS tokens:** `surface-hover`, `on-surface`, `on-surface-muted`, `radius-lg`, `space-8`, `text-base`, `text-sm`
