import { expect, test } from '@playwright/test';

for (const path of ['/admin', '/admin/products', '/admin/blog', '/admin/careers']) {
  test(`pengunjung tanpa sesi tidak dapat membuka ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login(?:\?|$)/);
  });
}
