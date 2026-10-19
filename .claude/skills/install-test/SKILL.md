---
name: install-test
description: Test the built ngx-paper-ui package the way a consumer gets it. It publishes to the local Verdaccio, installs the package into the docs app's `package` configuration and runs the e2e suite against it. Use before a release, after packaging changes (the ui build config, package.json exports, the published styles or icons), or when the user runs /install-test or asks to test a real install.
---

# Test a real install

The docs app normally compiles the library from source: the `ngx-paper-ui` alias in `tsconfig.base.json` points at
`libs/ui/src`, and its styles and sprite come from `libs/ui/src`. Its **`package` configuration**
(`apps/ui-demo-app/project.json`) points all three at `node_modules/ngx-paper-ui`:
- `tsconfig.app.package.json` empties `paths`;
- the styles are `paper-ui.css` from the package plus the docs-only `src/docs.css`;
- the sprite is copied from the package's `assets/`.

The Playwright suite then exercises the published FESM (linked by a consumer's compiler), the `exports` map,
`paper-ui.css` and the shipped sprite. This replaces the extraction plan's throwaway apps.

Run every command from the repo root. Report plainly what passed, what failed and what you skipped.

## Steps

1. **Clear the port.** `pkill -f "nx run ui-demo-app:serve"`. Playwright reuses whatever answers on `:4200`, and a
   leftover normal-mode server would test the source instead of the package. Chromium must be installed
   (`npx playwright install chromium`).
2. **Start Verdaccio** if `curl -sf http://localhost:4873/-/ping` fails: run
   `npx nx run ngx-paper-ui-workspace:local-registry` in the background and wait until the ping answers. Note that
   you started it.
3. **Publish:** `npm run local-build-publish`. It builds `ui` and publishes it to Verdaccio, replacing the same
   version if it's already there. It never bumps the version and never touches npm.
4. **Install without saving:**

   ```sh
   v=$(node -p "require('./dist/libs/ui/package.json').version")
   npm i --no-save --prefer-online "$(npm view "ngx-paper-ui@$v" dist.tarball --registry http://localhost:4873)"
   ```

   - Installing the tarball URL keeps every other dependency on npmjs.
   - `--prefer-online` matters because the version number is reused.
   - Check that `node_modules/ngx-paper-ui/` has `fesm2022/ngx-paper-ui.mjs`, `paper-ui.css` and
     `assets/icons.svg`, and that `git status --short package.json package-lock.json` prints nothing.
5. **Serve package mode:**
   - `rm -rf .angular/cache` first. With the version reused, Vite's prebundle of the old package would be served.
   - Then run `npx nx run ui-demo-app:serve:package` in the background and wait until `http://localhost:4200`
     answers.
6. **Run the e2e suite with Playwright directly**, right after checking that `:4200` still answers:
   `npx playwright test -c apps/ui-demo-app-e2e/playwright.config.mts --project=chromium`. Every test must pass;
   the count is the same as in normal mode (add `--list` to see it).
   - Not `nx e2e`: its inferred dependency on `ui-demo-app:serve:development` tries to start the normal server,
     fails on the busy port and fails the run even when every test passed. Nx would also replay a cached pass,
     since it doesn't see the installed package as an input.
   - Playwright reuses the package-mode server. If nothing answers on `:4200`, its `webServer` starts the normal
     server instead and the run silently tests the source. That's why the port check comes first.
7. **Clean up, also after a failure.** Leave the workspace as you found it:
   - stop the server with `pkill -f "nx run ui-demo-app:serve"`;
   - `npm uninstall --no-save ngx-paper-ui`, then `rm -rf .angular/cache`;
   - stop Verdaccio if step 2 started it (`pkill -f "verdaccio --config .verdaccio/config.yml"`); its storage in
     `tmp/local-registry/storage` survives;
   - `git status` shows nothing this skill added.
8. **Report** the version tested, the pass and fail counts (with the failing test names), and any step you skipped.

## When it fails

- **Fails here but `npm run e2e` passes:** the published package differs from the source. Look at what the build
  ships (`dist/libs/ui`, its `package.json` `exports` and `sideEffects`), the generated `paper-ui.css`
  (`nx run ui:styles`), and the public API in `libs/ui/src/index.ts`. A docs page importing something that isn't
  exported fails at build time, before any test runs.
- **Icons are blank:** the sprite isn't in the package's `assets/`, or the build `assets` glob missed it.
- **Unstyled pages:** `paper-ui.css` is missing from the package root, or it's stale.

## What it doesn't cover

- **A clean project.** The workspace already has every peer dependency, so a missing `peerDependencies` entry or a
  broken snippet in `libs/ui/README.md` would still pass. `npx publint dist/libs/ui` and the `attw` check in the
  root `CLAUDE.md` cover the package metadata.
- **`provideInlineIconSprite()`.** The docs app serves the sprite file, so only that route runs here. The inline
  route is covered by `libs/ui/src/components/icon/icon-inline-sprite.spec.ts`.

Never publish to the public npm registry from this skill. Releases go through `nx release` and `release.yml`.
