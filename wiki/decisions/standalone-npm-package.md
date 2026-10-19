---
type: decision
created: 2026-10-19
updated: 2026-10-19
date: 2026-09-30
status: active
sources:
  - ../sources/ngx-paper-ui-extraction.md
tags: [packaging, npm, naming, history]
---

# Paper UI is its own repo and npm package, `ngx-paper-ui`

## Context

Paper UI was built inside the `vault` workspace as the Nx library `libs/ui`, imported through the alias
`@vault/lib/ui`. Only vault could use it.

## Decision

Extract it into its own repo and publish it to the public npm registry as **`ngx-paper-ui`**, with provenance. The
in-repo alias is the package name too, so imports in the docs app and the sync tool look exactly like a consumer's
imports. The package was first called `ng-paper-ui` and was renamed on 2026-10-02.

## Why

- Any Angular app can install it, not just vault.
- **The name:** `ngx-` is the prefix the community usually uses for modern Angular libraries. That was the user's
  reason for the rename (2026-10-19).

## Rejected alternatives

- **Keep it in vault:** only one consumer, and no versioned releases.
- **`ng-paper-ui`:** the first name, replaced by the more conventional `ngx-` prefix.

## Consequences

- Vault is read-only for library work, and the library now evolves here. The first copy came from vault's working
  tree. See the [extraction plan](../sources/ngx-paper-ui-extraction.md) for why, and see the
  [overview](../overview.md#where-it-came-from) for the timeline.
- The published identity lives in [`libs/ui/package.json`](../../libs/ui/package.json). The release checks and flow
  are in [`CLAUDE.md`](../../CLAUDE.md). The npm page is [`libs/ui/README.md`](../../libs/ui/README.md).
- As of 2026-10-19 the repo has no git remote and nothing is published yet.
- Related: [Partial-compilation build](partial-compilation-build.md),
  [Plain-CSS distribution](plain-css-distribution.md), [Inline icon sprite](inline-icon-sprite.md).
