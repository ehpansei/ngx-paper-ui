import { expect, test } from '@playwright/test';

test.describe('theming', () => {
  test('each [libTheme] scope derives its own primary', async ({ page }) => {
    await page.goto('/lib-theme');
    const fills = await page
      .locator('.doc-theme-row button.ui-btn-primary')
      .evaluateAll((els) => els.map((e) => getComputedStyle(e).backgroundColor));
    expect(fills).toHaveLength(8); // Custom + 7 presets
    expect(new Set(fills).size).toBe(fills.length);
  });

  test('the custom primary picker reports contrast', async ({ page }) => {
    await page.goto('/lib-theme');
    await page.locator('#pc').fill('#e9dcc6');
    await expect(page.locator('lib-badge', { hasText: 'Below 4.5:1' })).toBeVisible();
    await page.locator('#pc').fill('#3b2f25');
    await expect(page.locator('lib-badge', { hasText: 'Passes 4.5:1' })).toBeVisible();
  });
});
