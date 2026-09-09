'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ImagePlus, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import RichTextEditor from '@/components/Common/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { Article, ArticleCategory } from '@/interfaces/features/articles';
import { slugify } from '@/lib/utils';
import { articleSchema, type ArticleValues } from '@/schemas/articles';
import { createArticle, updateArticleById } from '@/services/admin/articles';
import { uploadImage } from '@/services/public/uploads';

interface ArticleFormProps {
  article?: Article;
  categories: ArticleCategory[];
}

const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

export function ArticleForm({ article, categories }: ArticleFormProps) {
  const router = useRouter();
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState(article?.cover || '');
  const [coverPreview, setCoverPreview] = useState(article?.cover || '');
  const [submitError, setSubmitError] = useState('');

  const form = useForm<ArticleValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
      cover: article?.cover || '',
      categoryIds: article?.articleCategories.map((category) => category.id) || [],
      isPublished: article?.isPublished ?? false,
    },
  });

  const title = useWatch({ control: form.control, name: 'title' });
  const selectedCategories = useWatch({ control: form.control, name: 'categoryIds' });
  const isPublished = useWatch({ control: form.control, name: 'isPublished' });
  const folderName = slugify(title || '').slice(0, 60) || article?.id || 'draft';

  useEffect(() => {
    return () => {
      if (coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  function selectCover(file: File | null) {
    setSubmitError('');
    if (!file) return;
    if (!imageTypes.has(file.type) || file.size > 10 * 1024 * 1024) {
      setSubmitError('The cover must be JPEG, PNG, WebP, or AVIF and no larger than 10 MB.');
      return;
    }
    if (coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function toggleCategory(id: string, checked: boolean) {
    const next = checked
      ? [...selectedCategories, id]
      : selectedCategories.filter((categoryId) => categoryId !== id);
    form.setValue('categoryIds', next, { shouldDirty: true, shouldValidate: true });
  }

  async function onSubmit(values: ArticleValues) {
    setSubmitError('');
    let finalCover = coverUrl;

    if (coverFile) {
      const upload = await uploadImage(coverFile, 'articles/covers');
      if (!upload.success || !upload.url) {
        setSubmitError(upload.error || 'Failed to upload the cover.');
        return;
      }
      finalCover = upload.url;
      setCoverUrl(upload.url);
    }

    const result = article
      ? await updateArticleById(article.id, { ...values, cover: finalCover })
      : await createArticle({ ...values, cover: finalCover });

    if (!result.success) {
      setSubmitError(result.error || 'Failed to save the article.');
      return;
    }

    toast.success(result.message || (article ? 'Article updated.' : 'Article created.'));
    router.push('/admin/blog' as Route);
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      aria-busy={isSubmitting}
      className="mx-auto w-full max-w-6xl space-y-6 pb-12"
    >
      <header className="border-b border-border pb-5">
        <Link
          href={'/admin/blog' as Route}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to blog
        </Link>
        <div className="mt-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {article ? 'Edit article' : 'Write a new article'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Structure the content, choose categories, then save it as a draft or publish it.
          </p>
        </div>
      </header>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-6">
          <section className="space-y-5 rounded-md bg-card p-5 ring-1 ring-border sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article title</Label>
              <Input
                id="title"
                maxLength={160}
                placeholder="A clear, specific title"
                aria-invalid={!!form.formState.errors.title}
                aria-describedby={form.formState.errors.title ? 'title-error' : undefined}
                {...form.register('title')}
              />
              {form.formState.errors.title && (
                <p id="title-error" className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                The slug is generated automatically and gets a suffix if the title is already in
                use.
              </p>
            </div>

            <div className="space-y-2">
              <Label id="content-label">Article content</Label>
              <div role="group" aria-labelledby="content-label">
                <Controller
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      folderName={folderName}
                      placeholder="Start writing the article..."
                    />
                  )}
                />
              </div>
              {form.formState.errors.content && (
                <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section className="space-y-4 rounded-md bg-card p-5 ring-1 ring-border">
            <div>
              <h2 className="font-semibold text-foreground">Publishing</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Draft articles do not appear on the public page.
              </p>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-lg bg-muted p-3">
              <div>
                <Label htmlFor="isPublished" className="cursor-pointer">
                  {isPublished ? 'Publish' : 'Save as draft'}
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isPublished
                    ? 'The publication date is set when the article is first published.'
                    : 'You can continue editing it later.'}
                </p>
              </div>
              <Switch
                id="isPublished"
                checked={isPublished}
                onCheckedChange={(checked) =>
                  form.setValue('isPublished', checked, { shouldDirty: true })
                }
                aria-label="Article publication status"
              />
            </div>
          </section>

          <section className="space-y-3 rounded-md bg-card p-5 ring-1 ring-border">
            <div>
              <h2 className="font-semibold text-foreground">Categories</h2>
              <p className="mt-1 text-xs text-muted-foreground">Choose up to 8 categories.</p>
            </div>
            {categories.length ? (
              <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
                {categories.map((category) => {
                  const checked = selectedCategories.includes(category.id);
                  return (
                    <label
                      key={category.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => toggleCategory(category.id, value === true)}
                        aria-label={`Select category ${category.name}`}
                      />
                      <span className="min-w-0 flex-1 truncate">{category.name}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                No categories yet. Create one from the blog list first.
              </p>
            )}
            {form.formState.errors.categoryIds && (
              <p className="text-sm text-destructive">
                {form.formState.errors.categoryIds.message}
              </p>
            )}
          </section>

          <section className="space-y-3 rounded-md bg-card p-5 ring-1 ring-border">
            <div>
              <h2 className="font-semibold text-foreground">Cover</h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                A 16:9 ratio is recommended. Uploads may take up to 30 seconds.
              </p>
            </div>
            {coverPreview ? (
              <div className="space-y-3">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={coverPreview}
                    alt={title ? `Cover preview for ${title}` : 'Article cover preview'}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    if (coverPreview.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
                    setCoverFile(null);
                    setCoverPreview('');
                    setCoverUrl('');
                    form.setValue('cover', '', { shouldDirty: true });
                  }}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Remove cover
                </Button>
              </div>
            ) : (
              <label
                htmlFor="cover"
                className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 p-4 text-center transition-colors hover:bg-muted focus-within:ring-2 focus-within:ring-ring"
              >
                <ImagePlus className="size-6 text-muted-foreground" aria-hidden="true" />
                <span className="mt-2 text-sm font-medium">Choose a cover image</span>
                <span className="mt-1 text-xs text-muted-foreground">Maximum 10 MB</span>
                <input
                  id="cover"
                  type="file"
                  className="sr-only"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={(event) => selectCover(event.target.files?.[0] || null)}
                />
              </label>
            )}
          </section>
        </aside>
      </div>

      {submitError && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {submitError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" asChild>
          <Link href={'/admin/blog' as Route}>Cancel</Link>
        </Button>
        <Button type="submit" disabled={isSubmitting || categories.length === 0}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {isSubmitting
            ? 'Menyimpan...'
            : isPublished
              ? article
                ? 'Update and publish'
                : 'Publish article'
              : article
                ? 'Update draft'
                : 'Save draft'}
        </Button>
      </div>
    </form>
  );
}
