# Extract Paper UI into its own repo and publish it to npm as `ngx-paper-ui`

> **Renamed 2026-10-02:** the package was first called `ng-paper-ui` and is now `ngx-paper-ui`; this log uses the
> new name throughout.

> **For the Claude session running this plan.** You're in a new, (nearly) empty folder, the future
> `ngx-paper-ui` repo. The source is the **vault** workspace at `/Users/castro/Projects/vault`, where this library
> was built.
>
> You start with no memory of that work; everything you need is in this document. Read it fully before you
> start, then work phase by phase, verifying each one before moving on.

---

## 0. Ground rules

1. **Vault is read-only.** Never write to `/Users/castro/Projects/vault`, and never run its npm scripts, Nx
   targets, generators or its design-system sync. Only read and copy from it.
2. **The new repo is your current working directory.** Everything you create goes here.
3. **Stop and ask the user before:**
   - pushing to GitHub
   - `npm publish` to the **public** registry (publishing to the local Verdaccio registry is fine)
   - publishing anything to the design-system artifact (`/sync-design-system`)
   - deleting anything you didn't create yourself
4. **Uncommitted source:** most of vault's library work is **uncommitted** (vault `HEAD` is `98897b2`, which
   predates it). Copy from the **working tree**. Do not `git clone` or `git filter-repo` vault, or you'll lose
   the work.
5. **Tell the user plainly** what passed, what failed and what you skipped. Don't claim anything is verified
   unless you ran it.

---

## 1. Background: what you're extracting

**Paper UI** is an Angular component library with an "ink on paper" look: cream surfaces, sepia ink, one
configurable `primary` colour, and Inter throughout.

It implements a design system that lives in a claude.ai artifact of type "Design System":
**https://claude.ai/artifact/YamgBYyuomodpWN4SFgSTB** (private to the user).

In vault it is the Nx library `libs/ui` (project name **`ui`**), imported through the path alias
**`@vault/lib/ui`**. Read **`libs/ui/CLAUDE.md`** after copying; it holds the full rule set. The essentials:

- **Stack:** Angular **21.2**.
  - Every component is standalone and OnPush, with signal `input()` / `model()` / `output()`, and is zoneless-ready.
  - Forms are **Signal Forms** (`@angular/forms/signals`), with no ControlValueAccessor.
  - Controls extend `FieldControl` (`components/form/field-control.ts`).
  - **Angular 21.2 quirk:** `touched` is a two-way `model(false)` set on blur. There is no `touch` output; that
    arrives in Angular 22.
- **Naming:**
  - element selectors are `lib-*` (`lib-text-input`)
  - attribute components and directives are `lib*` (`button[libButton]`, `a[libNavItem]`, `[libTheme]`)
  - classes are unprefixed (`Button`, `TextInput`, `ConfirmService`)
  - rendered CSS classes are `ui-*`
  - `PAPER_UI` (`src/paper-ui.ts`) is the array of every standalone component and directive.
- **Styles are global.** Components have no styles of their own, and templates are inline.
  - `src/styles/tailwind.css` is the entry. It loads Tailwind theme and utilities (no preflight), then
    `tokens/tokens.css`, `tokens/tailwind-theme.css` and `paper-ui/*.css`.
  - `paper-ui/*.css` holds the `ui-*` component CSS, split by `/* ---- Name ---- */` section headers. The
    design-system sync depends on those headers.
- **Tokens:**
  - `src/styles/tokens/tokens.json` is the **source**, in the design system's format.
  - `nx run ui:tokens` (`scripts/build-tokens.mjs`) generates `tokens.css`, `tailwind-theme.css` and the docs
    app's copies (`apps/ui-demo-app/src/app/docs/tokens.json` and `derived-tokens.json`).
  - `derived-tokens.json` lists the tokens computed from `--primary` with `color-mix()`, which are never set
    directly.
  - A spec (`tokens-sync.spec.ts`) fails if the outputs are stale.
