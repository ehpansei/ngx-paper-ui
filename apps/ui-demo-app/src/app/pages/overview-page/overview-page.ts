import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge, Button, Icon, Link } from 'ngx-paper-ui';

/** The design system's cover and brand book (README), ported to the repo's `lib-` names. */
@Component({
  selector: 'app-overview-page',
  imports: [RouterLink, Button, Badge, Icon, Link],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'doc' },
  styles: `
    .cover { container: ov-cover / inline-size; position: relative; height: 288px; overflow: hidden; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--surface); }
    .art { position: absolute; top: 0; right: -16px; width: 480px; height: 288px; }
    .art svg { display: block; width: 480px; height: 288px; }
    .brand { fill: var(--primary); }
    .tint { fill: var(--primary-soft); stroke: var(--primary); stroke-width: 1.5; }
    .row { fill: var(--secondary); }
    .deep { fill: var(--on-surface); }
    .ground { fill: var(--surface); }
    .line { fill: var(--border-hover); }
    .line.on-tint { fill: var(--primary); opacity: 0.45; }
    .off { fill: var(--secondary); }
    .words { position: absolute; left: var(--space-8); bottom: var(--space-8); max-width: 440px; }
    .name { margin: 0; font-size: 88px; line-height: 0.9; font-weight: 700; letter-spacing: -0.04em; color: var(--on-surface); }
    .tag { margin: var(--space-3) 0 0 6px; font-size: 14px; line-height: 20px; color: var(--on-surface-muted); }
    /* 813px content (815px with the border): the 88px title (right edge 366px) meets the art's brand block (480px art at right -16px, brand at x=16). */
    @container ov-cover (max-width: 813px) { .art { opacity: 0.35; } }
    @media (max-width: 767px) { .name { font-size: 56px; } }
    ul.doc-p { padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
  `,
  template: `
    <div class="cover">
      <div class="art" aria-hidden="true">
        <svg viewBox="0 0 480 288" width="480" height="288">
          <rect class="brand" x="16" y="-16" width="144" height="208" rx="12" />
          <rect class="brand" x="16" y="216" width="33" height="8" rx="4" />
          <rect class="brand" x="53" y="216" width="33" height="8" rx="4" />
          <rect class="brand" x="90" y="216" width="33" height="8" rx="4" />
          <rect class="off" x="127" y="216" width="33" height="8" rx="4" />
          <rect class="row" x="176" y="16" width="320" height="56" rx="12" />
          <rect class="ground" x="192" y="32" width="24" height="24" rx="8" />
          <rect class="line" x="228" y="34" width="96" height="8" rx="4" />
          <rect class="line" x="228" y="48" width="64" height="6" rx="3" />
          <rect class="tint" x="176" y="80" width="320" height="56" rx="12" />
          <rect class="deep" x="192" y="96" width="24" height="24" rx="8" />
          <rect class="line on-tint" x="228" y="98" width="112" height="8" rx="4" />
          <rect class="line on-tint" x="228" y="112" width="72" height="6" rx="3" />
          <rect class="row" x="176" y="144" width="320" height="56" rx="12" />
          <rect class="ground" x="192" y="160" width="24" height="24" rx="8" />
          <rect class="line" x="228" y="162" width="80" height="8" rx="4" />
          <rect class="line" x="228" y="176" width="56" height="6" rx="3" />
          <rect class="row" x="176" y="208" width="320" height="56" rx="12" />
          <rect class="ground" x="192" y="224" width="24" height="24" rx="8" />
          <rect class="line" x="228" y="226" width="104" height="8" rx="4" />
          <rect class="line" x="228" y="240" width="48" height="6" rx="3" />
        </svg>
      </div>
      <div class="words">
        <h1 class="name">Paper UI</h1>
        <p class="tag">Warm as paper. One colour, every component in step.</p>
      </div>
    </div>

    <p class="doc-p">
      Paper UI is a generic Angular component library that looks and feels like ink on paper: cream paper surfaces,
      sepia ink, muted pigment accents, one configurable primary colour, Inter throughout, and a sidebar app layout. It
      should read as quiet and precise, and stay dense enough for productivity tools. No decorative gradients, no
      illustrations, no emoji.
    </p>
    <div class="doc-row">
      <a libButton routerLink="/lib-button" icon="plus">Browse components</a>
      <a libButton variant="secondary" routerLink="/lib-tokens">Tokens</a>
      <a libButton variant="ghost" routerLink="/lib-theme">Theme</a>
    </div>

    <section class="doc-section" aria-labelledby="ov-stack">
      <h2 id="ov-stack">Angular stack</h2>
      <ul class="doc-p">
        <li>Every component is <strong>standalone</strong> and uses <code>ChangeDetectionStrategy.OnPush</code>. Inputs are <code>input()</code> / <code>model()</code> / <code>output()</code> signals, templates use <code>&#64;if</code> / <code>&#64;for</code>, no NgModules, zoneless-ready.</li>
        <li><strong>Forms are Signal Forms</strong> (<code>&#64;angular/forms/signals</code>). TextInput, Select and PasswordField implement <code>FormValueControl</code>; Checkbox and Switch implement <code>FormCheckboxControl</code>. Bind each control with the <code>FormField</code> directive: <code>&lt;lib-text-input label="Name" [formField]="f.name" /&gt;</code>. Without a form, bind <code>[(value)]</code> / <code>[(checked)]</code>. There is no ControlValueAccessor.</li>
        <li><strong>Peer dependencies:</strong> <code>&#64;angular/core</code>, <code>&#64;angular/forms</code> (signals), <code>&#64;angular/cdk</code> (Dialog, Clipboard).</li>
        <li><strong>Import</strong> everything with <code>imports: [PAPER_UI]</code> or single classes (<code>Button</code>, <code>TextInput</code>, …) from <code>ngx-paper-ui</code>.</li>
        <li><strong>Prefixes:</strong> selectors <code>lib-</code> / <code>lib…</code> (<code>&lt;lib-select&gt;</code>, <code>&lt;button libButton&gt;</code>), classes unprefixed, rendered CSS classes <code>ui-</code>.</li>
        <li><strong>Styles are global.</strong> Add <code>ngx-paper-ui/paper-ui.css</code> once (in this repo, <code>libs/ui/src/styles/index.css</code>). Components carry no styles of their own.</li>
        <li><strong>Native elements first.</strong> Buttons, links, nav items and info cards are attribute components on real <code>&lt;button&gt;</code>/<code>&lt;a&gt;</code>, so <code>routerLink</code>, <code>type="submit"</code> and <code>disabled</code> stay native.</li>
        <li><strong>Overlays</strong> open through the CDK Dialog: <code>DialogService.open()</code>, <code>await ConfirmService.ask()</code>; toasts come from <code>ToastService</code> with one <code>&lt;lib-toaster /&gt;</code> in the root.</li>
      </ul>
    </section>

    <section class="doc-section" aria-labelledby="ov-theme">
      <h2 id="ov-theme">Theming: one configurable colour</h2>
      <ul class="doc-p">
        <li><strong><code>primary</code> is the theme input</strong> (with its pair <code>on-primary</code>). Set it and every primary-like colour follows: primary buttons, checked checkboxes, switches, active tabs and nav items, selected info cards, progress bars, links, primary badges, the default avatar, the logo mark and every focus ring.</li>
        <li>The tints are <strong>derived</strong>, not set: <code>primary-hover</code>, <code>primary-text</code>, <code>primary-soft</code>, <code>nav-item-active-bg</code>, <code>focus-ring</code> and <code>shadow-focus</code> are computed from <code>primary</code> with <code>color-mix()</code>.</li>
        <li>Re-theme the whole app with <code>inject(ThemeService).setPrimary('#3f5a7a')</code>, or one region with <code>&lt;section libTheme primary="#a84a2c"&gt;</code>.</li>
        <li>Pick a primary with at least 4.5:1 against <code>surface</code>. <code>THEME_PRESETS</code> lists seven checked pairs in muted ink hues — Sepia (default), Indigo ink, Sage, Terracotta, Plum, Ochre, Ink.</li>
        <li>Everything else is fixed: neutrals, <code>secondary</code>, <code>danger</code>, <code>success</code>, <code>warning</code>. Dark mode: <code>ThemeService.setMode('dark')</code>.</li>
      </ul>
    </section>

    <section class="doc-section" aria-labelledby="ov-content">
      <h2 id="ov-content">Content fundamentals</h2>
      <ul class="doc-p">
        <li>Sentence case everywhere except sidebar section overlines ("MAIN MENU").</li>
        <li>Buttons are short verbs: "Create", "Save changes", "Delete". Toasts are past tense: "Copied", "Changes saved", "Moved to Trash".</li>
        <li>Address the user as "you".</li>
        <li>State consequences exactly, especially destructive ones: "It moves to Trash and is removed for good after 30 days."</li>
      </ul>
    </section>

    <section class="doc-section" aria-labelledby="ov-visual">
      <h2 id="ov-visual">Visual foundations</h2>
      <h3>Color</h3>
      <ul class="doc-p">
        <li>Two themes on the same token names: <strong>Light</strong> and <strong>Dark</strong>. Use tokens, never hex, in components.</li>
        <li>Grounds: <code>surface</code> for the main pane, inputs and info cards; <code>surface-raised</code> for the sidebar, aside and hover; <code>surface-hover</code> for hover fills of rows, menu items, nav items and ghost buttons.</li>
        <li>Text: <code>on-surface</code> for primary text, <code>on-surface-muted</code> for secondary text, labels, placeholders and resting icons.</li>
        <li>Status: <code>danger</code>, <code>warning</code>, <code>success</code> are fills. As text use <code>danger-text</code>, <code>warning-text</code>, <code>success-text</code>. <lib-badge tone="warning">warning</lib-badge> and <lib-badge tone="success">success</lib-badge> fail as text on <code>surface</code>.</li>
        <li><strong>Palette:</strong> sepia throughout. The dark theme is deep sepia (#1b1712), not black. Shadows and the scrim are sepia-tinted; nothing is pure black, pure white or a saturated screen colour.</li>
      </ul>
      <h3>Typography</h3>
      <ul class="doc-p">
        <li>Inter only (400, 500, 600, 700). Styles: <code>heading-1</code> 34/40 Bold, <code>page-title</code> 24/32, <code>section-title</code> 20/28, <code>wordmark</code> 18/24, <code>body</code> 14/20, <code>label</code> 14/20 Medium, <code>label-strong</code> 14/20 Semi Bold, <code>label-sm</code> 13/18 Medium, <code>caption</code> 12/16, <code>overline</code> 11/16 Semi Bold uppercase.</li>
      </ul>
      <h3>Spacing, radius, layout</h3>
      <ul class="doc-p">
        <li>4px scale: <code>space-1</code> 4 … <code>space-6</code> 24, plus <code>space-8</code> 32.</li>
        <li>Radii: <code>radius-sm</code> 6 (menu items, badges), <code>radius-md</code> 8 (buttons, inputs, nav items), <code>radius-lg</code> 12 (info cards, toasts, app frame), <code>radius-xl</code> 16 (modals), <code>radius-full</code> (avatars, switches, progress).</li>
        <li><strong>Mobile first.</strong> Breakpoints <code>bp-md</code> (768px) and <code>bp-lg</code> (1024px) with <code>min-width</code> queries. <a libLink routerLink="/lib-main-view">MainView</a> uses container queries on its own width.</li>
      </ul>
      <h3>Elevation, borders, states</h3>
      <ul class="doc-p">
        <li>1px <code>border</code> separates; hover <code>border-hover</code>. Shadows: <code>shadow-sm</code> on filled buttons, <code>shadow-md</code> on their hover plus menus and toasts, <code>shadow-lg</code> on modals.</li>
        <li><strong>Focus:</strong> one treatment everywhere — <code>shadow-focus</code> on <code>:focus-visible</code>. <strong>Hover:</strong> fills change; text colour doesn't. <strong>Disabled:</strong> <code>disabled-opacity</code> 0.5 and <code>not-allowed</code>. <strong>Error:</strong> <code>danger</code> border plus a <code>danger-text</code> message with an alert icon. <strong>Selected:</strong> <code>card-bg-selected</code> + <code>card-border-selected</code>.</li>
        <li>Known gap: <code>border</code> on <code>surface</code> is 1.3:1, below the 3:1 guideline for control borders; kept from the Figma source.</li>
      </ul>
    </section>

    <section class="doc-section" aria-labelledby="ov-icons">
      <h2 id="ov-icons">Iconography</h2>
      <ul class="doc-p">
        <li>Use <code>&lt;lib-icon&gt;</code>: a stroke set on a 24px grid, 1.75px stroke, round caps, drawn in <code>currentColor</code>. Three sizes only — <code>sm</code> 16, <code>md</code> 18 (default), <code>lg</code> 20. Each icon is an SVG file in <code>libs/ui/src/assets/icons/</code>, served as one sprite (<code>nx run ui:icons</code>).</li>
        <li>The library has no logo of its own: <code>&lt;lib-logo&gt;</code> renders the product name you pass with a <code>primary</code> initial tile.</li>
      </ul>
      <div class="doc-row"><lib-icon name="lock" size="lg" /><lib-icon name="key" size="lg" /><lib-icon name="shield-check" size="lg" /><lib-icon name="eye" size="lg" /><lib-icon name="copy" size="lg" /><a libLink routerLink="/lib-icon">All icons</a></div>
    </section>
  `,
})
export class OverviewPage {}
