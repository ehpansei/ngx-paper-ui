import nx from '@nx/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
            '{projectRoot}/vite.config.{js,ts,mts}',
            '{projectRoot}/src/test-setup.ts',
            '{projectRoot}/src/**/*.spec.ts',
          ],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          // Native-element components (button[libButton], a[libNavItem]) use attribute selectors.
          type: ['element', 'attribute'],
          prefix: 'lib',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Templates are Prettier-formatted (one attribute per line; see the .prettierrc override). `--fix` rewrites them.
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
      // Icon-only libButton / lib-toast buttons get their accessible name from the \`label\` input (-> aria-label).
      '@angular-eslint/template/elements-content': ['error', { allowList: ['label'] }],
    },
  },
];
