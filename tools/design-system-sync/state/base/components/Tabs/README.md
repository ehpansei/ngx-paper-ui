Switches between views of the same object without leaving the page.

**Angular:** `lib-tabs` · `Tabs` (standalone, OnPush) · source `libs/ui/src/components/tabs/tabs.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Models (two-way)**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `string` | first item | Two-way: `[(value)]` |

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `TabItem[]` | required | `{ value, label, icon?, count? }` |

← / → move between tabs.

```ts
readonly tab = signal('overview');

<lib-tabs [items]="tabs" [(value)]="tab" />
@switch (tab()) { @case ('overview') { <app-overview /> } @case ('activity') { <app-activity /> } }
```

**Design**
- 40px tabs on a 1px `border` baseline. Rest `on-surface-muted`; hover `surface-hover`; active `primary-text` Semi Bold with a 2px `primary` underline.

**CSS tokens:** `border`, `on-surface-muted`, `on-surface`, `surface-hover`, `primary-text`, `primary`, `radius-sm`, `space-3`, `text-sm`, `shadow-focus`
