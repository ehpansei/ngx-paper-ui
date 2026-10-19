---
type: concept
created: 2026-10-19
updated: 2026-10-19
sources:
  - ../sources/entry-points.md
tags: [packaging, build, angular, tree-shaking]
---

# Entry points and tree-shaking

An **entry point** is an import path a package offers: `ngx-paper-ui` is the primary one, and a path like
`ngx-paper-ui/forms` would be a *secondary* one. Splitting a library into secondary entry points is about
**organisation and boundaries, not bundle size**. Tree-shaking already keeps apps small.

## Tree-shaking

The app's build (esbuild, inside `ng build`) keeps only the code the app actually uses. If an app imports `Button`
from `ngx-paper-ui`, it ships Button plus what Button needs (Icon), and not Modal, Form or Tabs.

A bundler only drops code it knows is safe to drop. Code that does something just by being loaded, like changing a
global or registering itself, is a *side effect* and is kept. Two things make Paper UI safe to shake:

- [`libs/ui/package.json`](../../libs/ui/package.json) declares `"sideEffects": ["*.css"]`. That says only the CSS
  files act on load, so any unused JavaScript file can be dropped.
- Standalone components aren't registered anywhere unless something imports them, so nothing keeps an unused one
  alive.

Splitting into entry points changes neither of these. `ngx-paper-ui/actions` would produce the same bundle as
`ngx-paper-ui`.

## Why Angular splits where it does

| Import | Reason it's separate |
|---|---|
| `@angular/core/testing`, `@angular/router/testing` | **Boundary:** test-only code must never end up in app imports by accident |
| `@angular/core/rxjs-interop` | **Boundary:** keeps the RxJS coupling out of the core API |
| `@angular/forms/signals` | **Boundary:** a new forms API ships next to the old one without mixing them |
| `@angular/common/http` | **Optional dependency:** many apps never use it, and those never even resolve it |
| `@angular/cdk/a11y`, `@angular/cdk/dialog` | Independent toolkits with no shared internals |
| `@angular/material/button`, `…/dialog` | **One per component**: compiler and editor speed in a huge package, plus history (see below) |

Angular **doesn't** split a package whose pieces depend on each other. There's no `@angular/core/signals`, because
tree-shaking already removes what an app doesn't use.

**The history:** Material removed its root import in v9 (2020). In the ViewEngine/CommonJS era, tree-shaking was
weaker and importing from one giant entry point slowed compilation. Ivy and ESM tree-shaking took away most of the
size argument, but the per-component layout stayed because it's clear and stable.

**Import paths are a promise.** Material's paths are component names (`/button`), not docs categories
(`/form-controls`). A component's name rarely changes, but how the docs group components does, and renaming an
import path is a breaking change for every consumer.

## What it means for Paper UI

- **Gains from splitting:** imports that match the docs, a dependency direction between groups that the build
  enforces, and slightly less work per import for the compiler and the editor.
- **Costs:** an `ng-package.json` per entry, moved folders and path aliases, and the docs groups turn into public
  API. Docs sub-groups exist only in
  [`doc-nav.ts`](../../apps/ui-demo-app/src/app/docs/doc-nav.ts), so splitting by them would make a docs-only
  grouping permanent.
- **Bundle size:** unchanged.
- **Today** there's a single entry point. The split is
  [decided but deferred](../decisions/secondary-entry-points.md).

Related: [Partial-compilation build](../decisions/partial-compilation-build.md),
[Standalone npm package](../decisions/standalone-npm-package.md).
