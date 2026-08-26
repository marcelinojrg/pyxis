'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, GripVertical, ImageUp, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { createProduct, updateProduct } from '@/services/admin/products';
import { uploadImage } from '@/services/public/uploads';
import { productSchema, type ProductValues } from '@/schemas/products';
import { useRouter } from 'next/navigation';

interface ProductFormProduct {
  id: string;
  name: string;
  description: string | null;
  featureSubtitle: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
  features: { title: string; description?: string | null }[];
  capabilities: {
    title: string;
    description: string | null;
    imageUrl: string | null;
    items: { title: string; description?: string | null }[];
  }[];
}

interface ProductFormProps {
  product?: ProductFormProduct;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(product?.image || '');
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const capability = product?.capabilities?.[0];
  const [capabilityImageFile, setCapabilityImageFile] = useState<File | null>(null);
  const [capabilityImageUrl, setCapabilityImageUrl] = useState(capability?.imageUrl || '');
  const [capabilityImagePreview, setCapabilityImagePreview] = useState(capability?.imageUrl || '');
  const form = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      featureSubtitle: product?.featureSubtitle || '',
      image: product?.image || '',
      order: product?.order ?? 0,
      isActive: product?.isActive ?? true,
      features: product?.features.length
        ? product.features.map((feature) => ({
            title: feature.title,
            description: feature.description ?? undefined,
          }))
        : [{ title: '', description: '' }],
      capabilityTitle: capability?.title || 'System Capabilities',
      capabilityDescription: capability?.description || '',
      capabilityImageUrl: capability?.imageUrl || '',
      capabilityItems: capability?.items.length
        ? capability.items.map((item) => ({
            title: item.title,
            description: item.description ?? undefined,
          }))
        : [],
    },
  });
  const features = useFieldArray({ control: form.control, name: 'features' });
  const capabilityItems = useFieldArray({ control: form.control, name: 'capabilityItems' });
  const shortDescription = useWatch({ control: form.control, name: 'description' }) || '';
  const isActive = useWatch({ control: form.control, name: 'isActive' });

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
      if (capabilityImagePreview.startsWith('blob:')) URL.revokeObjectURL(capabilityImagePreview);
    };
  }, [imagePreview, capabilityImagePreview]);

  function handleImageChange(file: File | null) {
    if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : imageUrl);
  }

  function handleCapabilityImageChange(file: File | null) {
    if (capabilityImagePreview.startsWith('blob:')) URL.revokeObjectURL(capabilityImagePreview);
    setCapabilityImageFile(file);
    setCapabilityImagePreview(file ? URL.createObjectURL(file) : capabilityImageUrl);
  }

  async function onSubmit(values: ProductValues) {
    let image = imageUrl;
    if (imageFile) {
      const upload = await uploadImage(imageFile, 'products');
      if (!upload.success || !upload.url) {
        toast.error(upload.error || 'Gambar gagal diunggah.');
        return;
      }
      image = upload.url;
    }

    let nextCapabilityImageUrl = capabilityImageUrl;
    if (capabilityImageFile) {
      const upload = await uploadImage(capabilityImageFile, 'products');
      if (!upload.success || !upload.url) {
        toast.error(upload.error || 'Foto System Capabilities gagal diunggah.');
        return;
      }
      nextCapabilityImageUrl = upload.url;
    }

    const result = product
      ? await updateProduct(product.id, {
          ...values,
          image,
          capabilityImageUrl: nextCapabilityImageUrl,
        })
      : await createProduct({ ...values, image, capabilityImageUrl: nextCapabilityImageUrl });

    if (!result.success) {
      toast.error(result.error || 'Produk gagal disimpan.');
      return;
    }

    toast.success(result.message || 'Produk berhasil disimpan.');
    router.push('/admin/products' as Route);
    router.refresh();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-4xl min-w-0 space-y-8 overflow-x-hidden"
    >
      <div>
        <Link
          href={'/admin/products' as Route}
          className="inline-flex items-center gap-1.5 text-sm text-[#4D5361] hover:text-[#123A91]"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Produk
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#172033]">
          {product ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h1>
      </div>

      <section className="space-y-7 rounded-xl border border-[#DCE1EA] bg-white p-6 shadow-[0_8px_24px_rgba(30,41,59,0.05)] sm:p-8">
        <div className="space-y-2">
          <Label htmlFor="name">
            Nama Produk <span className="text-red-600">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Masukkan nama produk"
            {...form.register('name')}
            aria-invalid={!!form.formState.errors.name}
          />
          {form.formState.errors.name ? (
            <p className="text-xs font-medium text-red-600">{form.formState.errors.name.message}</p>
          ) : (
            <p className="text-xs text-[#5A6272]">Nama ini tampil di halaman publik.</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="description">Deskripsi Singkat</Label>
            <span className="text-xs text-[#5A6272]">{shortDescription.length}/150</span>
          </div>
          <Textarea
            id="description"
            placeholder="Tulis deskripsi singkat..."
            maxLength={150}
            {...form.register('description')}
            aria-invalid={!!form.formState.errors.description}
          />
          {form.formState.errors.description ? (
            <p className="text-xs font-medium text-red-600">
              {form.formState.errors.description.message}
            </p>
          ) : (
            <p className="text-xs text-[#5A6272]">Muncul di card produk, maksimal 150 karakter.</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="featureSubtitle">Deskripsi Lengkap</Label>
          <Textarea
            id="featureSubtitle"
            className="min-h-40"
            placeholder="Tulis deskripsi lengkap produk di sini..."
            {...form.register('featureSubtitle')}
            aria-invalid={!!form.formState.errors.featureSubtitle}
          />
          {form.formState.errors.featureSubtitle ? (
            <p className="text-xs font-medium text-red-600">
              {form.formState.errors.featureSubtitle.message}
            </p>
          ) : null}
        </div>

        <div className="border-t border-[#E3E7EE] pt-7">
          <Label>Fitur Produk</Label>
          <div className="mt-3 space-y-3">
            {features.fields.map((field, index) => (
              <div
                key={field.id}
                className="grid min-w-0 gap-2 sm:grid-cols-[20px_minmax(0,1fr)_minmax(0,1fr)_40px]"
              >
                <GripVertical className="h-5 w-5 shrink-0 text-[#8992A3]" aria-hidden />
                <Input
                  placeholder="Masukkan fitur produk..."
                  {...form.register(`features.${index}.title`)}
                  aria-invalid={!!form.formState.errors.features?.[index]?.title}
                />
                <Input
                  placeholder="Deskripsi fitur (opsional)"
                  {...form.register(`features.${index}.description`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-[#5A6272] hover:text-red-600"
                  onClick={() => features.remove(index)}
                  aria-label="Hapus fitur"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {form.formState.errors.features?.root ? (
            <p className="mt-2 text-xs font-medium text-red-600">
              {form.formState.errors.features.root.message}
            </p>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-4 bg-[#FFF4E6] text-[#B96B00] hover:bg-[#FFE8C7]"
            onClick={() => features.append({ title: '' })}
          >
            <Plus className="h-4 w-4" /> Tambah Fitur
          </Button>
        </div>

        <div className="space-y-5 border-t border-[#E3E7EE] pt-7">
          <div>
            <Label>System Capabilities</Label>
            <p className="mt-1 text-xs text-[#5A6272]">
              Bagian ini tampil sebagai section kedua di detail produk.
            </p>
          </div>
          <Input placeholder="Judul kapabilitas" {...form.register('capabilityTitle')} />
          <Textarea
            placeholder="Deskripsi System Capabilities..."
            {...form.register('capabilityDescription')}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilityItems.fields.map((field, index) => (
              <div key={field.id} className="flex min-w-0 items-center gap-2">
                <Input
                  placeholder="Nama kapabilitas"
                  {...form.register(`capabilityItems.${index}.title`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-[#5A6272] hover:text-red-600"
                  onClick={() => capabilityItems.remove(index)}
                  aria-label="Hapus kapabilitas"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="bg-[#FFF4E6] text-[#B96B00] hover:bg-[#FFE8C7]"
            onClick={() => capabilityItems.append({ title: '', description: '' })}
          >
            <Plus className="h-4 w-4" /> Tambah Kapabilitas
          </Button>
          <div>
            <Label htmlFor="capabilityImage">Foto Kedua</Label>
            <label
              htmlFor="capabilityImage"
              className="relative mt-3 flex min-h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-[#C7CFDF] bg-[#F8FAFC] text-center hover:border-[#123A91]"
            >
              {capabilityImagePreview ? (
                <>
                  <Image
                    src={capabilityImagePreview}
                    alt="Preview foto System Capabilities"
                    fill
                    sizes="(max-width: 640px) 100vw, 768px"
                    className="object-contain p-2"
                    unoptimized={capabilityImagePreview.startsWith('blob:')}
                  />
                  <span className="absolute bottom-3 rounded-md bg-[#123A91] px-3 py-1.5 text-xs font-semibold text-white">
                    Ganti gambar
                  </span>
                </>
              ) : (
                <span className="text-sm font-semibold text-[#123A91]">Pilih foto kedua</span>
              )}
            </label>
            <Input
              id="capabilityImage"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="sr-only"
              onChange={(event) => handleCapabilityImageChange(event.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="border-t border-[#E3E7EE] pt-7">
          <Label htmlFor="image">Gambar Produk</Label>
          <label
            htmlFor="image"
            className="relative mt-3 flex aspect-video w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-[#C7CFDF] bg-[#F8FAFC] text-center hover:border-[#123A91]"
          >
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt="Preview gambar produk"
                  fill
                  sizes="384px"
                  className="object-contain p-2"
                  unoptimized={imagePreview.startsWith('blob:')}
                />
                <span className="absolute bottom-3 rounded-md bg-[#123A91] px-3 py-1.5 text-xs font-semibold text-white">
                  Ganti gambar
                </span>
              </>
            ) : (
              <span className="flex flex-col items-center px-4">
                <ImageUp className="h-7 w-7 text-[#7A8394]" />
                <span className="mt-2 text-sm font-semibold text-[#123A91]">
                  Pilih gambar produk
                </span>
                <span className="mt-1 text-xs text-[#5A6272]">
                  JPG, PNG, WEBP, atau AVIF, maksimal 10 MB
                </span>
              </span>
            )}
          </label>
          <Input
            id="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            onChange={(event) => handleImageChange(event.target.files?.[0] || null)}
          />
        </div>

        <div className="grid gap-6 border-t border-[#E3E7EE] pt-7 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="order">Urutan Tampil</Label>
            <select
              id="order"
              className="h-9 w-full max-w-40 rounded-md border border-[#C7CFDF] bg-white px-2.5 text-sm outline-none focus:border-[#123A91] focus:ring-2 focus:ring-[#123A91]/20"
              {...form.register('order', {
                setValueAs: (value) => (value === 'last' ? 'last' : Number(value)),
              })}
              aria-invalid={!!form.formState.errors.order}
            >
              {[...new Set([1, product?.order ?? 1])]
                .sort((a, b) => a - b)
                .map((value) => (
                  <option key={value} value={value}>
                    {value === 1 ? '1 (paling atas)' : value}
                  </option>
                ))}
              <option value="last">Terakhir (paling bawah)</option>
            </select>
            <p className="text-xs text-[#5A6272]">Pilih 1 untuk paling atas atau Terakhir.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="isActive">Status Publikasi</Label>
            <div className="flex items-center gap-3 pt-1">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={(checked) => form.setValue('isActive', checked)}
              />
              <span className="text-sm font-medium text-[#172033]">Publikasikan produk ini</span>
            </div>
            <p className="text-xs text-[#5A6272]">
              Produk nonaktif tidak muncul di halaman publik.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 pb-8">
        <Button
          asChild
          variant="outline"
          className="border-[#123A91] text-[#123A91] hover:bg-[#EEF3FF]"
        >
          <Link href={'/admin/products' as Route}>Batal</Link>
        </Button>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-[#123A91] px-5 text-white hover:bg-[#0B2E75]"
        >
          {form.formState.isSubmitting
            ? 'Menyimpan...'
            : product
              ? 'Simpan Perubahan'
              : 'Simpan Produk'}
        </Button>
      </div>
    </form>
  );
}
