---
type: decision
created: 2026-10-19
updated: 2026-10-19
date: 2026-10-01
status: deferred
sources:
  - ../sources/entry-points.md
tags: [packaging, api, angular]
---

# Secondary entry points by docs group (deferred)

## Context

`ngx-paper-ui` has one entry point. [`libs/ui/ng-package.json`](../../libs/ui/ng-package.json) points at
[`src/index.ts`](../../libs/ui/src/index.ts), which re-exports every component, layout and theme symbol. How
entry points and tree-shaking relate is explained in
[Entry points and tree-shaking](../concepts/entry-points-and-tree-shaking.md).

## Decision

**Decided on 2026-10-01, deferred on 2026-10-19:**
- split the package by docs group and sub-group (`ngx-paper-ui/forms`, `ngx-paper-ui/forms/passwords`,
  `ngx-paper-ui/layout` …);
- the root exports only `PAPER_UI`;
- every symbol gets exactly one import path;
- a docs-app spec keeps the nav groups and the entry exports matched.

None of this has been built. On 2026-10-19 the user put it aside: the split may still change, and it's to be ignored
for now.

## Why

- **For splitting:** organisation and boundaries. Imports would match the docs, and the build would enforce the
  dependency direction between groups.
- **For deferring:** bundle size doesn't depend on it, and the shape of the split isn't settled.

## Rejected alternatives

None recorded yet. Revisit when the split comes back.

## Consequences

- Until then, consumers import everything from `ngx-paper-ui`. Adding entry points later doesn't break anyone if
  the root keeps exporting what it exports today. Removing root exports later would break them.
- Related: [Standalone npm package](standalone-npm-package.md).
