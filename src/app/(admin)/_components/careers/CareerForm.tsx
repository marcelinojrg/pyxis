'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  ListChecks,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { careerSchema, type CareerValues } from '@/schemas/careers';
import { createCareer, updateCareer } from '@/services/admin/careers';

interface CareerFormCareer extends Omit<CareerValues, 'categoryId' | 'department'> {
  id: string;
  slug: string;
  categoryId: string | null;
  department: string | null;
}

interface CareerFormProps {
  career?: CareerFormCareer;
  categories: { id: string; name: string }[];
}

export function CareerForm({ career, categories }: CareerFormProps) {
  const router = useRouter();
  const form = useForm<CareerValues>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      title: career?.title || '',
      categoryId: career?.categoryId || '',
      location: career?.location || '',
      type: career?.type || '',
      department: career?.department || '',
      description: career?.description || '',
      responsibilities: career?.responsibilities.length ? career.responsibilities : [''],
      requirements: career?.requirements.length ? career.requirements : [''],
      order: career?.order ?? 0,
      isActive: career?.isActive ?? true,
    },
  });
  const isActive = useWatch({ control: form.control, name: 'isActive' });
  const responsibilities = useWatch({ control: form.control, name: 'responsibilities' }) || [];
  const requirements = useWatch({ control: form.control, name: 'requirements' }) || [];

  function updateList(field: 'responsibilities' | 'requirements', index: number, value: string) {
    const items = field === 'responsibilities' ? responsibilities : requirements;
    form.setValue(
      field,
      items.map((item, itemIndex) => (itemIndex === index ? value : item)),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  }

  function addListItem(field: 'responsibilities' | 'requirements') {
    const items = field === 'responsibilities' ? responsibilities : requirements;
    form.setValue(field, [...items, ''], { shouldDirty: true });
  }

  function removeListItem(field: 'responsibilities' | 'requirements', index: number) {
    const items = field === 'responsibilities' ? responsibilities : requirements;
    form.setValue(
      field,
      items.filter((_, itemIndex) => itemIndex !== index),
      { shouldDirty: true, shouldValidate: true }
    );
  }

  async function onSubmit(values: CareerValues) {
    const result = career ? await updateCareer(career.id, values) : await createCareer(values);
    if (!result.success) {
      toast.error(result.error || 'Failed to save the opening.');
      return;
    }

    toast.success(result.message || 'Opening saved.');
    router.push('/admin/careers' as Route);
    router.refresh();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-4xl space-y-6 pb-12"
    >
      <header className="border-b border-slate-200 pb-4">
        <Link
          href={'/admin/careers' as Route}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to openings
        </Link>
        <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {career ? 'Edit opening' : 'Add opening'}
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Complete the information shown on the public careers page.
        </p>
      </header>

      <section className="space-y-5 rounded-md border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <BriefcaseBusiness className="h-4 w-4 text-slate-700" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Position information
          </h2>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-xs font-semibold text-slate-800">
            Position title
          </Label>
          <Input
            id="title"
            {...form.register('title')}
            aria-invalid={!!form.formState.errors.title}
          />
          {form.formState.errors.title && (
            <p className="text-xs text-red-600">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="categoryId" className="text-xs font-semibold text-slate-800">
              Category
            </Label>
            <select
              id="categoryId"
              className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/20"
              {...form.register('categoryId')}
            >
              <option value="">No category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {form.formState.errors.categoryId && (
              <p className="text-xs text-red-600">{form.formState.errors.categoryId.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="department" className="text-xs font-semibold text-slate-800">
              Department
            </Label>
            <Input
              id="department"
              placeholder="Example: Engineering"
              {...form.register('department')}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-xs font-semibold text-slate-800">
              Location
            </Label>
            <Input
              id="location"
              placeholder="Malang / Remote"
              {...form.register('location')}
              aria-invalid={!!form.formState.errors.location}
            />
            {form.formState.errors.location && (
              <p className="text-xs text-red-600">{form.formState.errors.location.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="type" className="text-xs font-semibold text-slate-800">
              Employment type
            </Label>
            <Input
              id="type"
              placeholder="Full-time"
              {...form.register('type')}
              aria-invalid={!!form.formState.errors.type}
            />
            {form.formState.errors.type && (
              <p className="text-xs text-red-600">{form.formState.errors.type.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="order" className="text-xs font-semibold text-slate-800">
              Display order
            </Label>
            <Input
              id="order"
              type="number"
              min={0}
              max={10000}
              {...form.register('order', { valueAsNumber: true })}
              aria-invalid={!!form.formState.errors.order}
            />
            {form.formState.errors.order && (
              <p className="text-xs text-red-600">{form.formState.errors.order.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description" className="text-xs font-semibold text-slate-800">
            Role description
          </Label>
          <Textarea
            id="description"
            className="min-h-40 resize-y"
            {...form.register('description')}
            aria-invalid={!!form.formState.errors.description}
          />
          {form.formState.errors.description && (
            <p className="text-xs text-red-600">{form.formState.errors.description.message}</p>
          )}
        </div>
      </section>

      {(
        [
          ['responsibilities', 'Responsibilities', responsibilities],
          ['requirements', 'Requirements', requirements],
        ] as const
      ).map(([field, title, items]) => (
        <section
          key={field}
          className="space-y-4 rounded-md border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-slate-700" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">{title}</h2>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => addListItem(field)}>
              <Plus className="h-3.5 w-3.5" /> Add item
            </Button>
          </div>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={`${field}-${index}`} className="flex items-start gap-2">
                <Label htmlFor={`${field}-${index}`} className="sr-only">
                  {title} {index + 1}
                </Label>
                <Textarea
                  id={`${field}-${index}`}
                  value={item}
                  onChange={(event) => updateList(field, index, event.target.value)}
                  className="min-h-20 resize-y"
                  aria-invalid={!!form.formState.errors[field]?.[index]}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeListItem(field, index)}
                  disabled={items.length === 1}
                  aria-label={`Delete ${title.toLowerCase()} ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
          {form.formState.errors[field]?.message && (
            <p className="text-xs text-red-600">{form.formState.errors[field]?.message}</p>
          )}
        </section>
      ))}

      <section className="rounded-md border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="isActive" className="text-sm font-semibold text-slate-900">
              Publish opening
            </Label>
            <p className="mt-1 text-xs text-slate-500">
              Inactive openings do not appear in public lists, details, or metadata.
            </p>
          </div>
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <Switch
                id="isActive"
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label="Publish opening"
              />
            )}
          />
        </div>
        <p className="mt-3 text-xs font-medium text-slate-600" aria-live="polite">
          Status: {isActive ? 'Active' : 'Draft'}
        </p>
      </section>

      <div className="sticky bottom-4 z-20 flex flex-col-reverse gap-2 rounded-md border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:flex-row sm:justify-end">
        <Button asChild variant="outline">
          <Link href={'/admin/careers' as Route}>Cancel</Link>
        </Button>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          {form.formState.isSubmitting ? 'Saving...' : 'Save opening'}
        </Button>
      </div>
    </form>
  );
}
