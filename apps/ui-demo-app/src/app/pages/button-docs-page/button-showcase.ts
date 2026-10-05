import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-button-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (size of sizes; track size) {
      <div class="doc-row">
        <span class="doc-label">{{ size }}</span>
        <button libButton [size]="size" icon="plus">Create</button>
        <button libButton [size]="size" variant="secondary">Cancel</button>
        <button libButton [size]="size" variant="danger" icon="trash">Delete</button>
        <button libButton [size]="size" variant="ghost" icon="copy">Duplicate</button>
        <button libButton [size]="size" variant="ghost" icon="more" iconOnly label="More"></button>
      </div>
    }
    <div class="doc-row">
      <span class="doc-label">disabled</span>
      <button libButton disabled>Create</button><button libButton variant="secondary" disabled>Cancel</button>
      <button libButton variant="danger" disabled>Delete</button><button libButton variant="ghost" disabled>Duplicate</button>
      <span class="doc-hint">Hover and focus (Tab) the buttons above to see their states.</span>
    </div>`,
})
export class ButtonShowcase { readonly sizes = ['sm', 'md', 'lg'] as const; }
