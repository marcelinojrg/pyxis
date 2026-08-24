import type { FC } from 'react';

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
    <div className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs">
      <div>
        <h2 className="text-lg font-bold text-neutral-900 mb-3 border-b border-neutral-100 pb-2">
          Tentang Peran Ini
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{description}</p>
      </div>

      {responsibilities.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-3 border-b border-neutral-100 pb-2">
            Tanggung Jawab Utama
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600 leading-relaxed">
            {responsibilities.map((res) => (
              <li key={res} className="pl-1">
                {res}
              </li>
            ))}
          </ul>
        </div>
      )}

      {requirements.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-neutral-900 mb-3 border-b border-neutral-100 pb-2">
            Persyaratan & Kualifikasi
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600 leading-relaxed">
            {requirements.map((req) => (
              <li key={req} className="pl-1">
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
