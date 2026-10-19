Dialog for focused tasks: forms, settings, short flows. For confirmations use ConfirmDialog.

**Angular:** `lib-modal · DialogService` · `Modal · DialogService` (standalone, OnPush) · source `libs/ui/src/components/modal/modal.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | required |  |
| `description` | `string` | — |  |
| `icon` | `IconName` | — |  |
| `iconTone` | `'neutral' \| 'primary' \| 'danger'` | `'neutral'` |  |
| `role` | `'dialog' \| 'alertdialog'` | `'dialog'` |  |
| `closable` | `boolean` | `true` | Shows × |

**Outputs**

| Name | Payload | Notes |
| --- | --- | --- |
| `closed` | `void` | × clicked; close the DialogRef |

**Content slots:** default — body · `[libModalFooter]` — buttons

Opened through the CDK Dialog (focus trap, Escape, scroll block, focus restore). Needs `@angular/cdk/overlay-prebuilt.css`.

```ts
@Component({ selector: 'app-new-project', imports: [PAPER_UI, FormField], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<lib-modal title="New project" (closed)="ref.close()">
    <lib-text-input label="Name" [formField]="f.name" block />
    <ng-container libModalFooter>
      <button libButton variant="secondary" (click)="ref.close()">Cancel</button>
      <button libButton [disabled]="f().invalid()" (click)="ref.close(model().name)">Create</button>
    </ng-container></lib-modal>` })
export class NewProjectDialog {
  ref = inject(DialogRef<string>);
  model = signal({ name: '' });
  f = form(this.model, p => required(p.name));
}

inject(DialogService).open<string>(NewProjectDialog).closed.subscribe(name => name && this.create(name));
```

**Design**
- `surface`, 1px `border`, `radius-xl`, `shadow-lg`, over `scrim`; max 440px.
- Footer: secondary Cancel left, one primary action right.

**CSS tokens:** `surface`, `border`, `scrim`, `shadow-lg`, `radius-xl`, `surface-hover`, `on-surface-muted`, `primary-soft`, `primary-text`, `danger-soft`, `danger-text`, `space-5`, `space-6`, `text-xl`
