import type { FC } from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Briefcase, Building } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface CareerDetailHeaderProps {
  title: string;
  department?: string | null;
  location: string;
  type: string;
}

export const CareerDetailHeader: FC<CareerDetailHeaderProps> = ({
  title,
  department,
  location,
  type,
}) => {
  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-r from-[#001A53] to-[#004AEB] text-white">
      <Container>
        <nav className="flex items-center gap-2 text-xs text-blue-200 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
          <Link href="/careers" className="hover:text-white transition-colors">
            Karir
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
          <span className="text-white font-medium truncate max-w-xs">{title}</span>
        </nav>

        <div className="max-w-4xl">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-4">
            {department || 'Pekerjaan Penuh Waktu'}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white leading-tight mb-4">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs sm:text-sm text-blue-100">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-300" />
              {location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-300" />
              {type}
            </span>
            {department && (
              <span className="inline-flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-300" />
                {department}
              </span>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
