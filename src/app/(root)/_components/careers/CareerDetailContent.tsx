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
    <div className="space-y-16">
      <section className="border-t border-neutral-300 pt-6">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
          About the role
        </h2>
        <p className="mt-6 max-w-3xl whitespace-pre-line text-base leading-8 text-neutral-600">
          {description}
        </p>
      </section>

      {responsibilities.length > 0 && (
        <section className="border-t border-neutral-300 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
            Key responsibilities
          </h2>
          <ul className="mt-7 grid gap-x-10 gap-y-5 border-t border-neutral-200 pt-6 text-sm leading-7 text-neutral-600 sm:grid-cols-2">
            {responsibilities.map((res) => (
              <li key={res} className="flex gap-3 border-b border-neutral-200 pb-5">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1D4ED8]" aria-hidden="true" />
                {res}
              </li>
            ))}
          </ul>
        </section>
      )}

      {requirements.length > 0 && (
        <section className="border-t border-neutral-300 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
            Requirements
          </h2>
          <ul className="mt-7 grid gap-x-10 gap-y-5 border-t border-neutral-200 pt-6 text-sm leading-7 text-neutral-600 sm:grid-cols-2">
            {requirements.map((req) => (
              <li key={req} className="flex gap-3 border-b border-neutral-200 pb-5">
                <span
                  className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F59E0B]"
                  aria-hidden="true"
                />
                {req}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
