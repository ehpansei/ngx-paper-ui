---
type: decision
created: 2026-10-19
updated: 2026-10-19
date: 2026-09-30
status: active
sources:
  - ../sources/ngx-paper-ui-extraction.md
tags: [build, packaging, angular]
---

# Publishable build: ng-packagr with partial compilation

## Context

In vault, `ui:build` used `@nx/angular:ng-packagr-lite`. That compiles in **full** mode, which is meant only for use
inside the workspace, and it writes a `prepublishOnly` script that blocks `npm publish`.

## Decision

`ui:build` uses **`@nx/angular:package`** (full ng-packagr) with `"compilationMode": "partial"` and outputs FESM2022.
It depends on the `tokens`, `icons` and `styles` targets, so the generated sources are fresh before every build.

## Why

- `npm publish` has to work, so the `prepublishOnly` guard has to go.
- Partial compilation is Angular's format for published libraries. The consuming app's compiler finishes the job, so
  the package isn't tied to the exact Angular version that built it.

## Rejected alternatives

- **Keep `ng-packagr-lite`:** fully compiled output, and it blocks publishing.

## Consequences

- To check it: `dist/libs/ui/fesm2022/ngx-paper-ui.mjs` contains `ɵɵngDeclareComponent`, not `ɵɵdefineComponent`,
  and `dist/libs/ui/package.json` has no `prepublishOnly`.
- Configured in [`libs/ui/project.json`](../../libs/ui/project.json) and
  [`libs/ui/tsconfig.lib.prod.json`](../../libs/ui/tsconfig.lib.prod.json). The package contents and the
  `publint`/`attw` checks are in [`CLAUDE.md`](../../CLAUDE.md).
- Related: [Standalone npm package](standalone-npm-package.md).
