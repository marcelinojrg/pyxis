'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Pencil, Plus, Search, Trash2, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteCareerById } from '@/services/admin/careers';

export interface CareerTableItem {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  department: string | null;
  order: number;
  isActive: boolean;
  category: { id: string; name: string } | null;
}

export function CareerListHeader() {
  return (
    <header className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Kelola Lowongan
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Atur posisi, status publikasi, dan kategori karier.
        </p>
      </div>
      <Button asChild className="self-start bg-blue-600 text-white hover:bg-blue-700 sm:self-auto">
        <Link href={'/admin/careers/new' as Route}>
          <Plus className="h-4 w-4" /> Tambah Lowongan
        </Link>
      </Button>
    </header>
  );
}

export function CareerTable({ careers }: { careers: CareerTableItem[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'draft'>('all');
  const [candidate, setCandidate] = useState<CareerTableItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return careers.filter((career) => {
      const statusMatches =
        status === 'all' || (status === 'active' ? career.isActive : !career.isActive);
      const searchMatches =
        !query ||
        `${career.title} ${career.location} ${career.department || ''} ${career.category?.name || ''}`
          .toLowerCase()
          .includes(query);
      return statusMatches && searchMatches;
    });
  }, [careers, search, status]);

  function removeCareer() {
    if (!candidate) return;
    startTransition(async () => {
      const result = await deleteCareerById(candidate.id);
      if (!result.success) {
        toast.error(result.error || 'Lowongan gagal dihapus.');
        return;
      }
      toast.success(result.message || 'Lowongan berhasil dihapus.');
      setCandidate(null);
      router.refresh();
    });
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari judul, lokasi, atau kategori"
              aria-label="Cari lowongan"
              className="pl-9"
            />
          </div>
          <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as typeof status)}
              className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <option value="all">Semua</option>
              <option value="active">Aktif</option>
              <option value="draft">Draft</option>
            </select>
          </label>
        </div>

        <section
          className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          aria-label="Daftar lowongan"
        >
          {careers.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
              <h2 className="text-sm font-bold text-slate-900">Belum ada lowongan</h2>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                Tambahkan lowongan pertama untuk mulai mengisi halaman karier publik.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="min-h-40 p-8 text-center text-xs text-slate-500">
              Tidak ada lowongan yang cocok dengan filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[760px]">
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead>Posisi</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Urutan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((career) => (
                    <TableRow key={career.id}>
                      <TableCell>
                        <Link
                          href={`/admin/careers/${career.id}/edit` as Route}
                          className="font-semibold text-slate-900 hover:text-blue-700"
                        >
                          {career.title}
                        </Link>
                        <p className="mt-0.5 text-xs text-slate-500">{career.type}</p>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{career.location}</TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {career.category?.name || career.department || 'Tanpa kategori'}
                      </TableCell>
                      <TableCell className="text-sm tabular-nums text-slate-600">
                        {career.order}
                      </TableCell>
                      <TableCell>
                        {career.isActive ? (
                          <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                            Aktif
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            Draft
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          {career.isActive && (
                            <Button asChild variant="ghost" size="icon">
                              <Link
                                href={`/careers/${career.slug}` as Route}
                                target="_blank"
                                aria-label={`Lihat ${career.title} di website`}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          <Button asChild variant="ghost" size="icon">
                            <Link
                              href={`/admin/careers/${career.id}/edit` as Route}
                              aria-label={`Edit ${career.title}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setCandidate(career)}
                            aria-label={`Hapus ${career.title}`}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>

      <Dialog open={!!candidate} onOpenChange={(open) => !open && setCandidate(null)}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <TriangleAlert className="h-8 w-8 text-red-600" />
            <DialogTitle>Hapus lowongan?</DialogTitle>
            <DialogDescription>
              Lowongan “{candidate?.title}” akan dihapus permanen. Data lamaran lama yang terkait
              juga akan ikut terhapus.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCandidate(null)} disabled={isPending}>
              Batal
            </Button>
            <Button variant="destructive" onClick={removeCareer} disabled={isPending}>
              {isPending ? 'Menghapus...' : 'Hapus Lowongan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
