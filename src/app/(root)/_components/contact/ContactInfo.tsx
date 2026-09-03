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
    <div className={cn('space-y-6', className)}>
      {displayBranches.map((branch) => {
        const Icon = branch.isPrimary ? Building2 : Store;
        const badge = branch.isPrimary ? 'KANTOR PUSAT' : 'CABANG / MITRA';

        return (
          <div
            key={branch.id}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/70 shadow-xs space-y-5"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                  {branch.name}
                </h3>
                <span className="inline-block text-[11px] font-bold tracking-wider text-neutral-400 uppercase mt-0.5">
                  {badge}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-sm text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-1" />
                <span className="whitespace-pre-line leading-relaxed">{branch.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                <a
                  href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {branch.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <a
                  href={`mailto:${branch.email}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {branch.email}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
