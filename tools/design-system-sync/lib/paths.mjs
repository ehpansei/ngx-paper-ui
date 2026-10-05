import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Every filesystem location the sync touches, in one place. */
export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../../..');
export const r = (...p) => join(ROOT, ...p);

export const ARTIFACT_URL = 'https://claude.ai/artifact/YamgBYyuomodpWN4SFgSTB';
export const NAMESPACE = 'PaperUI';

export const LIB = r('libs/ui');
export const LIB_SRC = r('libs/ui/src');
export const TOKENS_JSON = r('libs/ui/src/styles/tokens/tokens.json');
export const TOKENS_CSS = r('libs/ui/src/styles/tokens/tokens.css');
export const DERIVED_TOKENS = r('libs/ui/src/styles/tokens/derived-tokens.json');
export const STYLES_ENTRY = r('libs/ui/src/styles/index.css');
export const PAPER_UI_CSS = r('libs/ui/src/styles/paper-ui');
export const ICONS_DIR = r('libs/ui/src/assets/icons');
export const BRAND_BOOK = r('libs/ui/docs/brand-book.md');
export const PAGES = r('apps/ui-demo-app/src/app/pages');
export const SAMPLE_DATA = r('apps/ui-demo-app/src/app/docs/sample-data.ts');

/** Committed sync state: last agreed hashes + base copies of the two-way files. */
export const STATE_DIR = r('libs/ui/design-system');
export const STATE_FILE = join(STATE_DIR, 'sync-state.json');
export const BASE_DIR = join(STATE_DIR, 'base');

/** Scratch (gitignored). */
export const WORK = r('dist/ds-sync');
export const LOCAL = join(WORK, 'local');    // repo side rendered as DS files
export const REMOTE = join(WORK, 'remote');  // DS side, fetched by Claude with the Artifact tool
export const OUT = join(WORK, 'out');        // exactly what to publish
export const BUILD = join(WORK, 'build');    // bundle entry + output
export const PLAN = join(WORK, 'plan.json');
export const DECISIONS = join(WORK, 'decisions.json');
export const UPLOADS = join(WORK, 'uploads.json');
