import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { genPageMetadata } from '@/app/seo';

export const metadata: Metadata = genPageMetadata({
  title: '404 — Halaman Tidak Ditemukan',
  description: 'Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.',
});

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white text-neutral-900 px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <div className="max-w-xl mx-auto text-center flex flex-col items-center">
        {/* 404 Big Display Number */}
        <h1 className="font-heading font-semibold text-[9rem] sm:text-[13rem] md:text-[15rem] leading-none tracking-tight text-[#16429A] select-none">
          404
        </h1>

        {/* Subtitle Heading */}
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight mb-3">
          Halaman Tidak Ditemukan
        </h2>

        {/* Description Paragraph */}
        <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-md mb-8">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0C235A] hover:bg-[#08183E] text-white font-medium text-sm transition-colors shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}


