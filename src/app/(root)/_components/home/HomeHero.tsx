import type { Route } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

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
  const title = data?.title || 'The smarter way to run your hotel';
  const subtitle =
    data?.subtitle ||
    'Pyxis helps hotel operations become more efficient, connected, and profitable.';
  const ctaLabel = data?.ctaLabel || 'Schedule a Presentation';
  const ctaUrl = data?.ctaUrl || '/contact';

  return (
    <section className="relative flex min-h-[76vh] items-center overflow-hidden bg-[radial-gradient(circle_at_82%_24%,rgba(96,165,250,0.22),transparent_34%),linear-gradient(135deg,#004AEB_0%,#001A53_100%)] py-24 text-white md:py-32">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="max-w-4xl border-t border-white/25 pt-9 text-left md:pt-11 lg:col-span-7">
            <div className="space-y-6">
              <h1
                data-home-reveal="heading"
                className="max-w-3xl text-3xl font-bold leading-[1.06] tracking-[-0.035em] text-white sm:text-4xl md:text-5xl lg:text-[4rem]"
              >
                {title}
              </h1>

              <p
                data-home-reveal="copy"
                className="max-w-lg text-sm leading-7 text-blue-50/90 sm:text-base"
              >
                {subtitle}
              </p>

              <div data-home-reveal="cta" className="pt-1">
                <Link
                  href={ctaUrl as Route}
                  className="group inline-flex items-center gap-3 border-b border-[#F59E0B] pb-2 text-sm font-semibold text-white transition-colors duration-200 hover:text-[#FBBF24]"
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-5 w-5 rotate-90 transition-transform duration-300 group-hover:rotate-0" />
                </Link>
              </div>
            </div>
          </div>

          <figure data-home-reveal="media" className="lg:col-span-5 lg:translate-y-4">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/25 bg-blue-950/30">
              <Image
                src="/assets/img/home-hero-hotel-lobby-unsplash.jpg"
                alt="Modern hotel lobby interior"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-b border-white/25 py-3 text-xs text-blue-100/80">
              <span>Hotel lobby</span>
              <span>Hospitality</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
