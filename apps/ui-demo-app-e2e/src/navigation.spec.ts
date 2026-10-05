import { expect, Page, test } from '@playwright/test';

/** Collects uncaught exceptions and console errors. */
function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  return errors;
}

test.describe('docs shell', () => {
  test('redirects to the overview', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/lib-overview$/);
    await expect(page).toHaveTitle('Overview — Paper UI');
    await expect(page.getByRole('heading', { level: 1, name: 'Paper UI' })).toBeVisible();
  });

  test('unknown routes fall back to the overview', async ({ page }) => {
    await page.goto('/does-not-exist');
    await expect(page).toHaveURL(/\/lib-overview$/);
  });

  test('every sidebar link opens its page without errors', async ({ page }) => {
    const errors = collectErrors(page);

    await page.goto('/lib-overview');
    const nav = page.locator('lib-sidebar a.ui-nav-item');
    const count = await nav.count();
    expect(count).toBe(30);

    // Sections outside the current page start collapsed; open them all, parents before their sub-groups.
    // Wait for each toggle to re-render before querying again, or the same toggle gets clicked twice.
    const closed = page.locator('lib-sidebar .ui-nav-section-toggle[aria-expanded="false"]');
    for (let n = await closed.count(); n > 0; n = await closed.count()) {
      const title = String(await closed.first().textContent()).trim();
      await closed.first().click();
      await expect(page.locator('lib-sidebar').getByRole('button', { name: title, exact: true })).toHaveAttribute('aria-expanded', 'true');
    }

    for (let i = 0; i < count; i++) {
      const link = nav.nth(i);
      const label = (await link.innerText()).trim();
      await link.click();
      await expect(link, label).toHaveClass(/is-active/);
      await expect(page.locator('lib-main-view main h1').last(), label).toBeVisible();
    }
    expect(errors).toEqual([]);
  });

  test('sidebar sections open for the current page and toggle', async ({ page }) => {
    await page.goto('/lib-strength-meter');
    const forms = page.locator('lib-sidebar .ui-nav-section-toggle', { hasText: 'Forms' });
    const passwords = page.locator('lib-sidebar .ui-nav-section-toggle', { hasText: 'Passwords' });
    const actions = page.locator('lib-sidebar .ui-nav-section-toggle', { hasText: 'Actions' });
    await expect(forms).toHaveAttribute('aria-expanded', 'true');
    await expect(passwords).toHaveAttribute('aria-expanded', 'true');
    await expect(actions).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.ui-pane-title')).toHaveText('Forms');

    const button = page.locator('lib-sidebar a.ui-nav-item', { hasText: 'Button' });
    await expect(button).toBeHidden();
    await actions.click();
    await expect(actions).toHaveAttribute('aria-expanded', 'true');
    await expect(button).toBeVisible();

    await forms.click();
    await expect(page.locator('lib-sidebar a.ui-nav-item', { hasText: 'Strength meter' })).toBeHidden();
  });

  test('component pages have Showcase, API and CSS tokens sections', async ({ page }) => {
    await page.goto('/lib-button');
    await expect(page.locator('.ui-pane-title')).toHaveText('Actions');
    await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible();
    for (const section of ['Showcase', 'API', 'CSS tokens']) {
      await expect(page.getByRole('heading', { level: 2, name: section })).toBeVisible();
    }
    await expect(page.locator('app-token-table').getByText('--button-primary-bg', { exact: true })).toBeVisible();
  });

  test('showcase blocks get the stage gap', async ({ page }) => {
    await page.goto('/lib-button');
    await expect(page.locator('.doc-stage .doc-row')).toHaveCount(4);
    const gap = await page.evaluate(() => {
      const [a, b] = [...document.querySelectorAll('.doc-stage .doc-row')].map((r) => r.getBoundingClientRect());
      return b.top - a.bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(12);
  });

  test('dark mode switches the document theme', async ({ page }) => {
    await page.goto('/lib-tokens');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');
    await page.locator('lib-switch[libmainactions] label').click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
    const bg = await page.evaluate(() => getComputedStyle(document.querySelector('.ui-pane') as Element).backgroundColor);
    expect(bg).toBe('rgb(27, 23, 18)'); // surface, dark: #1b1712
  });
});
