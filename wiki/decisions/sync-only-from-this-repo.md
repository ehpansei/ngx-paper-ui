---
type: decision
created: 2026-10-19
updated: 2026-10-19
date: 2026-09-30
status: active
sources:
  - ../sources/ngx-paper-ui-extraction.md
  - ../sources/sync-handoff.md
tags: [design-system, sync, history]
---

# The design-system sync runs only from this repo

## Context

The Paper UI design-system artifact on claude.ai is kept in step with the library by a three-way sync. The last
agreed state, which is the merge base, is committed in `tools/design-system-sync/state/` (`sync-state.json` plus
`base/`). Until the extraction, vault ran the sync. Its state was copied here at design-system version `1790709100-b668`:
28 cards, all in sync.

## Decision

This repo took over the sync. From then on, `/sync-design-system` runs **only from here, never from vault**.

## Why

Each repo keeps its own base. If two repos synced one artifact, each would see the other's pushes as edits made on
the artifact, and report them as remote edits or conflicts.

## Rejected alternatives

- **Sync from both:** the bases would diverge, and every sync would turn into a run of false conflicts.

## Consequences

- Vault's copy of the sync tool must not be run against the artifact again.
- The first sync from this repo ran on 2026-10-05, recorded as design-system version `1791164872-d9fc` at commit
  `a90b779`. It was a day late: the extraction had left out the sync tool, and the first session couldn't reach the
  Artifact tool ([handoff](../sources/sync-handoff.md)).
- How the sync works (ownership, merge, data flow) is in
  [`tools/design-system-sync/README.md`](../../tools/design-system-sync/README.md). The procedure is the
  [`sync-design-system` skill](../../.claude/skills/sync-design-system/SKILL.md). The rule is also in
  [`CLAUDE.md`](../../CLAUDE.md).
- Related: [Standalone npm package](standalone-npm-package.md).
