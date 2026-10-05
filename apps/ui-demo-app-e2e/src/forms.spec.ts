import { expect, test } from '@playwright/test';

test.describe('form controls', () => {
  test('text input shows its Signal Forms error only after blur', async ({ page }) => {
    await page.goto('/lib-text-input');
    const panel = page.locator('.doc-panel');
    const name = panel.getByLabel('Project name');
    await name.fill('');
    await expect(panel.locator('.ui-helper.is-error')).toHaveCount(0);
    await name.blur();
    await expect(panel.locator('.ui-helper.is-error').first()).toHaveText('Name is required');
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await name.fill('Launch');
    await expect(panel.locator('.doc-note')).toContainText('valid: true');
  });

  test('select opens and picks with the keyboard', async ({ page }) => {
    await page.goto('/lib-select');
    const trigger = page.locator('lib-select', { hasText: 'Signal Forms' }).locator('button.ui-select-trigger');
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveText(/Editor/);
    await expect(page.locator('.doc-note')).toContainText('Signal Forms value: editor');
  });

  test('password field reveals and hides its value', async ({ page }) => {
    await page.goto('/lib-password-field');
    const field = page.locator('lib-password-field').first();
    const input = field.locator('input');
    await expect(input).toHaveAttribute('type', 'password');
    await field.getByRole('button', { name: 'Reveal password' }).click();
    await expect(input).toHaveAttribute('type', 'text');
    await field.getByRole('button', { name: 'Hide password' }).click();
    await expect(input).toHaveAttribute('type', 'password');
  });

  test('checkbox validates through Signal Forms', async ({ page }) => {
    await page.goto('/lib-checkbox');
    const panel = page.locator('.doc-panel');
    await expect(panel.locator('.doc-note')).toContainText('valid: false');
    await panel.getByText('I accept the terms').click();
    await expect(panel.locator('.doc-note')).toContainText('terms: true');
    await expect(panel.locator('.doc-note')).toContainText('valid: true');
  });
});

test.describe('config form (lib-form)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lib-form');
  });

  const signup = (page: import('@playwright/test').Page) => page.locator('.doc-panel', { hasText: 'Create account' }).first();

  test('an empty submit shows every error and submits nothing', async ({ page }) => {
    const panel = signup(page);
    await panel.getByRole('button', { name: 'Create account' }).click();
    await expect(panel.locator('.ui-helper.is-error')).toHaveText(['Full name is required', 'Add your email', 'Choose a role']);
    await expect(panel.locator('.doc-note')).toContainText('Blocked submits: 1');
    await expect(panel.locator('pre')).toHaveCount(0);
  });

  test('field rules report as you leave each field', async ({ page }) => {
    const panel = signup(page);
    await panel.getByLabel('Full name').fill('A');
    await panel.getByLabel('Full name').blur();
    await expect(panel.locator('.ui-helper.is-error')).toHaveText(['Use at least 2 characters']);
    await panel.getByLabel('Website').fill('ana.dev');
    await panel.getByLabel('Website').blur();
    await expect(panel.locator('.ui-helper.is-error')).toContainText(['Start with http:// or https://']);
  });

  test('a valid submit emits the values and confirms with a toast', async ({ page }) => {
    const panel = signup(page);
    await panel.getByLabel('Full name').fill('Ana Silva');
    await panel.getByLabel('Email').fill('ana@example.com');
    await panel.getByLabel('Website').fill('https://ana.dev');
    await panel.locator('lib-select button.ui-select-trigger').click();
    await panel.getByRole('option', { name: 'Editor' }).click();
    await panel.getByRole('button', { name: 'Create account' }).click();
    await expect(panel.locator('pre')).toContainText('"email": "ana@example.com"');
    await expect(panel.locator('pre')).toContainText('"role": "editor"');
    await expect(page.locator('lib-toaster lib-toast', { hasText: 'Account created' })).toBeVisible();
  });

  test('the settings example is pre-filled and submits its disabled field too', async ({ page }) => {
    const panel = page.locator('.doc-panel', { hasText: 'Account settings' }).first();
    await expect(panel.getByLabel('Display name')).toHaveValue('Pedro Castro');
    await expect(panel.getByLabel('Plan')).toBeDisabled();
    await panel.getByRole('button', { name: 'Save changes' }).click();
    await expect(panel.locator('pre')).toContainText('"plan": "Free"');
    await expect(panel.locator('pre')).toContainText('"timeout": 15');
  });

  test('the documented configs are the running ones', async ({ page }) => {
    await expect(page.locator('pre.doc-code', { hasText: '"key": "website"' })).toContainText('"message": "Start with http:// or https://"');
    await expect(page.getByRole('heading', { level: 3, name: 'Field config' })).toBeVisible();
  });
});
