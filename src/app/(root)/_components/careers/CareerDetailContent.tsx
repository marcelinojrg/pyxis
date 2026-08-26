import type { FC } from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface CareerDetailContentProps {
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const CareerDetailContent: FC<CareerDetailContentProps> = ({
  description,
  responsibilities,
  requirements,
}) => {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[#07358b] mb-6">Tentang Peran Ini</h2>
        <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </section>

      {responsibilities.length > 0 && (
        <section className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#07358b] mb-6">Tanggung Jawab Utama</h2>
          <ul className="space-y-4 text-sm text-neutral-600 leading-relaxed">
            {responsibilities.map((res) => (
              <li key={res} className="grid grid-cols-[20px_1fr] gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
                {res}
              </li>
            ))}
          </ul>
        </section>
      )}

      {requirements.length > 0 && (
        <section className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#07358b] mb-6">Persyaratan</h2>
          <ul className="space-y-4 text-sm text-neutral-600 leading-relaxed">
            {requirements.map((req) => (
              <li key={req} className="grid grid-cols-[8px_1fr] gap-3">
                <span className="mt-2 h-0 w-0 border-y-4 border-y-transparent border-l-4 border-l-[#a86d12]" />
                {req}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
