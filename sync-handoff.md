# Design-system sync — handoff

**Goal:** push this repo's Paper UI changes to the claude.ai design system and bring back any
design-system edits (two-way sync), so the designs live in **claude design**, not in a git remote.

**Design system:** https://claude.ai/artifact/YamgBYyuomodpWN4SFgSTB (a "Design System" artifact,
content under `project/`).

---

## Journey so far (the difficulties, in order)

This repo is a partial extraction from the `vault` workspace (vault@d3f6df6). It arrived missing several
root files, and each missing piece surfaced as a different failure. What we hit, in order:

1. **Demo app wouldn't serve.** `npm run docs` died with
   `Unable to read angular.json / Cannot read properties of null (reading 'cli')`. Root cause: missing
   `nx.json` and `tsconfig.base.json`. Recreated both from vault — `nx.json` with `defaultBase: "main"`
   (vault had `"master"`), `tsconfig.base.json` with the path alias `ngx-paper-ui` → `./libs/ui/src/index.ts`
   (vault had `@vault/lib/ui`). Serve then reached the dev server cleanly (HTTP 200).
2. **Missing tooling files.** `tools/design-system-sync/` (the sync engine), root `project.json`
   (the `local-registry`/Verdaccio target), and `vitest.workspace.ts` were also absent. Restored all three
   from vault.
3. **Sync tooling pointed at the wrong stylesheet.** `tools/design-system-sync/lib/paths.mjs` exported
   `TAILWIND_ENTRY = libs/ui/src/styles/tailwind.css` (vault's name), but this repo's entry is
   `styles/index.css`. Symptom: two spec failures — `Cannot read properties of null (reading 'matchAll')`
   in `cssParts()`. Fixed by renaming to `STYLES_ENTRY` pointing at `index.css`. After that, 46/46 sync
   tests pass and preflight is green.
4. **Sidebar toggle.** The `main-view` header ☰ button only *opened* the sidebar; changed it to toggle
   (`sidebarOpen.set(!sidebarOpen())`) with dynamic `aria-expanded`/`aria-label`, and updated the docs
   wording ("opens it" → "toggles it"). Verified with `nx lint ui` + `nx build ui`.
5. **The blocker we're on now.** The `Artifact` tool (which reads/publishes claude design) refuses every
   call because this session is routed through DeepSeek — see "Why I paused" below. `/login` alone did not
   fix it: the env vars still override it. This is the one thing left to clear before the sync runs.

Net: all the repo-side work is done and green. The only remaining problem is the DeepSeek → claude.ai
session switch, plus the zero-commits caveat at the bottom.

---

## Why I paused

The sync is ready to run, but this session was routed through **DeepSeek** via three env vars that
override the claude.ai login, so the `Artifact` tool refuses every call:

- `ANTHROPIC_AUTH_TOKEN`
- `ANTHROPIC_BASE_URL`
- `ANTHROPIC_MODEL` (= `deepseek-v4-pro`)

The `Artifact` tool (and therefore claude design) only works against the **real Anthropic backend**
with a claude.ai login. DeepSeek routing and claude.ai Artifacts are mutually exclusive in one session.

## To continue (in a fresh terminal/session)

```fish
set -e ANTHROPIC_AUTH_TOKEN
set -e ANTHROPIC_BASE_URL
set -e ANTHROPIC_MODEL
claude
```

Then run `/login` and select **"Claude account with subscription"**. (These vars are *not* in
`~/.config/fish/config.fish` — that line is commented out — they were exported in the launching shell,
so a fresh shell won't have them unless something re-exports them.)

Once in a claude.ai-authenticated session, open this file and resume at **"Procedure"** below.

---

## Agreed decisions (carry these over)

- **Direction:** **both** — repo ⇄ design system (settled for this sync).
- **Source of truth:** this repo is the default source of truth. On future syncs, ask the direction
  (repo → DS / DS → repo / both) and resolve changes **example-by-example** (see memory
  `sync-source-of-truth`).
- **Skip commit:** the sync must **not** auto-commit its own repo-side changes.
- **Per-example:** present every conflict / `remove?` / `remove-local?` / token conflict to the user
  before applying or publishing. Removing is never the default.

## Current state (as of handoff)

- Preflight is green: `npx nx run-many -t lint test -p ui ui-demo-app design-system-sync`
  (ui 37 tests, ui-demo-app 3 tests, design-system-sync 46 tests).
- Everything needed for the sync already works locally. The only blocker is the login above.
- Repo has **zero commits** (see the git caveat below).

## Procedure (from `.claude/skills/sync-design-system/SKILL.md`)

1. **Preflight** (confirm still green): `npx nx run-many -t lint test -p ui ui-demo-app design-system-sync`
2. **Fetch the design system** into `dist/ds-sync/remote/`:
   - `rm -rf dist/ds-sync/remote`
   - `Artifact read` `path: "project/design-system.json"` → `out_dir: "<repo>/dist/ds-sync/remote"`
     - confirm `layout === "files"` and a `createdOnFiles`/`convertedFrom` marker; note `lastChange`.
   - `Artifact list` `scope: "files"`, then `read` every listed `project/…` path (except index) in
     batches, same `out_dir`.
   - `node tools/design-system-sync/cli.mjs fetch-list` → for each `readIconIds`, `Artifact read`
     `path: <id>` (one per icon, can parallelise), then
     `node tools/design-system-sync/cli.mjs ingest-icons <folder>`.
3. **Stage + compare:**
   - `npx nx run design-system-sync:check` — must print "all mounted, no errors".
   - `node tools/design-system-sync/cli.mjs diff` (add `--first` only if
     `libs/ui/design-system/sync-state.json` doesn't exist).
4. **Show the plan** — summarise PUSH / PULL / MERGE counts and every item needing a decision
   (diffs read "design system → repo"). Write answers to `dist/ds-sync/decisions.json`:
   `{ "<path>": "remote"|"local"|"adopt"|"discard"|"remove"|"keep", "tokens.json": { "color/danger": "remote" } }`.
5. **Apply:** `node tools/design-system-sync/cli.mjs apply`.
   - If anything was pulled, re-run step 1's lint+test, re-run `design-system-sync:check`, then `diff`
     and `apply` again so `dist/ds-sync/out/` holds exactly what's still different.
6. **Publish** (only after the user has seen the plan):
   1. Uploads first (each path in `uploads` via `Artifact publish` `asset: true`).
   2. Re-read `project/design-system.json`; if version changed, go back to step 2.
   3. `node tools/design-system-sync/cli.mjs index --by "<name>" --note "<n> pushed, <m> pulled"`.
   4. ONE `Artifact publish` with `root`, `file_path`, and `files` from
      `node tools/design-system-sync/cli.mjs files-arg`. Never pass `type_url`/`capabilities`/`contract`.
7. **Record:** `node tools/design-system-sync/cli.mjs record --version <version>` — then remind to
   commit (including `libs/ui/design-system/`), and offer `Artifact open`.

## Git caveat (important)

`record` runs `git rev-parse HEAD`, but this repo has **zero commits**, so it will fail until a commit
exists. The user chose "Skip commit" for the sync itself, but needs **at least one local commit** (on
`main`, no push) before the record step — e.g. `chore: initial commit of ngx-paper-ui extraction`.

---

See `.claude/skills/sync-design-system/SKILL.md` for the full rules (repo-owned vs two-way vs
DS-only files, change-detection table, publish gotchas).
