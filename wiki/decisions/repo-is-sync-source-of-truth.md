---
type: decision
created: 2026-10-19
updated: 2026-10-19
date: 2026-10-05
status: active
sources:
  - ../sources/sync-handoff.md
  - ../sources/2026-10-05-0221-session.md
tags: [design-system, sync, workflow]
---

# The repo is the sync's default source of truth, and every sync is steered by hand

## Context

The design-system sync is two-way. The repo and the claude.ai design system can both change the same files, and the
sync tool classifies each difference as push, pull, merge or conflict. The tool can decide what changed, but not
which side *should* win. How it classifies is explained in
[`tools/design-system-sync/README.md`](../../tools/design-system-sync/README.md).

## Decision

For every sync:
- **The repo is the default source of truth.** This is where Paper UI is iterated on most.
- **The direction is asked every time:** repo → design system, design system → repo, or both.
- **Each item is settled one example at a time.** Every conflict, removal and token conflict is shown to the user
  before anything is applied or published. Nothing is adopted or discarded in bulk.
- **Removing is never the default.**
- **The sync never commits its own changes** in the repo. The user commits them.

## Why

- The user wants explicit control over what crosses between the repo and claude design, item by item, even though
  the repo usually wins.
- Designs live in claude design, not in a git remote. "Pushing" means publishing to the artifact, so a careless push
  overwrites design work there.

## Rejected alternatives

- **Repo always wins:** design edits made in claude design would be lost silently.
- **Auto-apply whatever isn't a conflict, and auto-commit:** too little control over a shared artifact.

## Consequences

- Every sync is interactive, and the [`sync-design-system` skill](../../.claude/skills/sync-design-system/SKILL.md)
  stops for a plan and a decision on each item.
- Since the sync doesn't commit, its recorded state can be left uncommitted. That happened after the 2026-10-05 sync
  (see the [overview](../overview.md#open-questions)).
- Related: [The design-system sync runs only from this repo](sync-only-from-this-repo.md).