- **Icons:**
  - The SVG files in `src/assets/icons/*.svg` are the source.
  - `nx run ui:icons` (`scripts/build-icons.mjs`) generates the sprite `src/assets/icons.svg` and
    `components/icon/icon-names.ts` (`ICON_NAMES` and `IconName`).
  - `<lib-icon>` renders `<svg><use href="assets/ui/icons.svg#name"/></svg>`, configurable with
    `provideIconSprite(url)` / `ICON_SPRITE_URL`.
  - `icon-sprite.spec.ts` guards staleness.
- **Theming:** `ThemeService.setPrimary()` / `setMode('dark')` (which sets `data-theme` on `<html>`), and the
  scoped `[libTheme]` directive.
- **Config form:** `lib-form` renders a Signal Forms form from a `FormConfig` array with validation rules
  (`required`, `email`, `minLength`, `maxLength`, `pattern`) and a `value` field. `submitted` fires only when
  valid; `invalidSubmit` fires otherwise.

**The docs app** is `apps/ui-demo-app` (project `ui-demo-app`), the library's living documentation. It is a
`lib-main-view` shell with one lazy route per component (`lib-<kebab>`). Each page folder
`pages/<kebab>-docs-page/` holds:
- `<kebab>-showcase.ts`: the live examples
- `<kebab>.docs.ts`: a `ComponentDoc` that **must stay a JSON literal**, because the sync tool parses it
- `<kebab>-docs-page.ts`: the page, `<app-doc-page [doc]>` plus the showcase

The shared kit is in `src/app/docs/` (`DocPage`, `TokenTable`, the nav, the tokens copy). The build copies the
icon sprite to `assets/ui/icons.svg` (see its `project.json` build `assets`).

**E2E:** `apps/ui-demo-app-e2e` is a Playwright suite of 25 tests. It boots the docs app on `:4200`.

**The design-system sync** keeps the repo and the design-system artifact in step both ways.
- The tool is `tools/design-system-sync/` (Nx project `design-system-sync`, plain Node ESM). The contract lives
  in `lib/mapping.mjs`:
  - **The repo owns:** sources, component CSS, `preview.html` cards generated from `*.docs.ts`, a live
    `bundle.js` built by Vite with Analog in AOT mode, and `index.d.ts`.
  - **Two-way:** `tokens.json` (merged per token), the brand book `libs/ui/docs/brand-book.md`, each
    component's `README.md`, and the icons.
- The last agreed state is committed in **`libs/ui/design-system/`** (`sync-state.json` plus `base/`).
- The procedure is the **`/sync-design-system`** skill (`.claude/skills/sync-design-system/SKILL.md`). Only the
  Artifact tool can read or publish the artifact, so Claude drives it.
- `nx run design-system-sync:check` builds the bundle and loads every card headless.
- The last sync was design-system **version `1790709100-b668`**: 28 cards, everything in sync.

---

## 2. Phase 1: copy the workspace and prove it still works

### 2.1 Copy (from vault's working tree, excluding build and cache output)
Keep **the same relative paths**; many scripts hard-code them (`libs/ui/...`, `apps/ui-demo-app/...`,
`tools/design-system-sync/...`).
```sh
V=/Users/castro/Projects/vault
EX=(--exclude node_modules --exclude dist --exclude .nx --exclude .angular --exclude coverage --exclude tmp --exclude test-output)
for p in libs/ui apps/ui-demo-app apps/ui-demo-app-e2e tools/design-system-sync \
         .claude/skills/sync-design-system .claude/skills/write-plan .claude/skills/session-overview .verdaccio; do
  mkdir -p "$(dirname "$p")" && rsync -a "${EX[@]}" "$V/$p/" "./$p/"
done
for f in nx.json project.json tsconfig.base.json eslint.config.mjs vitest.workspace.ts \
         .prettierrc .prettierignore .editorconfig .gitignore package.json package-lock.json; do
  cp "$V/$f" "./$f"
done
```
Afterwards, `ls` each path and compare the file counts with vault (`find <path> -type f | wc -l`, using the same
excludes). Confirm nothing under `node_modules`, `dist` or caches came along.

