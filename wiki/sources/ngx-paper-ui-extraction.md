---
type: source
created: 2026-10-19
updated: 2026-10-19
origin: ngx-paper-ui-extraction.md
retired: 2026-10-19
sources: []
tags: [history, extraction, packaging, release]
---

# Extraction plan: Paper UI out of vault, onto npm

This is a plan Claude wrote for a fresh session to execute. It was drafted around 2026-09-30 and updated for the
package rename on 2026-10-02. It was committed at the repo root in this repo's first commit, `a90b779`, and
retired on 2026-10-19: read it with `git show a90b779:ngx-paper-ui-extraction.md`. Snapshot:
`raw/sessions/ngx-paper-ui-extraction.md`.

It has phases for copying the workspace, making the library publishable, proving a real install, CI and releases,
and handing over the design-system sync. It ends with a list of gotchas and a done checklist. Its background section
and gotchas mostly repeat [`libs/ui/CLAUDE.md`](../../libs/ui/CLAUDE.md) and the root
[`CLAUDE.md`](../../CLAUDE.md), so they aren't restated here.

## Key takeaways

- **Why it left vault:** the library becomes its own repo and a public npm package with provenance. Vault is
  read-only, and the copy comes from its working tree because most of the library work was uncommitted there.
  See [Standalone npm package](../decisions/standalone-npm-package.md).
- **Publishable build:** it moved from `ng-packagr-lite` (full compilation plus a guard that blocks publishing) to
  `@nx/angular:package` in partial mode. See [Partial-compilation build](../decisions/partial-compilation-build.md).
- **Styles without Tailwind:** `paper-ui.css` is plain CSS. The plan also had an opt-in `tailwind.css`, which was
  later dropped. See [Plain-CSS distribution](../decisions/plain-css-distribution.md).
- **Icons without configuration:** `provideInlineIconSprite()` puts the sprite into the page. The asset route stays.
  See [Inline icon sprite](../decisions/inline-icon-sprite.md).
- **Proving a real install:** a release candidate goes to the local Verdaccio registry and is installed into
  throwaway Angular apps, which are then checked with Playwright: icons paint, validation shows, dialogs close with
  Escape.
- **Release path:** `nx release` writes the version, changelog and tag. Pushing a `v*` tag makes `release.yml`
  publish with provenance. A separate workflow deploys the docs site to GitHub Pages. Pushing and the first publish
  each need the user's approval.
- **Sync handover:** this repo takes over the design-system sync at version `1790709100-b668`.
  See [Sync only from this repo](../decisions/sync-only-from-this-repo.md).

## How it held up (checked against the repo on 2026-10-19)

- **Tailwind:** the opt-in `tailwind.css` (§3.3) and the Tailwind dependencies are gone. There's no `./tailwind.css`
  export, and the styles entry is `libs/ui/src/styles/index.css`. They were dropped on purpose, to keep external
  dependencies to a minimum.
- **Vault commit:** the plan names vault's HEAD as `98897b2`, while `CLAUDE.md` says the extraction came from
  `d3f6df6`. Both are right. `98897b2` (2026-08-19) was HEAD while the work was still uncommitted, and `d3f6df6`
  (2026-09-30, "components, documentation pages") committed that work, then the extraction copied from it.
- **Release config is missing:** §5's `nx.json` → `release` block (project `ui`, changelog, `v{version}` tag) isn't
  in `nx.json`, which still has vault's leftover `preVersionCommand` that §5 says to remove. The root `CLAUDE.md`
  describes `nx release` as if the block were there. This is an open question in the
  [overview](../overview.md#open-questions).
- **Design-system bundle:** §3.4 says to switch the generated `mount.ts` to `provideInlineIconSprite()`. It still
  puts the sprite in by hand. See [Inline icon sprite](../decisions/inline-icon-sprite.md#consequences).
- **Install proof:** §4's throwaway apps (one plain-CSS, one Tailwind) became the
  [`/install-test` skill](../../.claude/skills/install-test/SKILL.md) on 2026-10-19. It installs the package from
  Verdaccio into the docs app's `package` configuration and runs the existing e2e suite against it, so every
  component is exercised instead of one test page. The trade-off is that a clean project isn't covered: the workspace
  already has every peer dependency.

## What it changed in the wiki

- [Overview](../overview.md): the "Where it came from" timeline
- New decision pages: [standalone npm package](../decisions/standalone-npm-package.md),
  [partial-compilation build](../decisions/partial-compilation-build.md),
  [plain-CSS distribution](../decisions/plain-css-distribution.md),
  [inline icon sprite](../decisions/inline-icon-sprite.md),
  [sync only from this repo](../decisions/sync-only-from-this-repo.md)
- **Retired 2026-10-19.** The two things in it that nothing else covered moved out of it:
  - the install proof became the [`/install-test` skill](../../.claude/skills/install-test/SKILL.md);
  - the Artifact gotcha (a `read` with `path` doesn't accept `prompt`) went into the root
    [`CLAUDE.md`](../../CLAUDE.md).

  The rest is history or restates the `CLAUDE.md` files. It stays in git and in the snapshot.
