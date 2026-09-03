import { expect, test } from '@playwright/test';

for (const path of [
  '/',
  '/about',
  '/products',
  '/blog',
  '/careers',
  '/contact',
  '/legal',
  '/partners',
]) {
  test(`${path} dapat dibuka pada viewport mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    const response = await page.goto(path);

    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      360
    );
  });
}
