import { expect, test } from '@playwright/test';

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('the shell collapses to a header with a navigation drawer', async ({ page }) => {
    await page.goto('/lib-button');
    const shell = page.locator('app-root > lib-main-view');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(shell).toHaveClass(/is-nav-open/);
    await page.getByRole('button', { name: 'Forms' }).click();
    await page.getByRole('link', { name: 'Checkbox' }).click();
    await expect(page).toHaveURL(/\/lib-checkbox$/);
    await expect(shell).not.toHaveClass(/is-nav-open/);
  });

  test('Escape closes the drawer', async ({ page }) => {
    await page.goto('/lib-overview');
    const shell = page.locator('app-root > lib-main-view');
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(shell).toHaveClass(/is-nav-open/);
    await page.keyboard.press('Escape');
    await expect(shell).not.toHaveClass(/is-nav-open/);
  });
});

test.describe('MainView showcase', () => {
  test('mobile device: detail takes over the view and Back returns', async ({ page }) => {
    await page.goto('/lib-main-view');
    const device = page.locator('.doc-device lib-main-view');
    await device.locator('button.ui-card').first().click();
    await expect(device).toHaveClass(/is-detail-open/);
    await device.getByRole('button', { name: 'Back' }).click();
    await expect(device).not.toHaveClass(/is-detail-open/);
  });

  test('desktop device: sidebar, main and detail columns', async ({ page }) => {
    await page.goto('/lib-main-view');
    await page.getByRole('tab', { name: 'Desktop · lg' }).click();
    const device = page.locator('.doc-device lib-main-view');
    await expect(device.locator('.ui-app-header')).toBeHidden();
    await expect(device.locator('.ui-app-nav')).toBeVisible();
    await expect(device.locator('.ui-aside')).toBeVisible();
  });
});
