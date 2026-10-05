# Entry points in ngx-paper-ui: why split, and what Angular does

## The short version
Splitting `ngx-paper-ui` into `ngx-paper-ui/forms`, `ngx-paper-ui/forms/passwords`, `ngx-paper-ui/layout` … is about
**organisation and boundaries**, not about making apps smaller. Apps are already small, because of tree-shaking.

## Tree-shaking, explained simply
Think of the library as a box of LEGO bricks. Your app takes only the bricks it uses. The build tool (esbuild,
inside `ng build`) looks at what you actually used and leaves the rest of the box out of your app. That's
"tree-shaking": shake the tree and the unused leaves fall off.

- **One big box (today).** `import { Button } from 'ngx-paper-ui'` → the build sees only `Button` (and what it needs,
  like `Icon`) is used, and drops `Modal`, `Form`, `Tabs` … Your app ships Button + Icon, not the whole library.
- **Why it can drop the rest safely.** A build tool only removes code it knows is harmless to remove. Code that "does
  something just by being loaded" (changes a global, registers itself) is a *side effect* and is kept. Our
  `package.json` says `"sideEffects": ["*.css"]`, meaning "only my CSS files do things just by being loaded; every
  JavaScript file can be dropped if unused". And standalone Angular components aren't registered anywhere unless you
  import them, so nothing keeps them alive.
- **Ten smaller boxes (the split).** `import { Button } from 'ngx-paper-ui/actions'` → still Button + Icon. Same size.

## So why does anyone split? What does Angular do?
Angular **does** use sub-path imports ("secondary entry points"). You already use some:

| Import | Why it's separate |
|---|---|
| `@angular/common/http` | Optional feature with its own providers. Many apps never use it |
| `@angular/core/rxjs-interop` | Bridges to RxJS. Keeps that coupling out of the core API |
| `@angular/forms/signals` | A new, different forms API. It ships next to the old one without mixing them |
| `@angular/core/testing`, `@angular/router/testing` | Test-only code. It must never appear in app imports by accident |
| `@angular/cdk/a11y`, `@angular/cdk/dialog` … | Independent toolkits with no shared internals |
| `@angular/material/button`, `@angular/material/dialog` … | **One per component.** Since v9 there is no root `@angular/material` import |

Where Angular does **not** split is inside a cohesive package. `@angular/core` has no `@angular/core/signals` or
`@angular/core/components`, because its pieces depend on each other and tree-shaking already removes what you don't
use.

### Why Angular splits where it does
1. **Boundaries.** An entry point is a sealed box: other code can only use what it exports. This keeps test code,
   experimental APIs and optional dependencies separate.
2. **Optional or heavy dependencies.** If a feature pulls in something extra, a separate entry point means apps
   that don't import it never even resolve it.
3. **Build and editor speed for big packages.** The compiler and the IDE read less per import. This mattered most for
   Material.
4. **History (Material v9, 2020).** In the older ViewEngine/CommonJS era, tree-shaking was weaker and importing from
   a giant root entry point slowed compilation. Material removed its root import then. Modern Ivy plus
   ESM tree-shaking removed much of the size argument, but the per-component structure stayed because it's clear
   and stable.

### Why Material splits per component, not per category
Material's paths are **component names** (`/button`, `/dialog`), not docs categories (`/form-controls`,
`/navigation`). A component's name rarely changes, but how docs group components does. Import paths are a promise
to consumers: changing one is a breaking change.

## What this means for ngx-paper-ui
- **Gains:** imports match the docs; enforced dependency direction between groups; a little less work for the
  compiler and the editor per import.
- **Costs:** an `ng-package.json` per entry; moved folders (`libs/ui/<entry>/`); path aliases; and docs groups become
  public API. Moving Passwords out of Forms later would break every consumer's imports.
- **No change:** app bundle size.

Decision (2026-10-01): split by docs group **and** sub-group (`ngx-paper-ui/forms/passwords`), root exports only
`PAPER_UI`, one import path per symbol. A docs-app spec keeps nav groups and entry exports in step.
