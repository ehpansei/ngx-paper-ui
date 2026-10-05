Selectable card row for a list of records — accounts, files, projects, people — with an icon, two lines of text and status badges.

**Angular:** `button[libInfoCard], a[libInfoCard]` · `InfoCard` (standalone, OnPush) · source `libs/ui/src/components/info-card/info-card.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | required |  |
| `description` | `string` | — | Second line |
| `icon` | `IconName` | — | Else the title's initial |
| `badges` | `BadgeSpec[]` | `[]` | `{ tone, label }` |
| `selected` | `boolean` | `false` | `aria-pressed` |

**Content slots:** `[libLeading]` — replaces the icon tile · `[libTrailing]` — after the badges

```html
<div class="ui-list">
  @for (item of items(); track item.id) {
    <button libInfoCard [title]="item.name" [description]="item.account" [badges]="item.badges"
            [selected]="item.id === selectedId()" (click)="selectedId.set(item.id)"></button>
  }
</div>
```

**Design**
- `card-bg` + `card-border`, `radius-lg`, `card-height` 64. Hover `card-bg-hover`/`card-border-hover`. Selected `card-bg-selected`/`card-border-selected` (follow primary).
- Leading tile `item-icon-size` 36 on `surface-hover`.

**CSS tokens:** `card-bg`, `card-border`, `card-bg-hover`, `card-border-hover`, `card-bg-selected`, `card-border-selected`, `surface-hover`, `on-surface`, `on-surface-muted`, `card-height`, `item-icon-size`, `radius-lg`, `radius-md`, `space-4`, `space-6`, `space-2`