| Copy | Notes |
|---|---|
| `libs/ui/` | the library, including `design-system/` (sync state), `docs/brand-book.md`, `scripts/`, `CLAUDE.md` |
| `apps/ui-demo-app/` | docs site |
| `apps/ui-demo-app-e2e/` | Playwright e2e |
| `tools/design-system-sync/` | sync tool |
| `.claude/skills/sync-design-system/`, `write-plan/`, `session-overview/` | project skills (folder + `SKILL.md` is the only layout Claude Code loads) |
| `nx.json`, `project.json` (root) | root `project.json` holds the `local-registry` (Verdaccio) target; rename its `"name"` from `vault` to `ngx-paper-ui-workspace` |
| `tsconfig.base.json`, `eslint.config.mjs`, `vitest.workspace.ts` | |
| `.prettierrc`, `.prettierignore`, `.editorconfig`, `.verdaccio/` | |
| `.gitignore` | already has the fix `/docs` (anchored; a bare `docs` once ignored every `docs/` folder, including `apps/ui-demo-app/src/app/docs/`) |
| `package.json`, `package-lock.json` | then trim (below) |

**Do not copy** vault's `apps/web`, `apps/extension`, their e2e projects, `setup.md`/`setup.sh`,
`docs/figma-mcp-setup.md`, or vault's root `CLAUDE.md`. Write a new `CLAUDE.md` instead (§2.3).

### 2.2 Trim the root `package.json`
- `name`: `ngx-paper-ui-workspace`. Set `private: true` (the **library's** own `libs/ui/package.json` is what
  gets published).
- **Scripts:** remove all the vault ones (`start`, `start:ext`, `start:backend`, `build:web`, `build:ext`,
  `package:ext`, `setup`). Add:
  - `"build": "nx build ui"`
  - `"test": "nx run-many -t test"`
  - `"docs": "nx serve ui-demo-app"`
  - `"e2e": "nx e2e ui-demo-app-e2e -- --project=chromium"`
- **Dependencies:** remove `@types/chrome` (it was only for the extension) and anything else only `web` or `extension` used. `concurrently` appears only in the scripts you're deleting and isn't installed. Keep:
  - Angular `~21.2` (including `@angular/cdk`)
  - `rxjs`
  - Nx `23.0.1` plugins (`angular`, `js`, `eslint`, `eslint-plugin`, `playwright`, `vite`, `vitest`, `web`,
    `devkit`, `workspace`)
  - Tailwind v4 (`tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/postcss`, `@tailwindcss/cli`), `postcss`,
    `autoprefixer`
  - `@analogjs/*`, `vite`, `vitest`, `@vitest/*`, `jsdom`
  - `@playwright/test`, `eslint*`, `angular-eslint`, `typescript`, `typescript-eslint`, `prettier`, `tslib`
  - `verdaccio`, `@juristr/nx-tailwind-sync`, `@swc/helpers`, `@oxc-project/runtime`
- If unsure whether something is used, keep it and note it for the user rather than breaking the build.
- Run `npm install` to regenerate the lockfile.

### 2.3 Repo files
- **`CLAUDE.md`** (new, library-first): what this repo is, the commands, the architecture (the three projects
  plus the tool), and the design-system sync section. Merge in the content of `libs/ui/CLAUDE.md` or link to it.
  Keep it accurate to *this* repo.
- **`README.md`** (repo root): short, pointing at the package README (§3.6) and the docs site.
- **`git init -b main`**, then set a local `user.name` / `user.email` if git has none (vault's was unset; ask the
  user which values to use).
- Initial commit message: `chore: extract Paper UI from vault@98897b2 (+ uncommitted work as of 2026-09-30)`.

### 2.4 Verify the copy before changing anything
```sh
npm ci
npx nx run-many -t lint test build -p ui ui-demo-app ui-demo-app-e2e design-system-sync
npx vitest run --config tools/design-system-sync/vitest.config.mts     # nx doesn't print these results
npx playwright install chromium                                          # once per machine, if missing
npx nx e2e ui-demo-app-e2e -- --project=chromium                         # expect 25 passed
npx nx run design-system-sync:check                                      # expect "checked 28 previews: all mounted"
```
Expect **26 lib unit tests**, **2 docs-app tests**, **46 sync-tool tests** and **25 e2e**. Fix only breakage
caused by the move (paths, the trimmed dependencies). Commit.

