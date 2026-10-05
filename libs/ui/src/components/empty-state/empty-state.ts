import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, IconName } from '../icon';

/** <lib-empty-state icon="folder" title="No projects yet" description="…"><button libButton icon="plus">New project</button></lib-empty-state> */
@Component({
  selector: 'lib-empty-state',
  standalone: true,
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-empty' },
  templateUrl: './empty-state.html',
})
export class EmptyState {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly icon = input<IconName>('inbox');
}
