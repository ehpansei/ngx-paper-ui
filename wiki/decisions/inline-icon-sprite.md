---
type: decision
created: 2026-10-19
updated: 2026-10-19
date: 2026-09-30
status: active
sources:
  - ../sources/ngx-paper-ui-extraction.md
tags: [icons, packaging, ssr]
---

# Icons work without app configuration: `provideInlineIconSprite()`

## Context

`<lib-icon>` renders `<svg><use href="…icons.svg#name"/></svg>`. If the sprite is a separate file, every consuming
app has to copy it into its assets with an `angular.json` glob and serve it at the right URL. That's a setup step
that's easy to get wrong, and when it's wrong the icons quietly render blank.

## Decision

The icons build also generates `icon-sprite-data.ts`, which holds the sprite as a string.
**`provideInlineIconSprite()`** is an environment provider that does three things:
- on app init, it puts the sprite into `document.body` once, inside a hidden `#lib-icon-sprite` element;
- it sets `ICON_SPRITE_URL` to `''`, so icons reference `#name` in the same document;
- on the server it does nothing.

The asset route (`provideIconSprite(url)` plus the glob) stays for apps that would rather have a cacheable file.

## Why

- Icons work after one provider line, with no asset config.
- It's safe under server-side rendering.

## Rejected alternatives

- **Only the asset file:** every app would have to do the glob setup.

## Consequences

- The sprite markup ships inside the JS bundle, so it isn't cached separately. Apps that care use the asset route.
- Code: [`icon-sprite.ts`](../../libs/ui/src/components/icon/icon-sprite.ts), tested by
  [`icon-inline-sprite.spec.ts`](../../libs/ui/src/components/icon/icon-inline-sprite.spec.ts). Usage is in the
  [Icon README](../../libs/ui/src/components/icon/README.md).
- **Not finished:** the extraction plan (§3.4) says to switch the design-system bundle's generated `mount.ts` (in
  [`mapping.mjs`](../../tools/design-system-sync/lib/mapping.mjs)) to this provider. As of 2026-10-19 it still puts
  the sprite in by hand, with a `?raw` import and `provideIconSprite('')`.
- Related: [Standalone npm package](standalone-npm-package.md).
