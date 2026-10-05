import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Avatar } from '../avatar';

/** <lib-sidebar-user name="Pedro Castro" email="pedro@example.com"><button libButton variant="ghost" size="sm" icon="log-out" iconOnly label="Sign out"></button></lib-sidebar-user> */
@Component({
  selector: 'lib-sidebar-user',
  standalone: true,
  imports: [Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-user' },
  templateUrl: './sidebar-user.html',
})
export class SidebarUser {
  readonly name = input.required<string>();
  readonly email = input<string>();
  readonly tone = input<'primary' | 'alt'>('primary');
}
