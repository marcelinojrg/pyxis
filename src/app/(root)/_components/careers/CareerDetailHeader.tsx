import type { FC } from 'react';
import Link from 'next/link';
import { ArrowLeft, BriefcaseBusiness, Clock3, MapPin } from 'lucide-react';
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
    <section className="border-b border-neutral-200 bg-white pb-12 pt-28 md:pb-16 md:pt-36">
      <Container>
        <div className="border-t border-neutral-300 pt-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline decoration-[#F59E0B] underline-offset-8 transition-colors hover:text-[#1D4ED8]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to all openings
          </Link>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-neutral-950 sm:text-5xl lg:text-[4.5rem]">
                {title}
              </h1>
            </div>

            <dl className="grid border-y border-neutral-300 text-sm text-neutral-700 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
              <div className="flex items-center gap-4 border-b border-neutral-200 py-4 sm:border-b-0 sm:border-r sm:px-4 lg:border-b lg:border-r-0 lg:px-0">
                <MapPin className="h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    Location
                  </dt>
                  <dd className="mt-1">{location}</dd>
                </div>
              </div>
              <div className="flex items-center gap-4 border-b border-neutral-200 py-4 sm:border-b-0 sm:border-r sm:px-4 lg:border-b lg:border-r-0 lg:px-0">
                <Clock3 className="h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    Work type
                  </dt>
                  <dd className="mt-1">{type}</dd>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 sm:px-4 lg:px-0">
                <BriefcaseBusiness className="h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    Department
                  </dt>
                  <dd className="mt-1">{department || 'Not specified'}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
};
