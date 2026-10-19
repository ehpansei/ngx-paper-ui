---
type: overview
created: 2026-10-19
updated: 2026-10-19
sources:
  - sources/ngx-paper-ui-extraction.md
  - sources/entry-points.md
  - sources/sync-handoff.md
  - sources/2026-10-05-0221-session.md
tags: [overview]
---

# Overview

Paper UI is an Angular component library with an "ink on paper" look, published as `ngx-paper-ui`. For what it
contains and how to use it, see the [package README](../libs/ui/README.md). This page is the synthesis: where the
library came from, the decisions that shaped it, and the questions that are still open. It's rewritten as sources are
ingested.

## Where it came from

| When | What |
|---|---|
| 2026-07-01 | The `vault` workspace starts. Paper UI grows inside it as `libs/ui`, imported as `@vault/lib/ui`. |
| 2026-08-19 | Vault commit `98897b2`: input components, dropdown, the config-based form. Much later work stays uncommitted for weeks. |
| 2026-09-29 | Vault's last design-system sync: version `1790709100-b668` (28 cards), recorded at `98897b2`. |
| 2026-09-30 | Vault commit `d3f6df6` commits that work (components, documentation pages). The [extraction plan](sources/ngx-paper-ui-extraction.md) has the library leave vault as its own npm package. |
| 2026-10-02 | The package is renamed from `ng-paper-ui` to `ngx-paper-ui`. |
| 2026-10-05 | The extraction turns out to be incomplete (missing root config and the whole sync tool), so it's repaired from vault ([handoff](sources/sync-handoff.md)). This repo's first commit is `a90b779`, and Tailwind is already gone. The first sync from here runs at 01:47 UTC and records version `1791164872-d9fc`. Later that night, the missing `local-build-publish` script is written ([session overview](sources/2026-10-05-0221-session.md)). |

The extraction was more than a copy. It made the library publishable: a
[partial-compilation build](decisions/partial-compilation-build.md),
[plain CSS with no Tailwind](decisions/plain-css-distribution.md), and
[icons that need no app setup](decisions/inline-icon-sprite.md). It also moved
[ownership of the design-system sync](decisions/sync-only-from-this-repo.md) here.

## Decisions that shaped it

- [Paper UI is its own repo and npm package, `ngx-paper-ui`](decisions/standalone-npm-package.md)
- [Publishable build: ng-packagr with partial compilation](decisions/partial-compilation-build.md)
- [Styles ship as plain CSS, with no Tailwind dependency](decisions/plain-css-distribution.md). The guiding principle
  is to keep external dependencies to a minimum.
- [Icons work without app configuration](decisions/inline-icon-sprite.md)
- [The design-system sync runs only from this repo](decisions/sync-only-from-this-repo.md)
- [The repo is the sync's default source of truth, and every sync is steered by hand](decisions/repo-is-sync-source-of-truth.md)
- **Deferred:** [Secondary entry points by docs group](decisions/secondary-entry-points.md). It was decided on
  2026-10-01 and has been put aside. There's one entry point today, and bundle size doesn't depend on it
  ([why](concepts/entry-points-and-tree-shaking.md)).

## Open questions

- **Release config:** `nx.json` lacks the `release` block the extraction plan specified (project `ui`, changelog,
  `v{version}` tag) and still has vault's leftover `preVersionCommand`. The root `CLAUDE.md` describes `nx release`
  as if that config existed. Restore it, or update `CLAUDE.md`?
- **Design-system bundle icons:** the generated `mount.ts` still puts the sprite in by hand instead of calling
  `provideInlineIconSprite()`. See the [consequences](decisions/inline-icon-sprite.md#consequences).
- **Tailwind consumers:** should the README show how to map Paper UI's tokens into a Tailwind theme?
- **Uncommitted work since 2026-10-05:** everything done after the first commit is still only in the working tree
  as of 2026-10-19:
  - the sync's recorded state: `libs/ui/design-system/sync-state.json` and the `base/` changes. The sync deliberately
    [doesn't commit](decisions/repo-is-sync-source-of-truth.md), so the agreed base lives only on this machine.
  - `tools/design-system-sync/README.md` and `tools/scripts/local-build-publish.mjs`, both untracked
  - edits to `tools/design-system-sync/` (`cli.mjs`, `lib/mapping.mjs`, `lib/sync.mjs`), the root `project.json`
    and `CLAUDE.md`
  
  See the [session overview](sources/2026-10-05-0221-session.md).
- **Not shipped yet:** as of 2026-10-19 there's no git remote and no npm release. The extraction plan's
  local-registry install proof hasn't been confirmed by any source yet.
