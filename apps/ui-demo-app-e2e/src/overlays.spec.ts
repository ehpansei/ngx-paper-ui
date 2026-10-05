import { expect, test } from '@playwright/test';

test.describe('overlays', () => {
  test('modal opens in a CDK dialog, returns its result and closes with Escape', async ({ page }) => {
    await page.goto('/lib-modal');
    const overlay = page.locator('.cdk-overlay-container');
    const open = page.getByRole('button', { name: 'Open in a CDK Dialog' });

    await open.click();
    const dialog = overlay.getByRole('dialog', { name: 'New project' });
    await expect(dialog).toBeVisible();
    // The panel is the design system's 440px, not CDK's default 80vw.
    expect(await dialog.evaluate((e) => e.getBoundingClientRect().width)).toBeLessThanOrEqual(440);

    await expect(dialog.getByRole('button', { name: 'Create' })).toBeDisabled();
    await dialog.getByLabel('Name').fill('Launch');
    await dialog.getByRole('button', { name: 'Create' }).click();
    await expect(dialog).toBeHidden();
    await expect(page.locator('.doc-hint')).toHaveText('Created “Launch”');

    await open.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('ConfirmService.ask resolves with the choice', async ({ page }) => {
    await page.goto('/lib-confirm-dialog');
    const ask = page.getByRole('button', { name: 'Delete…' });
    const alert = page.locator('.cdk-overlay-container').getByRole('alertdialog');

    await ask.click();
    await alert.getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('.doc-hint')).toHaveText('ask() resolved true');

    await ask.click();
    await alert.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('.doc-hint')).toHaveText('ask() resolved false');
  });

  test('toasts show once and run their action', async ({ page }) => {
    await page.goto('/lib-toast');
    const toaster = page.locator('lib-toaster');
    await page.getByRole('button', { name: 'Show a toast' }).click();
    await expect(toaster.locator('lib-toast')).toHaveCount(1);
    await expect(toaster.locator('lib-toast')).toHaveText(/Copied/);

    await page.getByRole('button', { name: 'With Undo' }).click();
    await toaster.getByRole('button', { name: 'Undo' }).click();
    await expect(toaster.locator('lib-toast', { hasText: 'Restored' })).toBeVisible();
  });
});
