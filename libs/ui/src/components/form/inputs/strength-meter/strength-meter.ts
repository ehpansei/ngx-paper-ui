import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type Strength = 0 | 1 | 2 | 3 | 4;
export const STRENGTH_LABELS = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'] as const;

/** UI hint only. Use a real estimator (e.g. zxcvbn) and pass its score in production. */
export function scorePassword(pw: string | null | undefined): Strength {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  if (pw.length < 8) s = Math.min(s, 1);
  return Math.max(1, Math.min(4, s)) as Strength;
}

/** <lib-strength-meter [password]="form.value.password" hint="Used on 3 sites" /> */
@Component({
  selector: 'lib-strength-meter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"ui-strength ui-strength-" + level()',
    role: 'meter', 'aria-valuemin': '0', 'aria-valuemax': '4', '[attr.aria-valuenow]': 'level()', 'aria-label': 'Password strength',
  },
  templateUrl: './strength-meter.html',
})
export class StrengthMeter {
  /** Explicit score 1–4. Wins over `password`. */
  readonly score = input<Strength>();
  /** Scored with scorePassword when no score is given. */
  readonly password = input<string | null>();
  readonly hint = input<string>();
  readonly hideLabel = input(false, { transform: booleanAttribute });
  readonly labels = STRENGTH_LABELS;
  readonly level = computed(() => this.score() ?? scorePassword(this.password()));
}
