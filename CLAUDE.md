# CLAUDE.md

## What this repo is

**Paper UI** for Angular, published to npm as **`ngx-paper-ui`**. It's a component library with an "ink on paper"
look: cream surfaces, sepia ink, one configurable `primary` colour, and Inter throughout. It implements the Paper UI
design system, a claude.ai "Design System" artifact (https://claude.ai/artifact/YamgBYyuomodpWN4SFgSTB), and keeps
it in sync both ways.

Extracted from the `vault` workspace (vault@d3f6df6, 2026-09-30). **All library rules (Angular patterns, naming,
styles, tokens, theming, icons, visual and content rules, adding a component) are in
[`libs/ui/CLAUDE.md`](libs/ui/CLAUDE.md). Read it before changing the library.**

## Projects (Nx 23)

| Project | Path | What |
|---|---|---|
| `ui` | `libs/ui` | The library. Source alias and package name: `ngx-paper-ui`. Its `package.json` is what gets published. |
| `ui-demo-app` | `apps/ui-demo-app` | The docs site: a `lib-main-view` shell, one lazy route per component (`lib-<kebab>`) |
| `ui-demo-app-e2e` | `apps/ui-demo-app-e2e` | Playwright suite (27 tests) against the docs site on `:4200` |
| `design-system-sync` | `tools/design-system-sync` | Plain Node ESM tool behind `/sync-design-system` |
| `ngx-paper-ui-workspace` | `/` (root `project.json`) | The `local-registry` target (Verdaccio on `:4873`, config in `.verdaccio/`) |

## Commands

```sh
npm run build                       # nx build ui → dist/libs/ui (ng-packagr, partial compilation)
npm test                            # nx run-many -t test
npm run docs                        # nx serve ui-demo-app on :4200
npm run e2e                         # nx e2e ui-demo-app-e2e -- --project=chromium

nx run ui:icons | ui:tokens | ui:styles   # regenerate generated sources (build runs all three)
nx run-many -t lint test build -p ui ui-demo-app ui-demo-app-e2e design-system-sync
nx run design-system-sync:check     # build the design-system bundle, load all 28 cards headless
nx run ngx-paper-ui-workspace:local-registry   # Verdaccio on :4873, for install tests; storage (tmp/local-registry/storage) survives restarts
npm run local-build-publish         # build ui and publish it to Verdaccio (must be running), replacing the same version
```

**`nx test` for Vitest projects prints no counts.** To see results, run
`npx vitest run --config libs/ui/vite.config.mts` or `--config tools/design-system-sync/vitest.config.mts`. The
docs app uses `@angular/build:unit-test`, so run `nx test ui-demo-app --skip-nx-cache`.

## The published package

- `dist/libs/ui` contains `fesm2022/ngx-paper-ui.mjs`, `types/ngx-paper-ui.d.ts`, `paper-ui.css` (plain CSS),
  `styles/**` (source CSS), `assets/icons.svg` plus `assets/icons/*.svg`,
  `README.md` (the npm page) and `LICENSE`.
- `libs/ui/README.md` is the npm page and must work standalone. `libs/ui/LICENSE` is what ships; the root
  `LICENSE` is the same text, for the repository.
- Checks before a release: `npx publint dist/libs/ui` and
  `npx @arethetypeswrong/cli --pack dist/libs/ui --exclude-entrypoints ./paper-ui.css --ignore-rules cjs-resolves-to-esm`.
  The two exclusions are expected: CSS has no types, and Angular packages are ESM-only. Then run **`/install-test`**,
  which publishes to Verdaccio, installs the package into the docs app's `package` configuration (no alias, styles
  and sprite from `node_modules`) and runs the e2e suite against it.
- Releases: `nx release --skip-publish` (config in `nx.json`) builds `ui`, sets the version in
  `libs/ui/package.json` and `dist/libs/ui/package.json`, writes `libs/ui/CHANGELOG.md` from Conventional Commits,
  then commits and tags `v{version}`. Push the commit and the tag; `release.yml` publishes that tag to npm with
  provenance. **First release:** `npx nx release 0.1.0 --first-release --skip-publish` (add `--dry-run` to
  preview).

## Design-system sync

- The library and the design-system artifact are kept in step by the **`/sync-design-system`** skill
  (`.claude/skills/sync-design-system/SKILL.md`), which drives `tools/design-system-sync/cli.mjs`.
  - **The repo owns:** component sources, component CSS (`bundle.css`), the `preview.html` cards generated from
    the docs pages' `*.docs.ts`, a live `bundle.js`, and `index.d.ts`.
  - **Two-way:** `tokens.json` (merged per token), the brand book `libs/ui/docs/brand-book.md`, each component's
    `README.md`, and the icons.
- The last agreed state is committed in `tools/design-system-sync/state/` (`sync-state.json` plus `base/`), and
  the path contract lives in `tools/design-system-sync/lib/mapping.mjs`. The model behind the tool (three-way merge,
  ownership, data flow, edge cases) is in [`tools/design-system-sync/README.md`](tools/design-system-sync/README.md).
- **Sync only from this repo, never from vault.** Two repos syncing one artifact would each see the other's pushes
  as conflicting edits.
