---
type: source
created: 2026-10-19
updated: 2026-10-19
origin: sync-handoff.md
retired: 2026-10-19
sources: []
tags: [design-system, sync, history, tooling]
---

# Design-system sync handoff (2026-10-05)

This is a handoff written on 2026-10-05, when the first design-system sync from this repo was blocked. It lists
what went wrong on the way, the sync decisions to carry over, and the steps to resume. It was committed at the repo root in
`a90b779` and retired on 2026-10-19: read it with `git show a90b779:sync-handoff.md`. Snapshot:
`raw/sessions/sync-handoff.md`. Its procedure section copies
the [`sync-design-system` skill](../../.claude/skills/sync-design-system/SKILL.md), so that part isn't summarised
here.

## Key takeaways

- **The extraction arrived incomplete.** Each missing file broke something different:
  - without `nx.json` and `tsconfig.base.json`, the docs app wouldn't serve;
  - `tools/design-system-sync/`, the root `project.json` and `vitest.workspace.ts` were missing;
  - the sync tool still pointed at vault's `tailwind.css`.
  
  All of them were restored from vault or fixed, and the preflight went green.
- **The Artifact tool needs Anthropic's backend.** It only works in a session running on Anthropic's backend with a
  claude.ai login. A session routed to another model provider through environment variables can't use it, and
  `/login` alone doesn't fix that. Since only the Artifact tool can read or publish the design system, this ties
  every sync to that kind of session.
- **How every sync is steered:** the repo is the default source of truth, the direction is asked each time, items
  are settled one at a time, removal is never the default, and the sync doesn't commit. See the
  [decision](../decisions/repo-is-sync-source-of-truth.md).
- **Recording needs a commit.** `record` stamps `git rev-parse HEAD`, so the repo needed its first commit before
  the first sync could be recorded. The rule is in [`CLAUDE.md`](../../CLAUDE.md).

## How it held up (checked against the repo on 2026-10-19)

- **The blocker was cleared.** `libs/ui/design-system/sync-state.json` records a sync on 2026-10-05 at 01:47 UTC:
  design-system version `1791164872-d9fc`, at commit `a90b779`, which is the initial commit the handoff advised.
- **The recorded state was never committed.** `sync-state.json` and the `base/` changes are still in the working
  tree. This is an open question in the [overview](../overview.md#open-questions).
- **The old vault commit, explained.** The committed base still says `commit: 98897b2`, vault's last sync on
  2026-09-29. That's where the [extraction plan](ngx-paper-ui-extraction.md) got that hash.

## Lessons

- **Check that an extraction is complete.** Copying a list of paths is only as good as the list. Every root config
  file that was left off surfaced later as a different, confusing error.
- **When something is dropped, check the tools that refer to it.** The sync tool kept vault's stylesheet name after
  Tailwind was removed ([plain-CSS distribution](../decisions/plain-css-distribution.md#consequences)).
- **Start syncs in a session on Anthropic's backend.** This is now a gotcha in [`CLAUDE.md`](../../CLAUDE.md).

## What it changed in the wiki

- New: [The repo is the sync's default source of truth](../decisions/repo-is-sync-source-of-truth.md)
- Updated: [Sync only from this repo](../decisions/sync-only-from-this-repo.md) (the first sync from here),
  [Plain-CSS distribution](../decisions/plain-css-distribution.md) (the leftover `TAILWIND_ENTRY`), and the
  [Overview](../overview.md) (timeline, open questions)
- Outside the wiki: a gotcha in the root `CLAUDE.md` about the Artifact tool and the backend
- **Retired 2026-10-19.** Nothing in it was left uncovered:
  - the procedure is the [`sync-design-system` skill](../../.claude/skills/sync-design-system/SKILL.md);
  - the rules are the [decision page](../decisions/repo-is-sync-source-of-truth.md);
  - the commit requirement is in the [sync tool's README](../../tools/design-system-sync/README.md).

  The details that were dropped (the error messages from the broken extraction, the test counts at handoff) stay in
  git and in the snapshot.
