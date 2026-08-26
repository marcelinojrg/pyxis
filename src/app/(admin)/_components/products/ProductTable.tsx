'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState, useTransition } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  Edit3,
  MoreHorizontal,
  PackageOpen,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
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
}

function ProductActions({ product }: { product: ProductTableItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function removeProduct() {
    startTransition(async () => {
      const result = await deleteProductById(product.id);
      if (!result.success) {
        toast.error(result.error || 'Produk gagal dihapus.');
        return;
      }
      toast.success(result.message || 'Produk berhasil dihapus.');
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`Aksi ${product.name}`}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem asChild>
            <Link href={`/admin/products/${product.id}/edit` as Route}>
              <Edit3 /> Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setOpen(true)}>
            <Trash2 /> Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="max-w-md gap-5 p-6">
          <DialogHeader className="gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <TriangleAlert className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl font-bold text-[#172033]">
              Hapus produk ini?
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-[#4D5361]">
              Tindakan ini tidak bisa dibatalkan. Produk yang dihapus akan hilang permanen dari
              sistem.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Batal
            </Button>
            <Button variant="destructive" onClick={removeProduct} disabled={isPending}>
              {isPending ? 'Menghapus...' : 'Hapus'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ProductTable({ products }: ProductTableProps) {
  const [search, setSearch] = useState('');
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) =>
      `${product.name} ${product.slug}`.toLowerCase().includes(query)
    );
  }, [products, search]);

  const columns = useMemo<ColumnDef<ProductTableItem>[]>(
    () => [
      {
        id: 'image',
        header: 'Thumbnail',
        cell: ({ row }) =>
          row.original.image ? (
            <div className="relative h-12 w-12 overflow-hidden rounded-md border border-[#DCE1EA] bg-[#F8FAFC]">
              <Image
                src={row.original.image}
                alt={`Thumbnail ${row.original.name}`}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#EEF3FF] text-[#7A8394]">
              <PackageOpen className="h-5 w-5" />
            </div>
          ),
      },
      {
        accessorKey: 'name',
        header: 'Nama Produk',
        cell: ({ row }) => (
          <span className="font-semibold text-[#172033]">{row.original.name}</span>
        ),
      },
      {
        accessorKey: 'slug',
        header: 'Slug',
        cell: ({ row }) => (
          <span className="font-mono text-xs text-[#4D5361]">{row.original.slug}</span>
        ),
      },
      {
        accessorKey: 'order',
        header: 'Urutan',
        cell: ({ row }) => <span className="text-[#4D5361]">{row.original.order}</span>,
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) =>
          row.original.isActive ? (
            <Badge className="border-0 bg-[#E1F7EA] text-[#159447]">Aktif</Badge>
          ) : (
            <Badge className="border-0 bg-[#E7EAF7] text-[#59627A]">Draft</Badge>
          ),
      },
      {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => <ProductActions product={row.original} />,
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
    <section className="min-w-0 overflow-hidden rounded-xl border border-[#E3E7EE] bg-white p-4 shadow-[0_8px_24px_rgba(30,41,59,0.04)] sm:p-6">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8394]" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari produk..."
          className="h-12 border-[#C7CFDF] pl-10 text-base"
        />
      </div>
      {products.length === 0 ? (
        <div className="flex min-h-88 flex-col items-center justify-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F1F4FF] text-[#7A8394]">
            <PackageOpen className="h-10 w-10" />
          </div>
          <h2 className="mt-6 text-xl font-bold text-[#172033]">Belum ada produk</h2>
          <p className="mt-2 text-sm text-[#5A6272]">
            Tambahkan produk pertamamu untuk mulai mengelola layanan Pyxis.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center text-sm text-[#5A6272]">
          Produk tidak ditemukan.
        </div>
      ) : (
        <div className="mt-7 min-w-0 overflow-x-auto">
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow className="border-[#E3E7EE] hover:bg-transparent">
                {table.getHeaderGroups().map((group) =>
                  group.headers.map((header) => (
                    <TableHead key={header.id} className="px-4 font-medium text-[#4D5361]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-[#E9ECF2] hover:bg-[#FAFBFD]">
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
  );
}

export function ProductListHeader() {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#172033]">Kelola Produk</h1>
        <p className="mt-1 text-base text-[#5A6272]">Manajemen daftar produk dan layanan Pyxis.</p>
      </div>
      <Button asChild className="h-11 bg-[#123A91] px-5 text-white hover:bg-[#0B2E75]">
        <Link href={'/admin/products/new' as Route}>
          <Plus className="h-4 w-4" /> Tambah Produk
        </Link>
      </Button>
    </div>
  );
}
