Buttons trigger actions; one primary per view, the rest secondary or ghost.

**Angular:** `button[libButton], a[libButton]` · `Button` (standalone, OnPush) · source `libs/ui/src/components/button/button.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` |  |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 32 / 40 / 48px |
| `icon` | `IconName` | — | Leading icon, sized to the button |
| `iconRight` | `IconName` | — | Trailing icon |
| `iconOnly` | `boolean` | `false` | Square button; requires `label` |
| `label` | `string` | — | `aria-label` for icon-only buttons |

**Content slots:** default — the label

An attribute component on a native `<button>` or `<a>`, so `type`, `disabled`, `(click)`, form submit and `routerLink` stay native.

```html
<button libButton icon="plus" (click)="create()">Create</button>
<button libButton variant="secondary" type="button">Cancel</button>
<button libButton variant="danger" icon="trash" [disabled]="busy()">Delete</button>
<a libButton variant="ghost" routerLink="/settings" icon="settings">Settings</a>
<button libButton variant="ghost" size="sm" icon="more" iconOnly label="More actions"></button>
```

**Design**
- Primary: `button-primary-bg` (= primary), `button-primary-color`, `shadow-sm`; hover `button-primary-bg-hover` + `shadow-md`. Follows the configured primary.
- Secondary: `button-secondary-bg` on the warm neutral scale; border aliases the fill.
- Danger: `danger` / `on-danger`, destructive actions only. Ghost: no fill, hover `surface-hover`.
- No variant changes its label colour on hover. Focus `shadow-focus`. Disabled `disabled-opacity`.

**CSS tokens:** `button-primary-bg`, `button-primary-bg-hover`, `button-primary-color`, `button-secondary-bg`, `button-secondary-bg-hover`, `button-secondary-color`, `button-secondary-border`, `danger`, `danger-hover`, `on-danger`, `surface-hover`, `on-surface`, `shadow-sm`, `shadow-md`, `shadow-focus`, `button-primary-height`, `button-height-sm`, `button-height-lg`, `button-primary-padding`, `button-primary-gap`, `button-primary-radius`, `space-3`, `space-6`, `text-sm`, `disabled-opacity`
