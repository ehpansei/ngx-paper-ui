A short dialog that asks the user to confirm an action before it happens.

**Angular:** `lib-confirm-dialog · ConfirmService` · `ConfirmDialog · ConfirmService` (standalone, OnPush) · source `libs/ui/src/components/confirm-dialog/confirm-dialog.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | `'Delete this item?'` | Name the thing |
| `description` | `string` | — | The consequence |
| `confirmLabel` | `string` | `'Delete'` |  |
| `cancelLabel` | `string` | `'Cancel'` |  |
| `tone` | `'danger' \| 'neutral'` | `'danger'` |  |
| `icon` | `IconName \| null` | `'trash'` |  |

**Outputs**

| Name | Payload | Notes |
| --- | --- | --- |
| `confirm` | `void` |  |
| `cancel` | `void` | Also × and Escape |

```ts
private confirm = inject(ConfirmService);

async remove(item: Item) {
  if (await this.confirm.ask({ title: `Delete “${item.name}”?`, description: 'It moves to Trash…' })) this.items.delete(item.id);
}
```

**Design**
- `role="alertdialog"`. Danger: `danger-soft` tile, danger confirm. Neutral: gray tile, primary confirm.
- Destructive or hard-to-undo actions only; otherwise act and offer Undo.

**CSS tokens:** `danger`, `on-danger`, `danger-soft`, `danger-text`, `surface-hover`, `on-surface-muted`, `button-primary-bg`, `surface`, `scrim`, `shadow-lg`, `radius-xl`
