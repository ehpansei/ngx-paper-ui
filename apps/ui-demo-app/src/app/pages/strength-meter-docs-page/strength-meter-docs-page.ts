import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocPage } from '../../docs/doc-page';
import { StrengthMeterShowcase } from './strength-meter-showcase';
import { STRENGTH_METER_DOC } from './strength-meter.docs';

@Component({
  selector: 'app-strength-meter-docs-page',
  imports: [DocPage, StrengthMeterShowcase],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-doc-page [doc]="doc"><app-strength-meter-showcase /></app-doc-page>`,
})
export class StrengthMeterDocsPage {
  protected readonly doc = STRENGTH_METER_DOC;
}
