import type { FC } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
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
    <section className="bg-[#f7f8fa] pt-28 pb-8 md:pt-32 md:pb-10">
      <Container className="text-left">
        <Link
          href="/careers"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#07358b] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Karir
        </Link>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-neutral-900 leading-tight mb-4">
            {title}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-5 h-5" />
              {location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-5 h-5" />
              {type}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
