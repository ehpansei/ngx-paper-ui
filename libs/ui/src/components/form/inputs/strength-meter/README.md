Four-segment strength meter with a text label, for passwords and other secrets.

**Angular:** `lib-strength-meter` · `StrengthMeter` (standalone, OnPush) · source `libs/ui/src/components/form/inputs/strength-meter/strength-meter.ts`. The documentation page (this card) shows the live component, its API and the CSS tokens it uses.

**Inputs**

| Name | Type | Default | Notes |
| --- | --- | --- | --- |
| `score` | `0–4` | — | Explicit score; wins over `password` |
| `password` | `string \| null` | — | Scored with `scorePassword()` |
| `hint` | `string` | — | Right-aligned, e.g. "Used on 3 sites" |
| `hideLabel` | `boolean` | `false` |  |

`scorePassword()` is a UI hint; pass a real estimator's score (e.g. zxcvbn) in production.

```html
<lib-strength-meter [password]="model().password" />
<lib-strength-meter [score]="zxcvbnScore()" hint="Used on 3 sites" />
```

**Design**
- 1 Weak `danger`, 2 Fair `warning`, 3 Good `primary` (follows primary), 4 Strong `success`; empty `surface-hover`.
- The word always shows; `role="meter"`.

**CSS tokens:** `danger`, `warning`, `primary`, `success`, `surface-hover`, `on-surface`, `on-surface-muted`, `radius-full`, `space-1`, `text-xs`
