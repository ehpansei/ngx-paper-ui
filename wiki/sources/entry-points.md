---
type: source
created: 2026-10-19
updated: 2026-10-19
origin: entry-points.md
sources: []
tags: [packaging, tree-shaking, angular]
---

# Entry points: why split, and what Angular does

This is an explainer written on 2026-10-01, while the question of splitting `ngx-paper-ui` into secondary entry
points was being decided. It lives at the repo root as [`entry-points.md`](../../entry-points.md). Snapshot:
`raw/sessions/entry-points.md`.

## Key takeaways

- Splitting into entry points is about organisation and boundaries, **not bundle size**. Tree-shaking already keeps
  apps small, thanks to `"sideEffects": ["*.css"]` and standalone components.
- Angular splits its own packages for boundaries (testing, interop, new APIs), for optional dependencies, and for
  compiler and editor speed in huge packages. Material went per-component in v9. Angular doesn't split a package
  whose pieces depend on each other.
- Import paths are a promise to consumers, so names that rarely change (components) make steadier paths than docs
  categories.
- It ends with a decision: split by docs group and sub-group, and have the root export only `PAPER_UI`. That
  decision is now deferred.

## How it held up (checked against the repo on 2026-10-19)

- `sideEffects` is still `["*.css"]`, so the tree-shaking explanation holds.
- The split was never built: there's one entry point and a root that exports everything. On 2026-10-19 the user
  deferred it ([decision](../decisions/secondary-entry-points.md)).

## What it changed in the wiki

- New: [Entry points and tree-shaking](../concepts/entry-points-and-tree-shaking.md) (concept) and
  [Secondary entry points by docs group](../decisions/secondary-entry-points.md) (decision, deferred)
- [Overview](../overview.md): the decisions list
