import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
// import { Container } from '@/components/ui/container';

interface HomeHeroProps {
  data?: {
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
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 min-h-[85vh] flex items-center bg-linear-to-b from-[#004AEB] to-[#001A53] text-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-heading text-white leading-[1.18] tracking-tight">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-2">
              <Link
                href={ctaUrl as Route}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-200"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Right Visual Cards */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg h-72 sm:h-80 md:h-88">
              {/* Back Card (Top Right) */}
              <div className="absolute top-0 right-0 w-[68%] h-48 sm:h-56 rounded-2xl bg-white/95 shadow-xl backdrop-blur-sm overflow-hidden">
                <Image
                  src="/assets/img/home-hero-pyxis.webp"
                  alt="Pyxis Ultimate Solution"
                  fill
                  sizes="(max-width: 1024px) 70vw, 28vw"
                  className="object-cover"
                  quality={75}
                />
              </div>

              {/* Front Card (Bottom Left Overlapping) */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 z-10 w-[62%] h-44 sm:h-52 rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/5 overflow-hidden">
                <Image
                  src="/assets/img/home-hero-ilustrasi.jpg"
                  alt="Ilustrasi platform Pyxis"
                  fill
                  sizes="(max-width: 1024px) 70vw, 26vw"
                  className="object-cover"
                  quality={75}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
