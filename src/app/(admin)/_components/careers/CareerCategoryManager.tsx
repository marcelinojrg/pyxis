'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Pencil, Plus, Tags, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  createCareerCategory,
  deleteCareerCategory,
  updateCareerCategory,
} from '@/services/admin/careers';

interface CareerCategoryManagerProps {
  categories: { id: string; name: string; _count: { careers: number } }[];
}

export function CareerCategoryManager({ categories }: CareerCategoryManagerProps) {
  const router = useRouter();
  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function finish(
    result: { success: boolean; error?: string; message?: string },
    fallback: { error: string; success: string }
  ) {
    if (!result.success) {
      toast.error(result.error || fallback.error);
      return false;
    }
    toast.success(result.message || fallback.success);
    router.refresh();
    return true;
  }

  function create() {
    startTransition(async () => {
      const result = await createCareerCategory(newName);
      if (
        finish(result, {
          error: 'Failed to create the category.',
          success: 'Category created.',
        })
      )
        setNewName('');
    });
  }

  function update() {
    if (!editId) return;
    startTransition(async () => {
      const result = await updateCareerCategory(editId, editName);
      if (
        finish(result, {
          error: 'Failed to update the category.',
          success: 'Category updated.',
        })
      )
        setEditId(null);
    });
  }

  function remove(id: string) {
    startTransition(async () => {
      const result = await deleteCareerCategory(id);
      if (
        finish(result, {
          error: 'Failed to delete the category.',
          success: 'Category deleted.',
        })
      )
        setDeleteId(null);
    });
  }

  return (
    <section
      className="rounded-md border border-slate-200 bg-white p-5 sm:p-6"
      aria-labelledby="career-categories-title"
    >
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Tags className="h-4 w-4 text-slate-700" />
        <div>
          <h2 id="career-categories-title" className="text-sm font-bold text-slate-900">
            Opening categories
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Categories that are still in use cannot be deleted.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Label htmlFor="new-career-category" className="sr-only">
            New category name
          </Label>
          <Input
            id="new-career-category"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="New category name"
            disabled={isPending}
          />
        </div>
        <Button
          type="button"
          onClick={create}
          disabled={isPending || !newName.trim()}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> Add category
        </Button>
      </div>

      <ul className="mt-4 divide-y divide-slate-100" aria-live="polite">
        {categories.length === 0 && (
          <li className="py-6 text-center text-xs text-slate-500">No categories yet.</li>
        )}
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            {editId === category.id ? (
              <div className="flex flex-1 items-center gap-2">
                <Label htmlFor={`category-${category.id}`} className="sr-only">
                  Edit name for {category.name}
                </Label>
                <Input
                  id={`category-${category.id}`}
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  disabled={isPending}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={update}
                  disabled={isPending || !editName.trim()}
                  aria-label="Save category name"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditId(null)}
                  aria-label="Cancel category edit"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-slate-800">{category.name}</p>
                <p className="text-xs text-slate-500">{category._count.careers} openings</p>
              </div>
            )}

            {editId !== category.id && (
              <div className="flex items-center gap-1 self-end sm:self-auto">
                {deleteId === category.id ? (
                  <>
                    <span className="mr-1 text-xs font-medium text-red-700">Delete category?</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(category.id)}
                      disabled={isPending || category._count.careers > 0}
                    >
                      Yes, delete
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditId(category.id);
                        setEditName(category.name);
                      }}
                      aria-label={`Edit category ${category.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(category.id)}
                      disabled={category._count.careers > 0}
                      aria-label={`Delete category ${category.name}`}
                      title={
                        category._count.careers > 0
                          ? 'Move the openings before deleting this category.'
                          : undefined
                      }
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
