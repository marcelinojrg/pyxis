import { ProductListHeader, ProductTable } from '@/app/(admin)/_components/products/ProductTable';
import { getAdminProducts } from '@/services/admin/products';

export const metadata = { title: 'Manage products — Pyxis Admin' };

export default async function AdminProductsPage() {
  const result = await getAdminProducts();

  return (
    <div className="space-y-8 min-w-0 w-full">
      <ProductListHeader />
      <ProductTable
        products={result.data || []}
        error={result.success ? undefined : result.error}
      />
    </div>
  );
}
