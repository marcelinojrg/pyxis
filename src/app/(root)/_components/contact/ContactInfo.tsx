import type { FC } from 'react';
import { cn } from '@/lib/utils';
import { Building2, Store, MapPin, Phone, Mail } from 'lucide-react';

export interface BranchItem {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isPrimary?: boolean;
}

export interface ContactInfoProps {
  branches?: BranchItem[];
  className?: string;
}

const DEFAULT_BRANCHES: BranchItem[] = [
  {
    id: 'malang',
    name: 'PT. Pyxis Ultimate Solution',
    isPrimary: true,
    address: 'Jl. Tambora No. 15\nMalang 65115, Indonesia',
    phone: '+62 341 550246',
    email: 'corporate@thepyxis.net',
  },
  {
    id: 'denpasar',
    name: 'CV. Aryacom Teknologi',
    isPrimary: false,
    address: 'Grand Sudirman Agung B-26\nJl. PB Sudirman, Denpasar',
    phone: '+62 361 224681',
    email: 'aryateknologi@gmail.com',
  },
];

export const ContactInfo: FC<ContactInfoProps> = ({ branches = [], className }) => {
  const displayBranches = branches.length > 0 ? branches : DEFAULT_BRANCHES;

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 md:gap-x-0 md:gap-y-0 md:divide-x md:divide-neutral-200',
        className
      )}
    >
      {displayBranches.map((branch) => {
        const Icon = branch.isPrimary ? Building2 : Store;
        const badge = branch.isPrimary ? 'HEAD OFFICE' : 'DISTRIBUTOR / PARTNER';

        return (
          <article
            key={branch.id}
            className="border-t border-neutral-300 py-6 md:px-8 md:first:pl-0 md:last:pr-0"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]">
                  {badge}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-neutral-900">
                  {branch.name}
                </h3>
              </div>
              <Icon className="mt-1 h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden="true" />
            </div>

            <div className="mt-6 space-y-4 border-t border-neutral-200 pt-5 text-sm text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                <span className="whitespace-pre-line leading-6">{branch.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                <a
                  href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`}
                  className="transition-colors hover:text-blue-600"
                >
                  {branch.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                <a
                  href={`mailto:${branch.email}`}
                  className="transition-colors hover:text-blue-600"
                >
                  {branch.email}
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
