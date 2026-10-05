import { computed, Directive, DOCUMENT, inject, Injectable, input } from '@angular/core';

/*
 * Theming. Only `primary` (and its pair `on-primary`) are configurable; primary-hover, primary-text,
 * primary-soft, nav-item-active-bg, focus-ring and shadow-focus are derived from --primary in paper-ui.css
 * and recompute inside any element with class .ui-theme.
 */

export interface ThemeInput { primary: string; primaryDark?: string; onPrimary?: string; onPrimaryDark?: string }

export const THEME_PRESETS: (ThemeInput & { name: string })[] = [
  { name: 'Sepia', primary: '#8a5a2b', primaryDark: '#d4a373' },
  { name: 'Indigo ink', primary: '#3f5a7a', primaryDark: '#9fb3cc' },
  { name: 'Sage', primary: '#4f6b4a', primaryDark: '#a9c09a' },
  { name: 'Terracotta', primary: '#a84a2c', primaryDark: '#e59a7c' },
  { name: 'Plum', primary: '#6e4a6b', primaryDark: '#c9a3c4' },
  { name: 'Ochre', primary: '#86621a', primaryDark: '#d9b25c' },
  { name: 'Ink', primary: '#3b2f25', primaryDark: '#e9dcc6' },
];

const rgb = (hex: string) => { let x = hex.replace('#', ''); if (x.length === 3) x = x.replace(/./g, '$&$&'); const n = parseInt(x.slice(0, 6), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const lum = (hex: string) => rgb(hex).map(c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }).reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
export const contrast = (a: string, b: string) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
/** Paper white if it reaches 4.5:1 on the colour, else deep sepia. */
export const onColor = (bg: string) => (contrast(bg, '#fffaf2') >= 4.5 ? '#fffaf2' : '#1b1712');
const lighten = (hex: string, t: number) => '#' + rgb(hex).map(v => Math.round(v + (255 - v) * t).toString(16).padStart(2, '0')).join('');

/** The four custom properties .ui-theme reads (light pair + dark pair). */
export function themeVars(t: ThemeInput): Record<string, string> {
  const dark = t.primaryDark ?? lighten(t.primary, 0.45);
  return {
    '--theme-primary': t.primary, '--theme-on-primary': t.onPrimary ?? onColor(t.primary),
    '--theme-primary-dark': dark, '--theme-on-primary-dark': t.onPrimaryDark ?? onColor(dark),
  };
}

/** App-wide: inject(ThemeService).setPrimary('#7c3aed'); setMode('dark'). */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  setPrimary(primary: string, opts: Omit<ThemeInput, 'primary'> = {}) {
    const root = this.doc.documentElement;
    root.classList.add('ui-theme');
    for (const [k, v] of Object.entries(themeVars({ primary, ...opts }))) root.style.setProperty(k, v);
  }
  reset() {
    const root = this.doc.documentElement;
    root.classList.remove('ui-theme');
    ['--theme-primary', '--theme-on-primary', '--theme-primary-dark', '--theme-on-primary-dark'].forEach(k => root.style.removeProperty(k));
  }
  setMode(mode: 'light' | 'dark') { this.doc.documentElement.setAttribute('data-theme', mode); }
}

/** Scoped: <section libTheme primary="#e11d48">…</section> — everything primary-like inside follows. */
@Directive({
  selector: '[libTheme]',
  standalone: true,
  host: { class: 'ui-theme', '[style]': 'vars()' },
})
export class Theme {
  readonly primary = input.required<string>();
  readonly primaryDark = input<string>();
  readonly onPrimary = input<string>();
  readonly onPrimaryDark = input<string>();
  readonly vars = computed(() => themeVars({ primary: this.primary(), primaryDark: this.primaryDark(), onPrimary: this.onPrimary(), onPrimaryDark: this.onPrimaryDark() }));
}
