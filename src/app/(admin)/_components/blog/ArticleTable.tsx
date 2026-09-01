'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Edit3, ExternalLink, FileText, Loader2, Plus, Search, Trash2, X } from 'lucide-react';
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
import type { Article } from '@/interfaces/features/articles';
import { deleteArticleById } from '@/services/admin/articles';

interface ArticleTableProps {
  articles: Article[];
}

type StatusFilter = 'all' | 'published' | 'draft';

function ArticleDeleteButton({ article }: { article: Article }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function remove() {
    setError('');
    startTransition(async () => {
      const result = await deleteArticleById(article.id);
      if (!result.success) {
        setError(result.error || 'Artikel gagal dihapus.');
        return;
      }
      toast.success(result.message);
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen(true)}
        aria-label={`Hapus artikel ${article.title}`}
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus artikel?</DialogTitle>
            <DialogDescription>
              &ldquo;{article.title}&rdquo; akan dihapus permanen dan tidak dapat dipulihkan.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Batal
            </Button>
            <Button variant="destructive" onClick={remove} disabled={isPending}>
              {isPending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {isPending ? 'Menghapus...' : 'Hapus artikel'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ArticleTable({ articles }: ArticleTableProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles.filter((article) => {
      if (status === 'published' && !article.isPublished) return false;
      if (status === 'draft' && article.isPublished) return false;
      if (!query) return true;
      return [
        article.title,
        article.slug || '',
        ...article.articleCategories.map((category) => category.name),
      ]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [articles, search, status]);

  const publishedCount = articles.filter((article) => article.isPublished).length;
  const draftCount = articles.length - publishedCount;

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola artikel, status publikasi, dan konten website.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href={'/admin/blog/new' as Route}>
            <Plus className="size-4" aria-hidden="true" />
            Tulis artikel
          </Link>
        </Button>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari judul, slug, atau kategori..."
            aria-label="Cari artikel"
            className="pl-9 pr-9"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Bersihkan pencarian"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          className="flex w-full overflow-x-auto rounded-lg bg-muted p-1 sm:w-auto"
          aria-label="Filter status artikel"
        >
          {(
            [
              ['all', `Semua (${articles.length})`],
              ['published', `Terbit (${publishedCount})`],
              ['draft', `Draft (${draftCount})`],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              aria-pressed={status === value}
              className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                status === value
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section className="overflow-hidden rounded-xl bg-card ring-1 ring-border">
        {articles.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <FileText className="size-8 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-4 font-semibold text-foreground">Belum ada artikel</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Tulis artikel pertama dan simpan sebagai draft sebelum diterbitkan.
            </p>
            <Button asChild className="mt-5">
              <Link href={'/admin/blog/new' as Route}>Tulis artikel</Link>
            </Button>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center p-8 text-center">
            <Search className="size-7 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-3 font-semibold text-foreground">Artikel tidak ditemukan</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ubah kata kunci atau filter status untuk melihat hasil lain.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearch('');
                setStatus('all');
              }}
            >
              Reset filter
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filteredArticles.map((article) => {
              const date = new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }).format(article.publishedAt || article.updatedAt);

              return (
                <li
                  key={article.id}
                  className="grid gap-4 p-4 transition-colors hover:bg-muted/40 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:items-center"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                    {article.cover ? (
                      <Image
                        src={article.cover}
                        alt={`Cover ${article.title}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <FileText
                        className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={
                          article.isPublished
                            ? 'rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success'
                            : 'rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground'
                        }
                      >
                        {article.isPublished ? 'Terbit' : 'Draft'}
                      </span>
                      <span className="text-xs text-muted-foreground">{date}</span>
                    </div>
                    <Link
                      href={`/admin/blog/${article.id}/edit` as Route}
                      className="mt-2 block truncate font-semibold text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {article.title}
                    </Link>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      /{article.slug || article.id}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {article.articleCategories.map((category) => (
                        <span
                          key={category.id}
                          className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1">
                    {article.isPublished && article.slug && (
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link
                          href={`/blog/${article.slug}` as Route}
                          target="_blank"
                          aria-label={`Lihat artikel ${article.title} di halaman publik`}
                        >
                          <ExternalLink className="size-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon-sm" asChild>
                      <Link
                        href={`/admin/blog/${article.id}/edit` as Route}
                        aria-label={`Edit artikel ${article.title}`}
                      >
                        <Edit3 className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <ArticleDeleteButton article={article} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
