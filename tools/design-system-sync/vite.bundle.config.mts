/// <reference types='vitest' />
// Builds the design system's live-preview runtime: ONE classic script assigning window.PaperUI = { mount, components },
// AOT-compiled Angular + the docs showcases. Entry: dist/ds-sync/build/mount.ts (written by `cli.mjs stage`).
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { join } from 'node:path';
import { defineConfig } from 'vite';

const here = import.meta.dirname;
const root = join(here, '../..');
const build = join(root, 'dist/ds-sync/build');

export default defineConfig({
  root: here,
  cacheDir: join(root, 'node_modules/.vite/ds-bundle'),
  plugins: [angular({ tsconfig: join(here, 'tsconfig.bundle.json'), jit: false, liveReload: false }), nxViteTsPaths()],
  define: { 'process.env.NODE_ENV': '"production"', ngDevMode: 'false' },
  build: {
    outDir: build,
    emptyOutDir: false,
    minify: 'esbuild',
    target: 'es2022',
    lib: { entry: join(build, 'mount.ts'), formats: ['iife'], name: 'PaperUI', fileName: () => 'bundle.js' },
    rollupOptions: { output: { extend: true } },
  },
});
