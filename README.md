# ngx-paper-ui

**Paper UI for Angular.** Ink-on-paper components with one configurable colour, Signal Forms controls and a
config-driven form.

- **Using the library:** see the package README, [`libs/ui/README.md`](libs/ui/README.md) (also the npm page).
- **Docs and live examples:** https://ehpansei.github.io/ngx-paper-ui/

```sh
npm i ngx-paper-ui @angular/cdk
```

## Working on it

This is an Nx workspace: the library (`libs/ui`), its docs site (`apps/ui-demo-app`), an e2e suite, and the tool
that syncs the Paper UI design system.

```sh
npm ci
npm run docs   # docs site on http://localhost:4200
npm test       # unit tests
npm run e2e    # Playwright (run `npx playwright install chromium` once)
npm run build  # the package, in dist/libs/ui
```

Contributor and architecture notes are in [`CLAUDE.md`](CLAUDE.md) and [`libs/ui/CLAUDE.md`](libs/ui/CLAUDE.md).

## License

[MIT](LICENSE) © 2026 Pedro Castro
