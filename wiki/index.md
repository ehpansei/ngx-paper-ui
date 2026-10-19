---
type: index
---

# Index

Every page in the wiki, one line each: `[Title](path) — summary (n sources)`. Start with the
[overview](overview.md). The page rules are in [CLAUDE.md](CLAUDE.md), and the timeline is in [log.md](log.md).

## Overview

- [Overview](overview.md) — what Paper UI is, where it came from, open questions (4 sources)

## Sources

- [Extraction plan: Paper UI out of vault, onto npm](sources/ngx-paper-ui-extraction.md) — the plan that moved the library out of vault and made it publishable; how it held up
- [Entry points: why split, and what Angular does](sources/entry-points.md) — the 2026-10-01 explainer on secondary entry points and tree-shaking
- [Design-system sync handoff (2026-10-05)](sources/sync-handoff.md) — the incomplete extraction, the backend blocker, the sync rules; the sync then ran
- [Session overview: the repair session (2026-10-05 02:21)](sources/2026-10-05-0221-session.md) — closing notes of the repair session; mostly overlaps the handoff

## Concepts

- [Entry points and tree-shaking](concepts/entry-points-and-tree-shaking.md) — why splitting doesn't change bundle size; where and why Angular splits (1 source)

## Decisions

- [Paper UI is its own repo and npm package, `ngx-paper-ui`](decisions/standalone-npm-package.md) — why extract, why the `ngx-` name (1 source)
- [Publishable build: ng-packagr with partial compilation](decisions/partial-compilation-build.md) — `@nx/angular:package`, partial Ivy, no publish guard (1 source)
- [Styles ship as plain CSS, with no Tailwind dependency](decisions/plain-css-distribution.md) — `paper-ui.css`; the minimum-dependencies principle (2 sources)
- [Icons work without app configuration](decisions/inline-icon-sprite.md) — `provideInlineIconSprite()`; asset route kept (1 source)
- [The design-system sync runs only from this repo](decisions/sync-only-from-this-repo.md) — handover from vault at `1790709100-b668`; first sync from here 2026-10-05 (2 sources)
- [The repo is the sync's default source of truth](decisions/repo-is-sync-source-of-truth.md) — direction asked each sync, items settled one by one, no auto-commit (2 sources)
- [Secondary entry points by docs group](decisions/secondary-entry-points.md) — decided 2026-10-01, **deferred**; one entry point today (1 source)

## Comparisons
