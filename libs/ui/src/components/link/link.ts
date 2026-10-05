import { ChangeDetectionStrategy, Component } from '@angular/core';

/** <a libLink routerLink="/docs">setup guide</a> */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- attribute component on a native element
  selector: 'a[libLink]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ui-link' },
  templateUrl: './link.html',
})
export class Link {}
