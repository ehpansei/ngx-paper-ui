/*
 * Loads every staged preview.html headless the way the design-system page frames it — tokens.css, bundle.css and
 * bundle.js preloaded, <html data-theme="light"> — and fails on page errors or an empty #showcase.
 * Only locally built files run here; nothing fetched from the design system is executed.
 */
import { chromium } from '@playwright/test';
import { join } from 'node:path';
import { read, walk } from './fsutil.mjs';
import { LOCAL, TOKENS_CSS } from './paths.mjs';

export async function check() {
  const project = join(LOCAL, 'project');
  const css = read(TOKENS_CSS) + '\n' + read(join(project, 'components/bundle.css'));
  const js = read(join(project, 'components/bundle.js'));
  if (!js) throw new Error('no staged bundle.js — run `cli.mjs stage` first');
  const previews = walk(join(project, 'components')).filter((p) => p.endsWith('/preview.html'));
  const browser = await chromium.launch();
  const failures = [];
  for (const p of previews) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && !/fonts\.g/.test(m.text()) && errors.push(m.text()));
    const html = read(join(project, 'components', p))
      .replace('<html>', '<html data-theme="light">')
      .replace('<head>', `<head><style>${css.replace(/<\/style/gi, '<\\/style')}</style><script>${js}</script>`);
    await page.setContent(html, { waitUntil: 'load' });
    await page.waitForFunction(() => (document.getElementById('showcase')?.childElementCount ?? 0) > 0, null, { timeout: 5000 }).catch(() => errors.push('#showcase stayed empty'));
    // Only icons that are laid out (hidden drawers/columns have no box); their painted geometry comes from the sprite.
    const icons = await page.evaluate(() =>
      [...document.querySelectorAll('lib-icon svg')].filter((svg) => svg.getBoundingClientRect().width > 0).map((svg) => svg.getBBox().width),
    );
    if (icons.length && icons.some((w) => w === 0)) errors.push(`${icons.filter((w) => w === 0).length}/${icons.length} icons did not paint`);
    if (errors.length) failures.push(`${p}: ${errors.join(' | ')}`);
    await page.close();
  }
  await browser.close();
  console.log(`checked ${previews.length} previews: ${failures.length ? 'FAILED' : 'all mounted, no errors'}`);
  if (failures.length) {
    console.log(failures.join('\n'));
    process.exitCode = 1;
  }
}