---

## 3. Phase 2: make the library publishable

### 3.1 A publishable build (partial compilation)
The current `ui:build` uses `@nx/angular:ng-packagr-lite`. That compiles in **full** mode for in-workspace use
only, and writes a `prepublishOnly` guard that blocks `npm publish`.
- Switch `libs/ui/project.json` `build` to **`@nx/angular:package`** (full ng-packagr: partial Ivy compilation,
  FESM2022). The options are `project: libs/ui/ng-package.json` and
  `tsConfig: libs/ui/tsconfig.lib.prod.json`.
- Set `dependsOn: ["tokens", "icons", "styles"]`.
- Set `"compilationMode": "partial"` in `tsconfig.lib.prod.json` → `angularCompilerOptions`. It's currently `{}`.
- **Check:**
  - `dist/libs/ui/fesm2022/ngx-paper-ui.mjs` exists and contains `ɵɵngDeclareComponent`, not
    `ɵɵdefineComponent`
  - `dist/libs/ui/package.json` has **no** `prepublishOnly` script

### 3.2 Package identity
- Rename the TS path alias in `tsconfig.base.json` from `@vault/lib/ui` to **`ngx-paper-ui`**. Update every
  import: about 31 files across `apps/ui-demo-app` and `tools/design-system-sync` (the generated `mount.ts`
  template in `lib/mapping.mjs` imports `provideIconSprite` from the alias).
- Grep `@vault/lib/ui` across the repo, including the `*.md` files, the brand book and `CLAUDE.md`s, and leave
  zero hits.
- **`libs/ui/package.json`:**
```jsonc
{
  "name": "ngx-paper-ui",
  "version": "0.1.0",
  "description": "Paper UI for Angular: warm, ink-on-paper components with one configurable colour, Signal Forms controls and a config-driven form.",
  "keywords": ["angular", "components", "design-system", "signal-forms", "ui"],
  "license": "MIT",
  "author": "Pedro Castro",
  "repository": { "type": "git", "url": "git+https://github.com/ehpansei/ngx-paper-ui.git", "directory": "libs/ui" },
  "homepage": "https://ehpansei.github.io/ngx-paper-ui/",
  "bugs": "https://github.com/ehpansei/ngx-paper-ui/issues",
  "peerDependencies": {
    "@angular/cdk": "^21.2.0", "@angular/common": "^21.2.0", "@angular/core": "^21.2.0",
    "@angular/forms": "^21.2.0", "rxjs": "^7.8.0"
  },
  "sideEffects": ["*.css"],
  "exports": {
    "./paper-ui.css": "./paper-ui.css",
    "./tailwind.css": "./tailwind.css",
    "./styles/*": "./styles/*",
    "./assets/*": "./assets/*"
  },
  "publishConfig": { "access": "public", "provenance": true }
}
```
ng-packagr merges its own `"."` export. Confirm the author name with the user.

### 3.3 Styles any app can use (`ui:styles`)
Add `libs/ui/scripts/build-styles.mjs` plus an Nx target `styles`. Its outputs go into `libs/ui/src/styles/`,
and ng-package already copies `src/styles/**/*.css` to `styles/`. Then add ng-package asset entries so the
package root gets `paper-ui.css` and `tailwind.css`.
- **`paper-ui.css`: plain CSS, no Tailwind required.** It is the Inter `@import url(…)`, then `tokens.css`,
  then every `paper-ui/*.css` in the order `tailwind.css` imports them.
  - The components use only `ui-*` classes, so this is complete.
  - Reuse `cssParts()` / `joinCss()` from `tools/design-system-sync/lib/convert.mjs`. Move the shared join logic
    into `libs/ui/scripts/` and import it from both, rather than duplicating it.
