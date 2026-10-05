import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAPER_UI } from 'ngx-paper-ui';

@Component({
  selector: 'app-empty-state-showcase', imports: [PAPER_UI], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-cols two">
      <div class="doc-dashed"><lib-empty-state icon="folder" title="No projects yet" description="Projects group your files and tasks. Create one to get started."><button libButton icon="plus">New project</button></lib-empty-state></div>
      <div class="doc-dashed"><lib-empty-state icon="search" title="No results" description="Nothing matches “reprot”. Check the spelling or clear the filters."><button libButton variant="secondary">Clear search</button></lib-empty-state></div>
    </div>`,
})
export class EmptyStateShowcase {}
