Short confirmation after an action, e.g. “Copied” or “Changes saved”.

**Angular:** `lib-toast · lib-toaster` · `Toast · Toaster · ToastService` (standalone, OnPush) · source `libs/ui/src/components/toast/toast.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `icon` | `IconName` | `'check'` |  |
| `dismissible` | `boolean` | `false` | Shows × |

**Outputs**

| Name | Payload | Notes |
| --- | --- | --- |
| `dismissed` | `void` |  |

**Content slots:** default — message · `[libToastAction]` — e.g. Undo

Auto-dismiss after 2.5s (5s with an action); stacked bottom-centre; `role="status"`.

```ts
<!-- once, in the app root -->
<lib-toaster />

private toast = inject(ToastService);
this.toast.show('Copied');
this.toast.show('Moved to Trash', { icon: 'trash', actionLabel: 'Undo', action: () => this.restore(id) });
```

**Design**
- Inverse colours: `on-surface` ground, `surface` text. `radius-lg`, `shadow-md`.
- Past tense, a few words.

**CSS tokens:** `on-surface`, `surface`, `shadow-md`, `radius-lg`, `space-4`, `text-sm`
