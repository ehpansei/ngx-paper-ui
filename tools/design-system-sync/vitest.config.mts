import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  test: {
    name: 'design-system-sync',
    environment: 'node',
    include: ['lib/**/*.spec.mjs'],
    watch: false,
  },
});
