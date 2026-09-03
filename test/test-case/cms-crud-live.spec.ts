import { expect, test } from '@playwright/test';
import { loginWithCleanState } from '../utils/auth-helper';

const adminEmail = process.env.ADMIN_EMAIL || 'admin@pyxis.co.id';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
const marker = `E2E-${Date.now()}`;

test.setTimeout(120_000);

async function deleteProduct(page: Parameters<typeof loginWithCleanState>[0], name: string) {
  await page.goto('/admin/products');
  const row = page.getByText(name, { exact: true }).first();
  if (!(await row.isVisible().catch(() => false))) return;
  const action = page.getByRole('button', { name: `Aksi ${name}` });
  await action.click();
  await page.getByText('Hapus Produk', { exact: true }).click();
  await page.getByRole('button', { name: 'Ya, Hapus Produk' }).click();
  await expect(page.getByText(name, { exact: true })).toHaveCount(0);
}

async function deleteCareer(page: Parameters<typeof loginWithCleanState>[0], title: string) {
  await page.goto('/admin/careers');
  const row = page.getByText(title, { exact: true }).first();
  if (!(await row.isVisible().catch(() => false))) return;
  await page.getByRole('button', { name: `Hapus ${title}` }).click();
  await page.getByRole('button', { name: 'Hapus Lowongan' }).click();
  await expect(page.getByText(title, { exact: true })).toHaveCount(0);
}

async function deleteArticle(page: Parameters<typeof loginWithCleanState>[0], title: string) {
  await page.goto('/admin/blog');
  const row = page.getByText(title, { exact: true }).first();
  if (!(await row.isVisible().catch(() => false))) return;
  await page.getByRole('button', { name: `Hapus artikel ${title}` }).click();
  await page.getByRole('button', { name: 'Hapus artikel' }).click();
  await expect(page.getByText(title, { exact: true })).toHaveCount(0);
}

test('admin dapat CRUD Produk, Blog, dan Karier', async ({ page }) => {
  await loginWithCleanState(page, adminEmail, adminPassword);

  const product = `${marker} Product`;
  try {
    await page.goto('/admin/products/new');
    await page.locator('#name').fill(product);
    await page.locator('#slug').fill(product.toLowerCase().replaceAll(' ', '-'));
    await page.locator('#description').fill('Data uji produk Pyxis.');
    await page.locator('#featureSubtitle').fill('Deskripsi data uji untuk validasi CRUD.');
    await page.locator('#main-image').setInputFiles('public/assets/img/home-hero-hotel-lobby.jpg');
    await page.getByRole('button', { name: 'Simpan produk' }).click();
    await page.waitForURL(/\/admin\/products$/);
    await expect(page.getByText(product, { exact: true })).toBeVisible();

    await page.getByRole('button', { name: `Aksi ${product}` }).click();
    await page.getByText('Edit Produk', { exact: true }).click();
    await page.locator('#description').fill('Data uji produk Pyxis diperbarui.');
    await page.getByRole('button', { name: 'Simpan perubahan' }).click();
    await page.waitForURL(/\/admin\/products$/);
    await deleteProduct(page, product);
  } finally {
    await deleteProduct(page, product);
  }

  const career = `${marker} Career`;
  try {
    await page.goto('/admin/careers/new');
    await page.locator('#title').fill(career);
    await page.locator('#department').fill('Engineering');
    await page.locator('#location').fill('Remote');
    await page.locator('#type').fill('Full-time');
    await page.locator('#description').fill('Deskripsi data uji lowongan.');
    await page.locator('#responsibilities-0').fill('Menjalankan validasi data uji.');
    await page.locator('#requirements-0').fill('Memahami proses QA.');
    await page.getByRole('button', { name: 'Simpan Lowongan' }).click();
    await page.waitForURL(/\/admin\/careers$/);
    await expect(page.getByText(career, { exact: true })).toBeVisible();

    await page.getByRole('link', { name: `Edit ${career}` }).click();
    await page.locator('#location').fill('Jakarta / Remote');
    await page.getByRole('button', { name: 'Simpan Lowongan' }).click();
    await page.waitForURL(/\/admin\/careers$/);
    await deleteCareer(page, career);
  } finally {
    await deleteCareer(page, career);
  }

  await page.goto('/admin/blog');
  await page.getByRole('link', { name: 'Tulis artikel' }).first().click();
  const title = `${marker} Article`;
  const categories = page.locator('[role="checkbox"]');
  if ((await categories.count()) === 0) {
    test.info().annotations.push({ type: 'skipped', description: 'Blog belum memiliki kategori.' });
    return;
  }

  try {
    await page.locator('#title').fill(title);
    await page.locator('.tiptap[contenteditable="true"]').fill('Konten artikel data uji.');
    await categories.first().click();
    await page.getByRole('button', { name: 'Simpan draft' }).click();
    await page.waitForURL(/\/admin\/blog$/);
    await expect(page.getByText(title, { exact: true })).toBeVisible();
    await deleteArticle(page, title);
  } finally {
    await deleteArticle(page, title);
  }
});
