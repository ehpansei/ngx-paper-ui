import { expect, test } from '@playwright/test';

test.describe('icons', () => {
  test('are drawn from the SVG sprite', async ({ page }) => {
    const sprite = page.waitForResponse((r) => r.url().endsWith('/assets/ui/icons.svg'));
    await page.goto('/lib-icon');
    expect((await sprite).status()).toBe(200);

    const cells = page.locator('.doc-icon-cell');
    await expect(cells).toHaveCount(31);
    await expect(cells.first().locator('use')).toHaveAttribute('href', 'assets/ui/icons.svg#alert');

    // The <use> resolved: the referenced shapes give the icon a painted bounding box.
    const box = await cells.first().locator('svg').evaluate((svg) => {
      const { width, height } = (svg as SVGGraphicsElement).getBBox();
      return { width, height };
    });
    expect(box.width).toBeGreaterThan(10);
    expect(box.height).toBeGreaterThan(10);
  });

  test('inherit the text colour and the size tokens', async ({ page }) => {
    await page.goto('/lib-button');
    const icon = page.locator('button.ui-btn-primary lib-icon svg').first();
    const { stroke, color } = await icon.evaluate((svg) => ({
      stroke: getComputedStyle(svg).stroke,
      color: getComputedStyle(svg).color,
    }));
    expect(stroke).toBe(color);
    await expect(page.locator('button.ui-btn-sm lib-icon svg').first()).toHaveAttribute('width', '16');
  });
});