- **`tailwind.css`: opt-in for Tailwind v4 apps.** It is `@import "./paper-ui.css";` plus the contents of
  `tokens/tailwind-theme.css`, so `bg-surface`, `text-on-surface-muted`, `text-body`, `md:` and `lg:` work. The
  app puts it after its own `@import "tailwindcss";`.
- Keep `src/styles/tailwind.css`, the docs app's in-repo entry, unchanged.
- Add a spec that every `paper-ui/*.css` rule appears in the built `paper-ui.css`.

### 3.4 Icons without app configuration
- Extend `scripts/build-icons.mjs` to also emit `components/icon/icon-sprite-data.ts`, containing
  `export const ICON_SPRITE_SVG = '<svg …>…</svg>';` (generated; never edit).
- Add **`provideInlineIconSprite()`** in `components/icon/icon-sprite.ts`. It is an environment provider that:
  - on app init, injects the sprite once into `document.body`, in a hidden
    `<div id="lib-icon-sprite" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">`
  - provides `ICON_SPRITE_URL = ''`, so `<lib-icon>` uses same-document `#name` references
  - skips the DOM work on the server (SSR) and in non-browser platforms
- Export it from the icon barrel.
- The design-system bundle's `mount.ts`, generated in `tools/design-system-sync/lib/mapping.mjs`, does exactly
  this by hand today. Switch it to `provideInlineIconSprite()` and drop the `?raw` sprite import and
  `raw.d.ts` if nothing else needs them.
- The asset route stays: apps that prefer a cached file add this to `angular.json` →
  `build.options.assets`:
  `{ "glob": "icons.svg", "input": "node_modules/ngx-paper-ui/assets", "output": "assets/ui" }`
- Add specs for `provideInlineIconSprite()`: it injects the sprite once, the href is `#name`, and it's a no-op on
  a server platform.

### 3.5 Public API tidy-up
- Stop exporting the internal `uid()` helper from `components/form/field-control.ts` (keep it module-private or
  in an internal file).
- Keep `FieldControl` public, since it's useful for custom Signal Forms controls.
- Review `src/index.ts` for anything else internal.
- Run `npx publint dist/libs/ui` and `npx @arethetypeswrong/cli --pack dist/libs/ui`. Both must be clean, or
  their findings must be understood and explained to the user.

### 3.6 Package docs and legal
- **`libs/ui/README.md`** is the npm page, replacing the Nx boilerplate:
  - install (`npm i ngx-paper-ui @angular/cdk`) and the peer requirements (Angular ≥ 21.2)
  - **styles**, as two options: `"styles": ["node_modules/ngx-paper-ui/paper-ui.css"]`, or for Tailwind v4
    `@import "tailwindcss"; @import "ngx-paper-ui/tailwind.css";`
  - **icons**, as two options: `provideInlineIconSprite()`, or the asset glob plus the default URL
  - a minimal component example (`imports: [PAPER_UI]` or single classes)
  - Signal Forms binding (`[formField]`), `lib-form` with a config, theming (`ThemeService`, `[libTheme]`), dark
    mode
  - links to the docs site and a design principles summary taken from `docs/brand-book.md`
  - The README must work standalone on npmjs.com.
- **`LICENSE`** (MIT, © 2026 Pedro Castro; confirm the name) at the repo root. Add ng-package `assets` entries so
  `LICENSE` and `README.md` land in `dist/libs/ui`.
- **`CHANGELOG.md`**: `nx release` writes it from Conventional Commits (§5).

### 3.7 Verify the phase
```sh
npx nx run-many -t lint test build -p ui ui-demo-app design-system-sync
cd dist/libs/ui && npm pack --dry-run   # must list: fesm2022/ngx-paper-ui.mjs, index.d.ts, paper-ui.css, tailwind.css,
                                        # styles/**, assets/icons.svg, assets/icons/*.svg, README.md, LICENSE
npx nx e2e ui-demo-app-e2e -- --project=chromium && npx nx run design-system-sync:check
```

---

## 4. Phase 3: prove a real install (local registry)

