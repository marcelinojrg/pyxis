import Link from 'next/link';
import { Container } from '@/components/ui/container';

interface HomeHeroProps {
  data: {
    title?: string | null;
    subtitle?: string | null;
    imageUrl?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
  } | null;
}

export default function HomeHero({ data }: HomeHeroProps) {
  const title = data?.title || 'Kelola Hotel Anda dengan Lebih Cerdas & Mudah';
  const subtitle =
    data?.subtitle ||
    'Pyxis membantu Anda meningkatkan efisiensi operasional, memaksimalkan pendapatan, dan memberikan pengalaman tamu yang tak terlupakan melalui satu platform terpadu.';
  const ctaLabel = data?.ctaLabel || 'Contact Us';
  const ctaUrl = data?.ctaUrl || '/contact';

  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 min-h-[85vh] flex items-center bg-gradient-to-b from-[#004AEB] to-[#001A53] text-white overflow-hidden">
      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/25 text-white text-xs font-medium backdrop-blur-sm">
              <span>Sistem Manajemen Properti #1</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-heading text-white leading-[1.18] tracking-tight">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-2">
              <Link
                href={ctaUrl}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-200"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Right Visual Empty Cards prepared for photos per reference */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-72 sm:h-80">
              {/* Back Card (Top Left) */}
              <div className="absolute top-0 left-0 w-[68%] h-48 sm:h-52 rounded-2xl bg-white/95 shadow-xl border border-white/40 backdrop-blur-sm" />

              {/* Front Card (Bottom Right Overlapping) */}
              <div className="absolute bottom-0 right-0 w-[78%] h-52 sm:h-56 rounded-2xl bg-white shadow-2xl border border-white" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

