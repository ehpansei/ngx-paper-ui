import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { PAPER_UI, scorePassword } from 'ngx-paper-ui';

@Component({
  selector: 'app-strength-meter-showcase', imports: [PAPER_UI, FormField], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="doc-cols four">@for (s of scores; track s) { <lib-strength-meter [score]="s" /> }</div>
    <div class="doc-row bottom">
      <lib-password-field label="Try a password" [revealed]="true" [copyable]="false" [formField]="f.password" />
      <lib-strength-meter [password]="model().password" style="width:280px" [hint]="'Score ' + score() + '/4'" />
    </div>`,
})
export class StrengthMeterShowcase {
  readonly scores = [1, 2, 3, 4] as const;
  readonly model = signal({ password: 'Summer2024' });
  readonly f = form(this.model);
  readonly score = computed(() => scorePassword(this.model().password));
}
