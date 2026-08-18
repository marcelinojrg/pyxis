import Link from 'next/link';
// import { Container } from '@/components/ui/container';

export default function HomeCTA() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden bg-[#0A1222] text-white">
      {/* Background Architectural Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0B1E48]/80 via-[#0A1222]/95 to-[#050B14] -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="rounded-3xl bg-[#111C33]/80 backdrop-blur-md border border-white/10 p-8 sm:p-12 md:p-14 max-w-5xl mx-auto shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white leading-tight">
              Saatnya Bergabung
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
              Perkembangan teknologi begitu cepat dan perusahaan atau platform baru bermunculan
              setiap saat. Pyxis memberikan salah satu solusi terbaik untuk mengelola properti Anda
              dengan lebih cerdas.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full md:w-auto px-7 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-neutral-950 font-bold text-sm transition-all duration-200 shadow-lg active:scale-95 text-center"
            >
              Hubungi Tim Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
