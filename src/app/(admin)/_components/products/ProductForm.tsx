'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm, useWatch, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  Cpu,
  FileText,
  Layers3,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { productSchema, type ProductValues } from '@/schemas/products';
import { createProduct, updateProduct } from '@/services/admin/products';
import { uploadImage } from '@/services/public/uploads';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

interface ProductFormProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  featureSubtitle: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
  benefits: { title: string; description: string | null; icon: string | null }[];
  features: { title: string; description: string | null; icon: string | null }[];
  capabilities: {
    title: string;
    description: string | null;
    imageUrl: string | null;
    items: { title: string; description: string | null; icon: string | null }[];
  }[];
}

interface ProductFormProps {
  product?: ProductFormProduct;
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border pb-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

function OrderControls({
  label,
  index,
  total,
  onMove,
  onRemove,
}: {
  label: string;
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        aria-label={`Naikkan ${label}`}
      >
        <ArrowUp className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        disabled={index === total - 1}
        onClick={() => onMove(index, index + 1)}
        aria-label={`Turunkan ${label}`}
      >
        <ArrowDown className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
        aria-label={`Hapus ${label}`}
      >
        <Trash2 className="h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}

function ImagePicker({
  id,
  label,
  hint,
  preview,
  alt,
  onChange,
  onRemove,
}: {
  id: string;
  label: string;
  hint: string;
  preview?: string;
  alt: string;
  onChange: (file: File) => void;
  onRemove: () => void;
}) {
  const hintId = `${id}-hint`;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="peer sr-only"
        aria-describedby={hintId}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          if (file) onChange(file);
          event.currentTarget.value = '';
        }}
      />
      <label
        htmlFor={id}
        className="flex min-h-44 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/40 p-3 text-center transition-colors hover:bg-muted/70 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
      >
        {preview ? (
          <span className="relative block aspect-video w-full overflow-hidden rounded-lg bg-background">
            <Image
              src={preview}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-contain"
              unoptimized={preview.startsWith('blob:')}
            />
          </span>
        ) : (
          <span className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <UploadCloud className="h-6 w-6" aria-hidden />
            <span className="font-medium text-foreground">Pilih gambar</span>
          </span>
        )}
      </label>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
        {preview ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" aria-hidden /> Hapus gambar
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function CapabilityGroupFields({
  form,
  groupIndex,
  fieldId,
  totalGroups,
  preview,
  onMove,
  onRemove,
  onImageChange,
  onImageRemove,
}: {
  form: UseFormReturn<ProductValues>;
  groupIndex: number;
  fieldId: string;
  totalGroups: number;
  preview?: string;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
  onImageChange: (file: File) => void;
  onImageRemove: () => void;
}) {
  const items = useFieldArray({
    control: form.control,
    name: `capabilities.${groupIndex}.items` as const,
  });
  const persistedImage = useWatch({
    control: form.control,
    name: `capabilities.${groupIndex}.imageUrl` as const,
  });
  const errors = form.formState.errors.capabilities?.[groupIndex];

  return (
    <div className="space-y-5 border-b border-border p-4 last:border-b-0 sm:p-5">
      <input type="hidden" {...form.register(`capabilities.${groupIndex}.imageUrl`)} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold text-foreground">Grup kapabilitas {groupIndex + 1}</h3>
        <OrderControls
          label={`grup kapabilitas ${groupIndex + 1}`}
          index={groupIndex}
          total={totalGroups}
          onMove={onMove}
          onRemove={onRemove}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`capability-${fieldId}-title`}>Judul grup</Label>
          <Input
            id={`capability-${fieldId}-title`}
            maxLength={120}
            aria-invalid={!!errors?.title}
            aria-describedby={errors?.title ? `capability-${fieldId}-title-error` : undefined}
            {...form.register(`capabilities.${groupIndex}.title`)}
          />
          <FieldError id={`capability-${fieldId}-title-error`} message={errors?.title?.message} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={`capability-${fieldId}-description`}>Deskripsi grup</Label>
          <Textarea
            id={`capability-${fieldId}-description`}
            className="min-h-24 resize-y"
            maxLength={3000}
            aria-invalid={!!errors?.description}
            aria-describedby={
              errors?.description ? `capability-${fieldId}-description-error` : undefined
            }
            {...form.register(`capabilities.${groupIndex}.description`)}
          />
          <FieldError
            id={`capability-${fieldId}-description-error`}
            message={errors?.description?.message}
          />
        </div>
      </div>

      <ImagePicker
        id={`capability-${fieldId}-image`}
        label="Gambar atau diagram grup"
        hint="JPG, PNG, WEBP, atau AVIF; maksimal 10 MB."
        preview={preview ?? persistedImage ?? ''}
        alt={`Pratinjau gambar grup kapabilitas ${groupIndex + 1}`}
        onChange={onImageChange}
        onRemove={onImageRemove}
      />

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Item kapabilitas</h4>
            <p className="text-xs text-muted-foreground">Urutan item mengikuti susunan di bawah.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={items.fields.length >= 30}
            onClick={() => items.append({ title: '', description: '', icon: '' })}
          >
            <Plus className="mr-1.5 h-4 w-4" aria-hidden /> Tambah item
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          {items.fields.length ? (
            items.fields.map((item, itemIndex) => {
              const itemErrors = errors?.items?.[itemIndex];
              return (
                <div
                  key={item.id}
                  className="grid gap-3 border-b border-border p-3 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]"
                >
                  <input
                    type="hidden"
                    {...form.register(`capabilities.${groupIndex}.items.${itemIndex}.icon`)}
                  />
                  <div className="space-y-2">
                    <Label htmlFor={`capability-${fieldId}-item-${item.id}-title`}>
                      Judul item
                    </Label>
                    <Input
                      id={`capability-${fieldId}-item-${item.id}-title`}
                      maxLength={120}
                      aria-invalid={!!itemErrors?.title}
                      aria-describedby={
                        itemErrors?.title
                          ? `capability-${fieldId}-item-${item.id}-title-error`
                          : undefined
                      }
                      {...form.register(`capabilities.${groupIndex}.items.${itemIndex}.title`)}
                    />
                    <FieldError
                      id={`capability-${fieldId}-item-${item.id}-title-error`}
                      message={itemErrors?.title?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`capability-${fieldId}-item-${item.id}-description`}>
                      Deskripsi
                    </Label>
                    <Textarea
                      id={`capability-${fieldId}-item-${item.id}-description`}
                      className="min-h-20 resize-y"
                      maxLength={500}
                      {...form.register(
                        `capabilities.${groupIndex}.items.${itemIndex}.description`
                      )}
                    />
                  </div>
                  <OrderControls
                    label={`item kapabilitas ${itemIndex + 1}`}
                    index={itemIndex}
                    total={items.fields.length}
                    onMove={items.move}
                    onRemove={() => items.remove(itemIndex)}
                  />
                </div>
              );
            })
          ) : (
            <p className="p-4 text-sm text-muted-foreground">Belum ada item dalam grup ini.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const objectUrls = useRef(new Set<string>());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const [capabilityFiles, setCapabilityFiles] = useState<Record<string, File>>({});
  const [capabilityPreviews, setCapabilityPreviews] = useState<Record<string, string>>({});

  const form = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    mode: 'onBlur',
    defaultValues: {
      name: product?.name || '',
      slug: product?.slug || '',
      description: product?.description || '',
      featureSubtitle: product?.featureSubtitle || '',
      image: product?.image || '',
      order: product?.order ?? 0,
      isActive: product?.isActive ?? true,
      benefits:
        product?.benefits.map((item) => ({
          title: item.title,
          description: item.description || '',
          icon: item.icon || '',
        })) || [],
      features:
        product?.features.map((item) => ({
          title: item.title,
          description: item.description || '',
          icon: item.icon || '',
        })) || [],
      capabilities:
        product?.capabilities.map((group) => ({
          title: group.title,
          description: group.description || '',
          imageUrl: group.imageUrl || '',
          items: group.items.map((item) => ({
            title: item.title,
            description: item.description || '',
            icon: item.icon || '',
          })),
        })) || [],
    },
  });

  const benefits = useFieldArray({ control: form.control, name: 'benefits' });
  const features = useFieldArray({ control: form.control, name: 'features' });
  const capabilities = useFieldArray({ control: form.control, name: 'capabilities' });
  const shortDescription = useWatch({ control: form.control, name: 'description' }) || '';
  const isActive = useWatch({ control: form.control, name: 'isActive' });

  useEffect(() => {
    const urls = objectUrls.current;
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  function createPreview(file: File) {
    const url = URL.createObjectURL(file);
    objectUrls.current.add(url);
    return url;
  }

  function revokePreview(url?: string) {
    if (!url?.startsWith('blob:')) return;
    URL.revokeObjectURL(url);
    objectUrls.current.delete(url);
  }

  function validImage(file: File) {
    if (!IMAGE_TYPES.has(file.type)) {
      toast.error('Format gambar harus JPG, PNG, WEBP, atau AVIF.');
      return false;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Ukuran gambar maksimal 10 MB.');
      return false;
    }
    return true;
  }

  function changeMainImage(file: File) {
    if (!validImage(file)) return;
    revokePreview(imagePreview);
    setImageFile(file);
    setImagePreview(createPreview(file));
  }

  function removeMainImage() {
    revokePreview(imagePreview);
    setImageFile(null);
    setImagePreview('');
    form.setValue('image', '', { shouldDirty: true });
  }

  function changeCapabilityImage(fieldId: string, file: File) {
    if (!validImage(file)) return;
    revokePreview(capabilityPreviews[fieldId]);
    setCapabilityFiles((current) => ({ ...current, [fieldId]: file }));
    setCapabilityPreviews((current) => ({ ...current, [fieldId]: createPreview(file) }));
  }

  function removeCapabilityImage(fieldId: string, index: number) {
    revokePreview(capabilityPreviews[fieldId]);
    setCapabilityFiles((current) => {
      const next = { ...current };
      delete next[fieldId];
      return next;
    });
    setCapabilityPreviews((current) => {
      const next = { ...current };
      delete next[fieldId];
      return next;
    });
    form.setValue(`capabilities.${index}.imageUrl`, '', { shouldDirty: true });
  }

  function removeCapability(fieldId: string, index: number) {
    removeCapabilityImage(fieldId, index);
    capabilities.remove(index);
  }

  async function onSubmit(values: ProductValues) {
    try {
      let image = values.image || '';
      if (imageFile) {
        const upload = await uploadImage(imageFile, 'products');
        if (!upload.success || !upload.url)
          throw new Error(upload.error || 'Gambar utama gagal diunggah.');
        image = upload.url;
      }

      const capabilityValues = await Promise.all(
        values.capabilities.map(async (group, index) => {
          const fieldId = capabilities.fields[index]?.id;
          const file = fieldId ? capabilityFiles[fieldId] : undefined;
          if (!file) return group;
          const upload = await uploadImage(file, 'products');
          if (!upload.success || !upload.url) {
            throw new Error(upload.error || `Gambar kapabilitas ${index + 1} gagal diunggah.`);
          }
          return { ...group, imageUrl: upload.url };
        })
      );

      const payload = { ...values, image, capabilities: capabilityValues };
      const result = product
        ? await updateProduct(product.id, payload)
        : await createProduct(payload);
      if (!result.success) {
        toast.error(result.error || 'Produk gagal disimpan.');
        return;
      }

      toast.success(result.message || 'Produk berhasil disimpan.');
      router.push('/admin/products' as Route);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gambar gagal diunggah. Coba lagi.');
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, () =>
        toast.error('Periksa kembali kolom yang ditandai.')
      )}
      className="mx-auto w-full max-w-5xl min-w-0 space-y-6 pb-12"
      noValidate
    >
      <input type="hidden" {...form.register('image')} />
      <div className="border-b border-border pb-5">
        <Link
          href={'/admin/products' as Route}
          className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Kembali ke daftar produk
        </Link>
        <h1 className="mt-2 break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {product ? 'Edit produk' : 'Tambah produk'}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Kelola informasi katalog, manfaat, fitur, media, dan grup kapabilitas produk.
        </p>
      </div>

      <section className="space-y-5 rounded-xl border border-border bg-card p-4 sm:p-6">
        <SectionHeading
          icon={FileText}
          title="Informasi produk"
          description="Identitas, permalink, deskripsi, dan urutan tampil produk."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nama produk *</Label>
            <Input
              id="name"
              maxLength={120}
              placeholder="Contoh: Pyxis Hotel Management"
              aria-invalid={!!form.formState.errors.name}
              aria-describedby={form.formState.errors.name ? 'name-error' : 'name-hint'}
              {...form.register('name')}
            />
            <FieldError id="name-error" message={form.formState.errors.name?.message} />
            {!form.formState.errors.name ? (
              <p id="name-hint" className="text-xs text-muted-foreground">
                Maksimal 120 karakter.
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              maxLength={120}
              placeholder="Otomatis dari nama jika dikosongkan"
              aria-invalid={!!form.formState.errors.slug}
              aria-describedby={form.formState.errors.slug ? 'slug-error' : 'slug-hint'}
              {...form.register('slug')}
            />
            <FieldError id="slug-error" message={form.formState.errors.slug?.message} />
            {!form.formState.errors.slug ? (
              <p id="slug-hint" className="text-xs text-muted-foreground">
                Slug duplikat akan diberi akhiran angka secara otomatis.
              </p>
            ) : null}
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="description">Deskripsi singkat</Label>
              <span className="text-xs tabular-nums text-muted-foreground">
                {shortDescription.length}/150
              </span>
            </div>
            <Textarea
              id="description"
              maxLength={150}
              className="min-h-24 resize-y"
              aria-invalid={!!form.formState.errors.description}
              aria-describedby={form.formState.errors.description ? 'description-error' : undefined}
              {...form.register('description')}
            />
            <FieldError
              id="description-error"
              message={form.formState.errors.description?.message}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="featureSubtitle">Deskripsi lengkap</Label>
            <Textarea
              id="featureSubtitle"
              maxLength={3000}
              className="min-h-36 resize-y"
              aria-invalid={!!form.formState.errors.featureSubtitle}
              aria-describedby={
                form.formState.errors.featureSubtitle ? 'feature-subtitle-error' : undefined
              }
              {...form.register('featureSubtitle')}
            />
            <FieldError
              id="feature-subtitle-error"
              message={form.formState.errors.featureSubtitle?.message}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Urutan tampil</Label>
            <Input
              id="order"
              type="number"
              min={0}
              max={9999}
              inputMode="numeric"
              aria-invalid={!!form.formState.errors.order}
              aria-describedby={form.formState.errors.order ? 'order-error' : 'order-hint'}
              {...form.register('order', {
                setValueAs: (value) => (value === '' ? 0 : Number(value)),
              })}
            />
            <FieldError id="order-error" message={form.formState.errors.order?.message} />
            {!form.formState.errors.order ? (
              <p id="order-hint" className="text-xs text-muted-foreground">
                Angka lebih kecil tampil lebih dahulu.
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="isActive">Status publikasi</Label>
            <div className="flex min-h-10 items-center justify-between rounded-lg border border-border px-3 py-2">
              <span className="text-sm font-medium text-foreground">
                {isActive ? 'Aktif' : 'Draft'}
              </span>
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={(checked) =>
                  form.setValue('isActive', checked, { shouldDirty: true })
                }
                aria-label="Aktifkan produk di website publik"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Produk draft tidak tampil di website publik.
            </p>
          </div>
        </div>

        <ImagePicker
          id="main-image"
          label="Gambar utama"
          hint="Rasio 16:9 disarankan. JPG, PNG, WEBP, atau AVIF; maksimal 10 MB."
          preview={imagePreview}
          alt={`Pratinjau gambar utama ${form.getValues('name') || 'produk'}`}
          onChange={changeMainImage}
          onRemove={removeMainImage}
        />
      </section>

      <section className="space-y-5 rounded-xl border border-border bg-card p-4 sm:p-6">
        <SectionHeading
          icon={Sparkles}
          title="Manfaat produk"
          description="Tambahkan manfaat yang diterima pengguna; urutan mengikuti susunan daftar."
        />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={benefits.fields.length >= 30}
            onClick={() => benefits.append({ title: '', description: '', icon: '' })}
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden /> Tambah manfaat
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          {benefits.fields.length ? (
            benefits.fields.map((field, index) => {
              const errors = form.formState.errors.benefits?.[index];
              return (
                <div
                  key={field.id}
                  className="grid gap-3 border-b border-border p-3 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto]"
                >
                  <input type="hidden" {...form.register(`benefits.${index}.icon`)} />
                  <div className="space-y-2">
                    <Label htmlFor={`benefit-${field.id}-title`}>Judul manfaat</Label>
                    <Input
                      id={`benefit-${field.id}-title`}
                      maxLength={120}
                      aria-invalid={!!errors?.title}
                      aria-describedby={
                        errors?.title ? `benefit-${field.id}-title-error` : undefined
                      }
                      {...form.register(`benefits.${index}.title`)}
                    />
                    <FieldError
                      id={`benefit-${field.id}-title-error`}
                      message={errors?.title?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`benefit-${field.id}-description`}>Deskripsi</Label>
                    <Textarea
                      id={`benefit-${field.id}-description`}
                      maxLength={500}
                      className="min-h-20 resize-y"
                      {...form.register(`benefits.${index}.description`)}
                    />
                  </div>
                  <OrderControls
                    label={`manfaat ${index + 1}`}
                    index={index}
                    total={benefits.fields.length}
                    onMove={benefits.move}
                    onRemove={() => benefits.remove(index)}
                  />
                </div>
              );
            })
          ) : (
            <p className="p-5 text-sm text-muted-foreground">Belum ada manfaat produk.</p>
          )}
        </div>
      </section>

      <section className="space-y-5 rounded-xl border border-border bg-card p-4 sm:p-6">
        <SectionHeading
          icon={Layers3}
          title="Fitur produk"
          description="Kelola fitur utama dan susunan tampilnya pada halaman detail."
        />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={features.fields.length >= 30}
            onClick={() => features.append({ title: '', description: '', icon: '' })}
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden /> Tambah fitur
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          {features.fields.length ? (
            features.fields.map((field, index) => {
              const errors = form.formState.errors.features?.[index];
              return (
                <div
                  key={field.id}
                  className="grid gap-3 border-b border-border p-3 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto]"
                >
                  <input type="hidden" {...form.register(`features.${index}.icon`)} />
                  <div className="space-y-2">
                    <Label htmlFor={`feature-${field.id}-title`}>Judul fitur</Label>
                    <Input
                      id={`feature-${field.id}-title`}
                      maxLength={120}
                      aria-invalid={!!errors?.title}
                      aria-describedby={
                        errors?.title ? `feature-${field.id}-title-error` : undefined
                      }
                      {...form.register(`features.${index}.title`)}
                    />
                    <FieldError
                      id={`feature-${field.id}-title-error`}
                      message={errors?.title?.message}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`feature-${field.id}-description`}>Deskripsi</Label>
                    <Textarea
                      id={`feature-${field.id}-description`}
                      maxLength={500}
                      className="min-h-20 resize-y"
                      {...form.register(`features.${index}.description`)}
                    />
                  </div>
                  <OrderControls
                    label={`fitur ${index + 1}`}
                    index={index}
                    total={features.fields.length}
                    onMove={features.move}
                    onRemove={() => features.remove(index)}
                  />
                </div>
              );
            })
          ) : (
            <p className="p-5 text-sm text-muted-foreground">Belum ada fitur produk.</p>
          )}
        </div>
      </section>

      <section className="space-y-5 rounded-xl border border-border bg-card p-4 sm:p-6">
        <SectionHeading
          icon={Cpu}
          title="Grup kapabilitas"
          description="Setiap grup dapat memiliki deskripsi, item, dan gambar atau diagram sendiri."
        />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={capabilities.fields.length >= 10}
            onClick={() =>
              capabilities.append({ title: '', description: '', imageUrl: '', items: [] })
            }
          >
            <Plus className="mr-2 h-4 w-4" aria-hidden /> Tambah grup
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          {capabilities.fields.length ? (
            capabilities.fields.map((field, index) => (
              <CapabilityGroupFields
                key={`${field.id}-${index}`}
                form={form}
                groupIndex={index}
                fieldId={field.id}
                totalGroups={capabilities.fields.length}
                preview={capabilityPreviews[field.id]}
                onMove={capabilities.move}
                onRemove={() => removeCapability(field.id, index)}
                onImageChange={(file) => changeCapabilityImage(field.id, file)}
                onImageRemove={() => removeCapabilityImage(field.id, index)}
              />
            ))
          ) : (
            <p className="p-5 text-sm text-muted-foreground">Belum ada grup kapabilitas.</p>
          )}
        </div>
      </section>

      <div className="sticky bottom-4 z-20 rounded-xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-background/85">
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button asChild variant="outline" className="min-h-10 sm:min-w-28">
            <Link href={'/admin/products' as Route}>Batal</Link>
          </Button>
          <Button
            type="submit"
            className="min-h-10 sm:min-w-40"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> Menyimpan…
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden />
                {product ? 'Simpan perubahan' : 'Simpan produk'}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
