'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState, useTransition } from 'react';
import { flushSync } from 'react-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  Edit3,
  ExternalLink,
  MoreHorizontal,
  Package,
  PackageOpen,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  TriangleAlert,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteProductById } from '@/services/admin/products';

export interface ProductTableItem {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  order: number;
  isActive: boolean;
}

interface ProductTableProps {
  products: ProductTableItem[];
  error?: string;
}

function ProductActions({ product }: { product: ProductTableItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function removeProduct() {
    startTransition(async () => {
      const result = await deleteProductById(product.id);
      if (!result.success) {
        toast.error(result.error || 'Failed to delete the product.');
        return;
      }
      flushSync(() => setOpen(false));
      toast.success(result.message || 'Product deleted.');
      router.refresh();
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label={`Actions for ${product.name}`}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 rounded-lg p-1 shadow-md border-slate-200">
          <DropdownMenuItem asChild className="rounded-md text-xs font-medium cursor-pointer">
            <Link
              href={`/admin/products/${product.id}/edit` as Route}
              className="flex items-center gap-2"
            >
              <Edit3 className="h-3.5 w-3.5 text-blue-600" />
              <span>Edit product</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="rounded-md text-xs font-medium cursor-pointer">
            <Link
              href={`/products/${product.slug}` as Route}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
              <span>View on website</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setOpen(true)}
            className="rounded-md text-xs font-medium text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="max-w-md gap-4 rounded-xl p-6">
          <DialogHeader className="gap-2.5 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <TriangleAlert className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                Delete &ldquo;{product.name}&rdquo;?
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs leading-relaxed text-slate-500">
                This action is permanent. All related benefits, features, and capability groups will
                be removed from the system.
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="rounded-lg border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={removeProduct}
              disabled={isPending}
              className="rounded-lg bg-red-600 text-xs font-semibold text-white shadow-xs hover:bg-red-700"
            >
              {isPending ? 'Deleting...' : 'Yes, delete product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProductTable({ products, error }: ProductTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');

  const filteredProducts = useMemo(() => {
    let result = products;

    if (filterStatus === 'active') {
      result = result.filter((p) => p.isActive);
    } else if (filterStatus === 'draft') {
      result = result.filter((p) => !p.isActive);
    }

    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((product) =>
        `${product.name} ${product.slug}`.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, search, filterStatus]);

  const activeCount = useMemo(() => products.filter((p) => p.isActive).length, [products]);
  const draftCount = useMemo(() => products.filter((p) => !p.isActive).length, [products]);

  const columns = useMemo<ColumnDef<ProductTableItem>[]>(
    () => [
      {
        id: 'image',
        header: 'Thumbnail',
        cell: ({ row }) =>
          row.original.image ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <Image
                src={row.original.image}
                alt={`Thumbnail ${row.original.name}`}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500">
              <Package className="h-4 w-4" />
            </div>
          ),
      },
      {
        accessorKey: 'name',
        header: 'Product name',
        cell: ({ row }) => (
          <div className="min-w-[180px]">
            <Link
              href={`/admin/products/${row.original.id}/edit` as Route}
              className="font-semibold text-slate-900 hover:text-blue-600 transition-colors block leading-tight text-xs sm:text-sm"
            >
              {row.original.name}
            </Link>
            <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
              /{row.original.slug}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'order',
        header: 'Order',
        cell: ({ row }) => (
          <span className="text-xs tabular-nums text-slate-600">{row.original.order}</span>
        ),
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) =>
          row.original.isActive ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              Draft
            </span>
          ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end">
            <ProductActions product={row.original} />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Control Bar: Search & Status Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products by name or slug..."
            aria-label="Search products"
            className="h-9 rounded-lg border-slate-200 bg-white pl-9 pr-8 text-xs shadow-none transition-colors placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div
          className="flex flex-wrap items-center gap-1 self-start rounded-lg border border-slate-200 bg-slate-50 p-0.5 sm:self-auto"
          role="group"
          aria-label="Filter product status"
        >
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            aria-pressed={filterStatus === 'all'}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('active')}
            aria-pressed={filterStatus === 'active'}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              filterStatus === 'active'
                ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('draft')}
            aria-pressed={filterStatus === 'draft'}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              filterStatus === 'draft'
                ? 'bg-white text-slate-800 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Draft ({draftCount})
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-xs">
        {error ? (
          <div
            className="flex min-h-56 flex-col items-center justify-center p-8 text-center"
            role="alert"
          >
            <TriangleAlert className="h-7 w-7 text-red-600" aria-hidden />
            <h2 className="mt-3 text-sm font-bold text-slate-900">Failed to load products</h2>
            <p className="mt-1 max-w-md text-xs text-slate-500">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => router.refresh()}>
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" aria-hidden /> Reload
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <PackageOpen className="h-6 w-6" />
            </div>
            <h2 className="mt-3 text-sm font-bold text-slate-900">No products yet</h2>
            <p className="mt-0.5 text-xs text-slate-500 max-w-sm">
              Add your first product to show Pyxis services on the public website.
            </p>
            <Button
              asChild
              size="sm"
              className="mt-4 rounded-lg bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs"
            >
              <Link href={'/admin/products/new' as Route}>
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add new product
              </Link>
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center p-8 text-center">
            <Search className="h-6 w-6 text-slate-300" />
            <p className="mt-2 text-xs font-bold text-slate-700">Product not found</p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              No results for &ldquo;{search}&rdquo;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('');
                setFilterStatus('all');
              }}
              className="mt-3 rounded-lg text-xs"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                {table.getHeaderGroups().map((group) => (
                  <TableRow key={group.id}>
                    {group.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-slate-100 transition-colors hover:bg-slate-50/60"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}

export function ProductListHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Manage products and services
        </h1>
        <p className="mt-0.5 text-xs text-slate-500">
          Manage Pyxis technology products, solution systems, and capabilities.
        </p>
      </div>

      <Button
        asChild
        size="sm"
        className="h-9 rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs self-start sm:self-auto"
      >
        <Link href={'/admin/products/new' as Route} className="flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          <span>Add new product</span>
        </Link>
      </Button>
    </div>
  );
}
