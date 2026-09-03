'use client';

import { useState, useTransition } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, Pencil, Plus, Tags, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ArticleCategory } from '@/interfaces/features/articles';
import { createCategory, deleteCategory, updateCategory } from '@/services/admin/articles';

interface CategoryManagerProps {
  categories: ArticleCategory[];
}

export function CategoryManager({ categories }: CategoryManagerProps) {
  const router = useRouter();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function addCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    startTransition(async () => {
      const result = await createCategory({ name: newName });
      if (!result.success) {
        setError(result.error || 'Kategori gagal dibuat.');
        return;
      }
      setNewName('');
      toast.success(result.message || 'Kategori berhasil dibuat.');
      router.refresh();
    });
  }

  function saveCategory(id: string) {
    setError('');
    startTransition(async () => {
      const result = await updateCategory(id, { name: editingName });
      if (!result.success) {
        setError(result.error || 'Kategori gagal diperbarui.');
        return;
      }
      setEditingId(null);
      setEditingName('');
      toast.success(result.message || 'Kategori berhasil diperbarui.');
      router.refresh();
    });
  }

  function removeCategory(category: ArticleCategory) {
    if (
      !window.confirm(
        `Hapus kategori "${category.name}"? Kategori yang sudah dihapus tidak dapat dipulihkan.`
      )
    )
      return;

    setError('');
    startTransition(async () => {
      const result = await deleteCategory(category.id);
      if (!result.success) {
        setError(result.error || 'Kategori gagal dihapus.');
        return;
      }
      toast.success(result.message || 'Kategori berhasil dihapus.');
      router.refresh();
    });
  }

  return (
    <aside className="space-y-5 rounded-md bg-card p-5 ring-1 ring-border">
      <div className="flex items-start gap-3">
        <Tags className="mt-0.5 size-5 text-muted-foreground" aria-hidden="true" />
        <div>
          <h2 className="font-semibold text-foreground">Kategori</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Kategori membantu pembaca menemukan topik terkait.
          </p>
        </div>
      </div>

      <form onSubmit={addCategory} className="space-y-2">
        <Label htmlFor="new-category">Kategori baru</Label>
        <div className="flex gap-2">
          <Input
            id="new-category"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            minLength={2}
            maxLength={60}
            placeholder="Contoh: Wawasan Industri"
            disabled={isPending}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isPending || !newName.trim()}
            aria-label="Tambah kategori"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </form>

      {error && (
        <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {categories.length ? (
        <ul className="divide-y divide-border">
          {categories.map((category) => {
            const editing = editingId === category.id;
            return (
              <li key={category.id} className="py-3 first:pt-0 last:pb-0">
                {editing ? (
                  <div className="flex gap-2">
                    <Input
                      value={editingName}
                      onChange={(event) => setEditingName(event.target.value)}
                      maxLength={60}
                      aria-label={`Nama kategori ${category.name}`}
                      autoFocus
                    />
                    <Button
                      type="button"
                      size="icon-sm"
                      onClick={() => saveCategory(category.id)}
                      disabled={isPending || !editingName.trim()}
                      aria-label="Simpan perubahan kategori"
                    >
                      <Check className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setEditingId(null)}
                      disabled={isPending}
                      aria-label="Batalkan perubahan kategori"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {category.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {category.articleCount || 0} artikel
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => {
                        setEditingId(category.id);
                        setEditingName(category.name);
                        setError('');
                      }}
                      disabled={isPending}
                      aria-label={`Ubah kategori ${category.name}`}
                    >
                      <Pencil className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeCategory(category)}
                      disabled={isPending || (category.articleCount || 0) > 0}
                      aria-label={`Hapus kategori ${category.name}`}
                      title={
                        (category.articleCount || 0) > 0
                          ? 'Kategori yang masih digunakan tidak dapat dihapus.'
                          : undefined
                      }
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">Belum ada kategori.</p>
      )}
    </aside>
  );
}
