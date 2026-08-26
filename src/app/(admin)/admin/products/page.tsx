import { ProductListHeader, ProductTable } from '@/app/(admin)/_components/products/ProductTable';
import { getAdminProducts } from '@/services/admin/products';

export const metadata = { title: 'Kelola Produk â€” Pyxis Admin' };

export default async function AdminProductsPage() {
  const result = await getAdminProducts();

  return (
    <div className="mx-auto max-w-6xl space-y-9">
      <ProductListHeader />
      <ProductTable products={result.data || []} />
    </div>
  );
}
