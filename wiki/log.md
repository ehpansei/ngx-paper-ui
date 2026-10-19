---
type: log
---

# Log

Append-only, newest at the bottom. Each entry has a `## [YYYY-MM-DD] ingest|query|lint | Title` heading, then a
`source:` line (ingests only) and a `pages:` line. `grep "^## \[" wiki/log.md | tail -5` lists the latest entries.

## [2026-10-19] ingest | Extraction plan: Paper UI out of vault, onto npm
source: ngx-paper-ui-extraction.md
pages: sources/ngx-paper-ui-extraction.md (new), decisions/standalone-npm-package.md (new), decisions/partial-compilation-build.md (new), decisions/plain-css-distribution.md (new), decisions/inline-icon-sprite.md (new), decisions/sync-only-from-this-repo.md (new), overview.md, index.md

## [2026-10-19] ingest | Entry points: why split, and what Angular does
source: entry-points.md
pages: sources/entry-points.md (new), concepts/entry-points-and-tree-shaking.md (new), decisions/secondary-entry-points.md (new, deferred), overview.md, index.md, CLAUDE.md (decision status `deferred`)

## [2026-10-19] ingest | Design-system sync handoff (2026-10-05)
source: sync-handoff.md
pages: sources/sync-handoff.md (new), decisions/repo-is-sync-source-of-truth.md (new), decisions/sync-only-from-this-repo.md, decisions/plain-css-distribution.md, overview.md, index.md; outside the wiki: root CLAUDE.md gotcha (Artifact tool needs Anthropic's backend)

## [2026-10-19] ingest | Session overview: the repair session (2026-10-05 02:21)
source: llm-status/2026-10-05-0221.md
pages: sources/2026-10-05-0221-session.md (new), decisions/repo-is-sync-source-of-truth.md, overview.md, index.md

## [2026-10-19] retire | Extraction plan: Paper UI out of vault, onto npm
source: ngx-paper-ui-extraction.md
pages: sources/ngx-paper-ui-extraction.md, overview.md, index.md, CLAUDE.md (log kind `retire`, retired source pages); outside the wiki: .claude/skills/install-test/ (new, from §4), the docs app's `package` configuration, root CLAUDE.md (Artifact `read` gotcha, `/install-test`), the wiki skill's `retire` operation

## [2026-10-19] retire | Entry points: why split, and what Angular does
source: entry-points.md
pages: sources/entry-points.md, index.md; nothing moved outside the wiki (the leftovers were dropped)

## [2026-10-19] retire | Design-system sync handoff (2026-10-05)
source: sync-handoff.md
pages: sources/sync-handoff.md, index.md; nothing moved outside the wiki (the leftovers were dropped)