- Recording a sync reads `git rev-parse HEAD`, so this folder must be a git repo before the first sync.
- Only the Artifact tool can read or publish the artifact, so Claude drives the sync. Always show the plan and
  get approval before publishing.

## Gotchas

- **Stale dev server:** Playwright reuses whatever is on `:4200` (`reuseExistingServer`). Kill it first with
  `pkill -f "nx run ui-demo-app:serve"`.
- **Playwright browsers** aren't installed by `npm ci`. Run `npx playwright install chromium`.
- **Generated files:** never edit them by hand. They are `tokens.css`, `icons.svg`,
  `icon-names.ts`, `icon-sprite-data.ts`, `src/styles/package/*.css` and the docs app's
  `tokens.json`/`derived-tokens.json`. Change the source and regenerate; specs fail when they're stale.
- **Templates** (`libs/ui/src/**/*.html`) are Prettier-formatted with one attribute per line, and the tag's `>` closes
  on the last attribute's line (`bracketSameLine`). This is enforced by `nx lint ui`. Fix with `npm run prettier`. Prettier drops an HTML comment placed right before `@if`/`@for`,
  so put `eslint-disable-next-line` comments inside the block.
- **`<kebab>.docs.ts` must stay a JSON literal**, because the sync parses it.
- **Docs sidebar sub-groups** (e.g. Forms › Passwords) live only in `apps/ui-demo-app/src/app/docs/doc-nav.ts`. A page's
  `.docs.ts` `group` stays the top-level title, because it becomes the design-system card's flat `@dsCard group`.
- **The design-system bundle must not contain `<!--` or `</script`.** The stage step escapes Angular's `<!--`
  regex as `\x3C`; keep that.
- **Artifact tool:** publishing refuses `.ts` files unless they're sent as `{ from, contentType: "text/plain" }`.
  Build the `files` map with `node tools/design-system-sync/cli.mjs files-arg`, never by hand. Asset reads by id
  take `path: "<id>"`, one per call. A `read` with `path` doesn't accept a `prompt`.
- **Syncs need a claude.ai session on Anthropic's backend.** The Artifact tool, and so any design-system read or
  publish, refuses every call in a session routed to another model provider through environment variables, and
  `/login` alone doesn't fix that. Start `claude` from a shell without those overrides, then `/login` with the
  claude.ai account.
- **Lint rules:**
  - Attribute components need an `eslint-disable-next-line @angular-eslint/component-selector` comment.
  - `elements-content` allows `label` for icon-only buttons.
  - `ConfirmDialog`'s `cancel` output has a `no-output-native` disable.
- **Angular 21.2:** Signal Forms `touched` is a two-way `model(false)` set on blur (a `touch` output arrives in 22).

## Project skills

Skills live in `.claude/skills/<name>/SKILL.md`, with `name` + `description` frontmatter; flat `.md` files there
aren't loaded. This repo has:
- `sync-design-system`
- `install-test`, which tests the built package as a consumer gets it (Verdaccio → the docs app's `package`
  configuration → the e2e suite)
- `write-plan`, which writes to `/plans`
- `session-overview`, which writes `llm-status/YYYY-MM-DD-HHMM.md`
- `session-resume`, which briefs you from the newest overview
- `grill-me`, which interviews the user in rounds of `AskUserQuestion` prompts, each with a recommended answer, until every
  decision in a new request is settled. It is triggered by the UserPromptSubmit hook below
- `wiki`, which maintains `wiki/` with `/wiki status | ingest <path|url> | query <question> | retire <path> | lint`

`/plans` and `/llm-status` are gitignored.

## Wiki

`wiki/` is an Obsidian vault that Claude maintains. It holds what the code can't: decisions and why they were made,
history, research, and synthesis that cuts across the repo. It grows one ingested source at a time, from session
records (`llm-status/`, `plans/`, one-off root docs) and external articles. It links to the READMEs and `CLAUDE.md`
files and never copies them. Its schema is [`wiki/CLAUDE.md`](wiki/CLAUDE.md). The pages are committed; `wiki/raw/`
(the source snapshots) is gitignored.

## Session hooks (`.claude/settings.json`, scripts in `.claude/hooks/`)

- **SessionStart** (`startup|clear`): `session-start.sh` puts the newest `llm-status/*.md` into the new session's
  context. When `wiki/log.md` exists, it also adds one line listing the session records that haven't been ingested
  into the wiki yet.
- **UserPromptSubmit**: `grill-reminder.sh` adds a reminder to run `grill-me` when a prompt is a new request. It
  stays silent for `/` commands, prompts that start with `no grill`, and the overview writer.
- **SessionEnd**: `session-end.sh` condenses the closing session's transcript, runs `session-overview` on it in a
  `claude -p`, and waits for it, so closing takes about a minute. It skips sessions with fewer than 3 prompts. The
  wait is allowed up to 5 min by `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` in `settings.json` (without it, Claude
  Code caps SessionEnd hooks at 60 s). The writer is detached (nohup, own process group), so closing the terminal
  window doesn't kill it. Its log is `$TMPDIR/llm-status-writer.log`.
- The writer runs with `LLM_STATUS_WRITER=1`, and both hooks exit early when that's set, so the writer never
  starts another writer. Review or disable the hooks with `/hooks`.