1. Start Verdaccio with `npx nx run ngx-paper-ui-workspace:local-registry` (port 4873; config in `.verdaccio/`).
2. Publish a release candidate there: set the version to `0.1.0-rc.0` (only for this test), rebuild, then
   `npm publish dist/libs/ui --registry http://localhost:4873 --tag rc`.
3. **Outside the repo** (e.g. the scratchpad or `/tmp`), create two throwaway apps with
   `npx -p @angular/cli@21.2 ng new … --defaults --skip-git` and
   `npm i ngx-paper-ui@rc @angular/cdk@~21.2 --registry http://localhost:4873`:
   - **Plain CSS app:**
     - `paper-ui.css` in `angular.json` `styles`
     - `provideInlineIconSprite()`
     - a page with a Button (with an icon), a TextInput plus Select bound with Signal Forms (with validation), a
       `lib-form` with a required field, a ConfirmDialog opened via `ConfirmService`, and a Toast
   - **Tailwind v4 app:**
     - `@import "tailwindcss"; @import "ngx-paper-ui/tailwind.css";`
     - the **asset-glob** icon route
     - the same page, plus a Tailwind utility using a token (`class="bg-surface-raised p-4"`)
4. `ng build` both, then serve them and check with Playwright:
   - no console errors
   - icons paint (`svg.getBBox().width > 0`)
   - validation messages appear after blur
   - the dialog opens and closes with Escape
   - Tailwind token utilities apply
   - Take screenshots and review them.
5. Restore the version to `0.1.0` and delete the throwaway apps. Summarise the results for the user.

---

## 5. Phase 4: CI, releases and the docs site

