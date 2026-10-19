---
type: decision
created: 2026-10-19
updated: 2026-10-19
date: 2026-10-05
status: active
sources:
  - ../sources/ngx-paper-ui-extraction.md
  - ../sources/sync-handoff.md
tags: [styles, css, dependencies, tailwind]
---

# Styles ship as plain CSS, with no Tailwind dependency

## Context

In vault, the styles entry was `src/styles/tailwind.css`. It loaded Tailwind's theme and utilities, then the
tokens, then the component CSS. Yet the components only use their own `ui-*` classes, so they never needed Tailwind
utilities.

## Decision

The package ships **`paper-ui.css`**: plain CSS made of the Inter import, the tokens and every component's CSS. It
also ships the source CSS under `styles/**`. The library has **no Tailwind dependency at all**. Its styles entry is
[`libs/ui/src/styles/index.css`](../../libs/ui/src/styles/index.css).

Exact date unknown: it was dropped after the extraction plan (2026-09-30) and before this repo's first commit
(2026-10-05), which has no Tailwind in it.

## Why

- **Keep external dependencies to a minimum.** Tailwind was overkill for a library whose components style
  themselves with their own classes (the user, 2026-10-19).
- An app that wants Tailwind can still add it. Paper UI doesn't need to bring it along.

## Rejected alternatives

- **An opt-in `tailwind.css` export.** It was planned in §3.3 of the
  [extraction plan](../sources/ngx-paper-ui-extraction.md): `paper-ui.css` plus the tokens mapped into a Tailwind
  v4 theme, so classes like `bg-surface` would work. It was dropped together with the dependency.
- **Requiring Tailwind**, as vault's entry did.

## Consequences

- [`libs/ui/package.json`](../../libs/ui/package.json) exports only `./paper-ui.css`, `./styles/*` and
  `./assets/*`. `ui:styles` ([`build-styles.mjs`](../../libs/ui/scripts/build-styles.mjs)) generates
  `src/styles/package/paper-ui.css`.
- The sync tool, copied from vault, still pointed at `tailwind.css` (`TAILWIND_ENTRY` in `paths.mjs`) and failed two
  specs. On 2026-10-05 it was renamed to `STYLES_ENTRY`, pointing at `index.css`
  ([handoff](../sources/sync-handoff.md)).
- A Tailwind app that wants Paper UI's tokens as utilities has to map the CSS custom properties itself. Open
  question: should the README show how?
- Related: [Standalone npm package](standalone-npm-package.md).
