---
name: wiki
description: Maintain the ngx-paper-ui wiki in wiki/ (decisions, history, research, cross-cutting synthesis). Use when the user runs /wiki (status, ingest, query, retire, lint), asks to ingest, clip or file something into the wiki, asks to retire or remove an ingested session record or root doc, asks a question about the project's history or past decisions, or asks to lint or health-check the wiki.
---

# Maintain the wiki

Read [`wiki/CLAUDE.md`](../../../wiki/CLAUDE.md) first: it has the layout, page templates, link rules, log format and
public-content rules. Run every command from the repo root.

The user reads the wiki, and Claude writes it. The user chooses the sources and steers what gets emphasised.
Claude does the summarising, the cross-linking and the bookkeeping.

`/wiki` takes an operation: `status`, `ingest <path|url>`, `query <question>`, `retire <path>` or `lint`. With no
argument, run `status`.

## status

Report these four things. Keep it short:

1. **Not ingested yet:** `bash .claude/skills/wiki/pending.sh` lists the session records in `llm-status/`, `plans/`
   and the repo root (except `README.md` and `CLAUDE.md`) that have no `source:` line in `wiki/log.md`. The
   SessionStart hook runs the same script.

2. **Changed since ingest:** an ingested record whose snapshot differs from the file
   (`cmp -s "$f" "wiki/raw/sessions/$f"`). If the snapshot is missing, for example after a fresh clone, say so
   instead of reporting a change. Skip records with a `retire` entry in `log.md`: their file is gone on purpose.
3. **Clippings waiting:** files in `wiki/raw/external/` with no `source:` line for their URL or path.
4. **Ingests since the last lint:** count the `ingest` headings after the last `lint` heading in `log.md`. At 5 or
   more, suggest `/wiki lint`.

## ingest

One source per run. Don't batch, even when several are pending: the user wants to stay involved in each one.

1. **Snapshot the source into `wiki/raw/`:**
   - Repo file: `mkdir -p "wiki/raw/sessions/$(dirname "$f")" && cp "$f" "wiki/raw/sessions/$f"`. A record that
     changed since its last ingest overwrites the old snapshot, and this is the one case where that's allowed.
   - URL: WebFetch it, then write `wiki/raw/external/YYYY-MM-DD-<slug>.md` with `url:` and `fetched:` frontmatter and
     the article as markdown.
   - A file already in `wiki/raw/external/` (from the Web Clipper): use it as it is.
2. **Read** the whole source, then `index.md`, `overview.md`, and every page the source touches. Also open the
   READMEs and `CLAUDE.md` sections it relates to, so you link to them instead of restating them.
3. **Stop and present it to the user**, then wait for their reply:
   - the key takeaways (3 to 7 bullets);
   - the pages you plan to create or update, and why;
   - anything that contradicts an existing page, naming both sources;
   - anything you'll link to rather than copy, because a README or `CLAUDE.md` already covers it;
   - anything in the source that must stay out of the public pages (secrets, env details, absolute paths).
4. **Write**, following the user's steer:
   - `sources/<slug>.md`;
   - new or updated `concepts/`, `decisions/` and `comparisons/` pages, with `updated:` bumped and `sources:`
     extended;
   - `overview.md`, if the synthesis moved;
   - `index.md`;
   - one `ingest` entry appended to `log.md`.
5. **Check** the links with `bash .claude/skills/wiki/check-links.sh`, then run the public-content grep:
   `grep -rnE "/Users/|ANTHROPIC_|@gmail" wiki --exclude-dir=raw --exclude=CLAUDE.md`. Both must come back clean.
6. **Report** the pages you touched in one or two lines. If 5 or more ingests have happened since the last lint,
   suggest `/wiki lint`.

## query

This covers `/wiki query …` and plain questions about the project's history, past decisions or research.

1. Read `index.md`, then the relevant pages. If the wiki can't answer, say so, check the repo or the raw sources,
   and say which you used.
2. Answer with relative-link citations to the pages (and through them to the sources).
3. If the answer is substantial (a comparison, an analysis, a connection between pages), offer in one line to file
   it, for example: "File this as `comparisons/<slug>.md`?" If the user agrees, write the page, link it from a
   related page and `index.md`, and append a `query` entry to `log.md`. Don't file anything without asking.

## retire

This deletes an ingested repo file (a root doc or a session record) once nothing in it is left uncovered. Retire one
source per run, like ingests.

1. **Check it was ingested:** `grep -F "source: <path>" wiki/log.md` finds an `ingest` entry, and its snapshot
   exists at `wiki/raw/sessions/<path>`. If either is missing, stop: ingest it first.
2. **Find the leftovers.** Read the whole source, then its source page and the pages it touched, both `CLAUDE.md`
   files, the READMEs and the skills it relates to. List what in it exists nowhere else. Skip what's obsolete
   (superseded by the code or a later source).
3. **Stop and present the leftovers** to the user, each with a proposed home (a wiki page, a `CLAUDE.md`, a README, a
   skill, or drop), then wait for their reply. What's dropped stays in git and in the snapshot.
4. **Write**, following the user's steer:
   - the leftovers, in their homes;
   - the source page: `retired:` and `updated:` in the frontmatter, the repo link replaced by the last commit that had
     the file (`git log -1 --format=%h -- <path>`, read with `git show <sha>:<path>`), and the retirement under
     **What it changed in the wiki** (where each leftover went);
   - every other link to the file: `grep -rn "<path>" wiki --exclude-dir=raw`;
   - `index.md`: append "; retired <date>" to the source's line.
5. **Delete** the file with `git rm <path>`, and append one `retire` entry to `log.md`, with the same `source:` line as
   the ingest and the pages touched (name changes outside the wiki too).
6. **Check** with `check-links.sh` and the public-content grep from ingest step 5. Both must come back clean. Report
   in one or two lines.

## lint

Check the whole wiki and report what you find, grouped by kind. Don't fix anything until the user has picked what to
fix.

- **Broken links:** run `bash .claude/skills/wiki/check-links.sh`. It prints `page -> target` for every relative
  `.md` link that doesn't resolve, which includes links to repo files that were moved or renamed. It skips
  `wiki/CLAUDE.md` on purpose: that file's example links are written as if from a page inside a subfolder, so they
  would show up as broken.
- **Orphans:** pages that nothing links to except `index.md`.
- **Index drift:** pages missing from `index.md`, or index lines that point at pages that no longer exist.
- **Contradictions and stale claims:** open `[!WARNING]` callouts; claims that a newer source or the current code
  overrides; `active` decisions that the repo no longer follows.
- **Gaps:** concepts mentioned on several pages that have no page of their own, and missing cross-links between
  related pages.
- **Duplication:** passages that restate a README or `CLAUDE.md` instead of linking to it.
- **Public content:** the grep from ingest step 5.
- **Next steps:** questions worth asking and sources worth finding next.

After the fixes, append a `lint` entry to `log.md`. That resets the count of ingests since the last lint.