- **`nx.json` → `release`:**
  - `projects: ["ui"]`, `projectsRelationship: "independent"` (or fixed; there's one project)
  - `version.preVersionCommand: "npx nx build ui"`
  - `changelog.projectChangelogs: true` (conventional commits)
  - `git.tag: true`, tag pattern `v{version}`
  - publish from `dist/libs/ui`
  - Remove vault's leftover `preVersionCommand: "npx nx run-many -t build"`.
- **`.github/workflows/ci.yml`:** on PR and push to `main`:
  - `actions/setup-node` (Node 22 or 24)
  - `npm ci`, `npx playwright install --with-deps chromium`
  - `npx nx affected -t lint test build`
  - `npx vitest run --config tools/design-system-sync/vitest.config.mts`
  - `npx nx e2e ui-demo-app-e2e -- --project=chromium`
  - Set `nx.json` `defaultBase` to `main` (vault's is `master`).
- **`.github/workflows/release.yml`:** on a `v*` tag, build and run `npm publish dist/libs/ui --access public`
  with provenance (`permissions: id-token: write`) and `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`.
- **`.github/workflows/docs.yml`:** on push to `main`, build `ui-demo-app` with `--base-href /ngx-paper-ui/` and
  deploy to GitHub Pages.
  - Add a `404.html` copy of `index.html` for deep links.
  - The sprite URL `assets/ui/icons.svg` is relative, so it works under the base href. Verify it in the built
    output.
- Dry run: `npx nx release --dry-run` must show the `0.1.0` version, changelog and tag without writing anything.
- **Needs the user (ask; don't guess):**
  1. Create the GitHub repo **`ehpansei/ngx-paper-ui`** and give the remote URL.
  2. An npm account with 2FA, and an automation token saved as the repo secret **`NPM_TOKEN`**.
  3. Enable GitHub Pages (source: GitHub Actions).
  4. **Approval** for the first `git push`, and separately for the first real publish of **`0.1.0`**.
- After publishing: `npm view ngx-paper-ui` shows 0.1.0, and the npm page shows the provenance badge.
- `ngx-paper-ui` was unregistered on 2026-09-30. If npm rejects it as too similar to an existing name, stop and
  ask the user for another (e.g. `ngx-paper-ui`, which was also free).

---

## 6. Phase 5: the design-system sync now lives here

- This repo **takes over** syncing the Paper UI design-system artifact. The state in `libs/ui/design-system/`
  was copied, so the base continues seamlessly (last synced version `1790709100-b668`).
- **Tell the user explicitly:** from now on, run `/sync-design-system` **only from this repo, never from
  vault.** Two repos syncing one artifact would each see the other's pushes as conflicting edits.
- Update the prose that names the package:
  - brand book `libs/ui/docs/brand-book.md`: imports from `ngx-paper-ui`, the install and styles options,
    `provideInlineIconSprite`
  - component READMEs, where needed
- The next sync pushes those, plus the rebuilt bundle, `mount.ts` and sources.
- Run `npx nx run design-system-sync:check` and `node tools/design-system-sync/cli.mjs diff` (after a fetch; see
  the skill). **Show the user the plan and wait for approval before publishing** to the artifact.

---

## 7. Known gotchas (learned the hard way in vault)

- **Stale dev server:** Playwright's `webServer` has `reuseExistingServer: true`. An old `nx serve ui-demo-app`
  on `:4200` gets reused and serves stale config (it caused sprite 404s once). Kill it first:
  `pkill -f "nx run ui-demo-app:serve"`.
- **`nx test` for Vitest projects prints no results:** it just says "Successfully ran". To see counts, run
  `npx vitest run --config <project>/vitest.config.mts` (or `vite.config.mts` for `libs/ui`).
- **Playwright browsers** aren't installed by `npm ci`: run `npx playwright install chromium`. There is no
  system Chrome on the user's Mac.
- **Artifact publish refuses `.ts` files** unless they're sent as `{ from, contentType: "text/plain" }`. Use
  `node tools/design-system-sync/cli.mjs files-arg` to build the `files` map; never hand-assemble it.
- **Artifact asset reads by id** work only with `path: "<id>"`, one per call, not `paths`. Icons whose blob id
  is unchanged come from the sync cache anyway.
- **Artifact `read` with a file path** doesn't accept a `prompt` parameter.
- **The design-system bundle must not contain `<!--` or `</script`.** Angular core has a regex with `<!--`; the
  stage step escapes it as `\x3C`. Keep that.
- **Skills load only from `.claude/skills/<name>/SKILL.md`**, with `name` and `description` frontmatter. Flat
  `.md` files are ignored.
- **git `user.name` was unset** in vault. Ask the user before setting the new repo's identity.
- **Lint rules:**
  - Attribute components (`button[libButton]`) need an inline
    `eslint-disable-next-line @angular-eslint/component-selector` comment.
  - `elements-content` allows the `label` attribute for icon-only buttons.
  - `ConfirmDialog`'s `cancel` output has a `no-output-native` disable (it's the design system's API name).
- **Generated files:** `tokens.css`, `tailwind-theme.css`, `icons.svg`, `icon-names.ts` and the docs-app token
  copies (plus, after §3.4, `icon-sprite-data.ts` and §3.3's CSS) are all generated. Change their sources and
  regenerate.

---

## 8. Done checklist

- [ ] Phase 1: copied; `npm ci` works; 26 + 2 + 46 unit tests, 25 e2e, and 28/28 cards pass; initial commit made
- [ ] Phase 2:
  - partial-compiled FESM2022 with no publish guard; `ngx-paper-ui` alias everywhere (zero `@vault/lib/ui`)
  - `paper-ui.css` + `tailwind.css`; `provideInlineIconSprite()`; `uid` not exported
  - README, LICENSE; `publint` and `attw` clean; `npm pack --dry-run` contents correct
- [ ] Phase 3: rc installed from Verdaccio into a plain-CSS app and a Tailwind app; both render, validate, open
      dialogs and paint icons (screenshots reviewed)
- [ ] Phase 4: CI, release and docs workflows; `nx release --dry-run` correct. After user approval: pushed,
      Pages live, `0.1.0` on npm with provenance
- [ ] Phase 5: brand book and README updated for `ngx-paper-ui`; user told to sync only from here; a sync
      published only if the user approved it
- [ ] Final report: what passed, what's pending on the user, and anything skipped or uncertain
