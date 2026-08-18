import { FC } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';

export interface AboutProfileProps {
  officeAddress?: string | null;
  imageUrl?: string | null;
}

export const AboutProfile: FC<AboutProfileProps> = ({ imageUrl }) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Image with Badge */}
          <div className="lg:col-span-6">
            <div className="relative">
              {imageUrl ? (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={imageUrl}
                    alt="Perjalanan Pyxis Ultimate Solution"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] rounded-2xl bg-neutral-300 shadow-lg" />
              )}

              {/* "30+ Years of Innovation" badge */}
              <div className="absolute -bottom-4 right-4 sm:right-6 bg-white rounded-xl px-5 py-3 shadow-lg border border-neutral-200/80 flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold font-heading text-[#F59E0B]">
                  30+
                </span>
                <span className="text-xs sm:text-sm font-medium text-neutral-700 leading-tight">
                  Years of
                  <br />
                  Innovation
                </span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-neutral-900 leading-tight">
              Our Journey
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Dari rintisan sebagai penyedia perangkat lunak hotel lokal pada 1989 hingga
              bertransformasi menjadi mitra infrastruktur digital skala enterprise. Pyxis terus
              berevolusi mendukung operasional hospitality di seluruh Indonesia dengan inovasi
              terdepan.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
