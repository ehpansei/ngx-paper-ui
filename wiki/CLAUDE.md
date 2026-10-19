# CLAUDE.md — the ngx-paper-ui wiki

This folder is a wiki that Claude writes and maintains, and the user reads, usually in Obsidian (the vault is rooted
at `wiki/`). It grows one source at a time: each new source is read once, and what it teaches is folded into the
pages, so the knowledge compounds instead of being re-derived on every question. The workflows (ingest, query,
lint, status) are in the [`/wiki` skill](../.claude/skills/wiki/SKILL.md). This file is the schema: what the
pages look like and the rules they follow.

## What belongs here, and what doesn't

The wiki holds what the code can't: **decisions and why they were made, history, research, and synthesis that cuts
across the repo.**

How the code works stays where it is, and the wiki **links to it, never copies it**:

- The component `README.md`s and `libs/ui/docs/brand-book.md` are synced both ways with the design-system artifact
  (`tools/design-system-sync/lib/mapping.mjs`). A copy here would drift from both.
- `CLAUDE.md`, `libs/ui/CLAUDE.md` and folder READMEs such as `tools/design-system-sync/README.md` are the rules and
  the mental models.

When a page needs one of these, link to it and add at most one sentence of context. There are no pages for
individual components.

## Layout

```
wiki/
  CLAUDE.md      this schema
  index.md       catalog of every page, by category
  log.md         append-only record of ingests, filed queries and lint passes
  overview.md    the evolving synthesis: what Paper UI is, where it came from, open questions
  sources/       one summary page per ingested raw source
  concepts/      cross-cutting ideas (entry points and tree-shaking, the sync model, theming …)
  decisions/     one page per decision: context, decision, why, rejected alternatives, consequences
  comparisons/   research against other libraries or approaches, and filed query answers
  .obsidian/     only app.json is committed (link settings); the rest is gitignored
  raw/           GITIGNORED. The immutable sources:
    sessions/    snapshots of session records, at their repo-relative path (sessions/llm-status/2026-10-05-0221.md)
    external/    fetched or clipped articles, YYYY-MM-DD-<slug>.md, frontmatter url + fetched
    assets/      images (Obsidian's attachment folder)
```

`raw/` is private and stays on this machine; everything else is committed to a public repo. Never edit a file in
`raw/` after it's written. A changed session record is ingested again as a new snapshot.

## Pages

File names are kebab-case: `concepts/entry-points.md`, `decisions/repo-is-sync-source-of-truth.md`. A source page is
named after its source: `sources/ngx-paper-ui-extraction.md`, `sources/2026-10-05-0221-session.md`.

Every page starts with frontmatter (Obsidian Bases can filter on any of it):

```yaml
---
type: concept            # source | concept | decision | comparison | overview
created: 2026-10-19
updated: 2026-10-19
sources:                 # the source pages this page draws on
  - ../sources/entry-points.md
tags: [build, packaging]
---
```

The `# Title` comes right after the frontmatter. Templates by type:

- **source**: a line saying what it is (kind, date, raw path), then **Key takeaways**, then **What it changed in the
  wiki** (links to the pages it created or updated). Add `origin:` to the frontmatter, set to the repo path or URL.
  When the source is retired (deleted from the repo, see `log.md` below), add `retired:` with the date, and replace
  the link to the repo file with the last commit that had it: "read it with `git show <sha>:<path>`".
- **concept**: what it is, how it plays out in this repo (with links to the code and READMEs), the trade-offs, and
  related pages.
- **decision**: **Context**, **Decision**, **Why**, **Rejected alternatives**, **Consequences**. Add `date:` (when
  it was decided) and `status: active | deferred | superseded` to the frontmatter. `deferred` means it was decided
  but put aside, so it isn't built and isn't flagged as drift. A superseded decision links to the page that replaced
  it.
- **comparison**: the question, a table, and a conclusion that says what it means for Paper UI.
- **overview**: just one page, `overview.md`, rewritten whenever the synthesis moves.

## Links

- Use relative markdown links only, never `[[wikilinks]]`. That way they work in Obsidian, on GitHub and in
  WebStorm: `[Entry points](../concepts/entry-points.md)`.
- Links to repo files are relative too: `[Button](../../libs/ui/src/components/button/README.md)`. They resolve on
  GitHub and in WebStorm, but Obsidian shows them as unresolved because they're outside the vault. We accept that.
- Cite a claim by linking its source page (`../sources/…`), never `raw/`. Raw isn't on GitHub.
- Every new page gets at least one inbound link besides `index.md`, from a related page or `overview.md`.

## Contradictions and stale claims

When a new source disagrees with a page, don't overwrite the old claim silently. Mark it with a callout that names
both sources, and resolve it with the user:

```markdown
> [!WARNING] Contradiction
> [extraction plan](../sources/ngx-paper-ui-extraction.md) says X; [2026-10-05 session](../sources/2026-10-05-0221-session.md) says Y.
```

After it's resolved, keep the newer claim and drop the callout. If the old claim matters as history, keep a line
saying when it changed.

## `index.md` and `log.md`

- `index.md` has one line per page, under its category heading:
  `- [Title](concepts/entry-points.md) — one-line summary (2 sources)`. Update it on every write.
- `log.md` is append-only, and new entries go at the bottom. The heading prefix is fixed, so
  `grep "^## \[" wiki/log.md` lists the timeline:

  ```markdown
  ## [2026-10-19] ingest | Entry points: why split, and what Angular does
  source: entry-points.md
  pages: sources/entry-points.md (new), concepts/entry-points.md (new), index.md, overview.md
  ```

  The kinds are `ingest`, `query` (only for a filed answer), `retire` and `lint`. A `retire` entry records a source
  deleted from the repo once everything in it lives somewhere else (the wiki, a `CLAUDE.md`, a README or a skill);
  its `source:` line repeats the ingest's. The `source:` line holds the repo-relative path or the URL, exactly as
  written. The startup hook and `/wiki status` match it with `grep -F` to decide what's already ingested.

## Public content

These pages are published with the repo. Never write secrets, token or env-var names or values, auth or machine
details, absolute home paths (`/Users/…`) or email addresses. Use repo-relative paths. Summarise external articles
and quote at most a sentence or two of them. The full text stays in `raw/`.
