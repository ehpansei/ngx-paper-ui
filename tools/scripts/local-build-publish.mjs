// Builds the library and publishes it to the local Verdaccio, replacing the same version if it's already there.
// Run with `npm run local-build-publish`. Verdaccio must be running on :4873 (anonymous publish and unpublish are
// allowed by .verdaccio/config.yml). It never bumps the version and never publishes to npm.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const REGISTRY = 'http://localhost:4873';
const DIST = 'dist/libs/ui';
// npm refuses to publish without a token for the registry; Verdaccio ignores its value.
const AUTH = '--//localhost:4873/:_authToken=local-verdaccio';

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'inherit', ...opts });
const npm = (...args) => run('npm', [...args, '--registry', REGISTRY, AUTH]);

try {
  const res = await fetch(`${REGISTRY}/-/ping`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (err) {
  console.error(`Verdaccio isn't answering on ${REGISTRY} (${err.message}). Start it first.`);
  process.exit(1);
}

run('npx', ['nx', 'build', 'ui']);

const { name, version } = JSON.parse(readFileSync(join(DIST, 'package.json'), 'utf8'));
const spec = `${name}@${version}`;

let published = false;
try {
  execFileSync('npm', ['view', spec, 'version', '--registry', REGISTRY], { stdio: 'pipe' });
  published = true;
} catch {
  // E404: not published yet.
}
if (published) {
  console.log(`Unpublishing ${spec} from ${REGISTRY}`);
  npm('unpublish', spec, '--force');
}

// publishConfig asks for provenance, which only a CI run can generate.
npm('publish', DIST, '--provenance=false');
console.log(`Published ${spec} to ${REGISTRY}`);
