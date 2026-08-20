import type { FC } from 'react';
import { Eye, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AboutVisionMissionProps {
  vision?: string | null;
  mission?: string | null;
}

// Product evolution timeline data matching the reference design
const EVOLUTION_ITEMS = [
  {
    generation: 'Gen 1-2: DOS & Windows',
    description: 'Langkah awal komputasi hingga transisi antarmuka grafis.',
    period: '1989-2000',
    dotStyle: 'border-2 border-neutral-400 bg-white',
  },
  {
    generation: 'Gen 3: Hybrid Technology',
    description: 'Menjembatani sistem desktop tradisional dengan akses cloud.',
    period: '2010',
    dotStyle: 'border-2 border-neutral-400 bg-white',
  },
  {
    generation: 'Gen 4: Smart IoT',
    description: 'Otomatisasi cerdas dan perangkat terhubung mobile.',
    period: '2020',
    dotStyle: 'border-2 border-neutral-400 bg-white',
  },
  {
    generation: 'Gen 5: Digital Infrastructure',
    description: 'Solusi cloud-native menyeluruh masa kini.',
    period: '2022-Now',
    dotStyle: 'bg-[#0B1E48]',
    isActive: true,
  },
];

export const AboutVisionMission: FC<AboutVisionMissionProps> = ({ vision, mission }) => {
  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC] border-t border-neutral-200/70">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left Column: Vision & Mission */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-neutral-900 leading-tight underline underline-offset-8 decoration-2 decoration-[#1D4ED8]">
                Vision & Mission
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Fondasi kami dalam memberikan layanan terbaik untuk industri perhotelan.
              </p>
            </div>

            <div className="space-y-4">
              {/* Visi Card */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Eye className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-heading text-neutral-900">Visi</h3>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {vision ||
                      'Menjadi penyedia solusi TI perhotelan terdepan melalui inovasi digital berbasis cloud.'}
                  </p>
                </div>
              </div>

              {/* Misi Card */}
              <div className="bg-[#0B1E48] text-white rounded-2xl p-6 border border-blue-950 shadow-md flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Rocket className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-heading text-white">Misi</h3>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                    {mission ||
                      'Memberikan solusi operasional hotel yang cerdas, efisien, dan andal.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Evolusi Produk Timeline */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1D4ED8] leading-tight">
              Evolusi Produk
            </h2>

            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-neutral-300" />

              {EVOLUTION_ITEMS.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-5 py-3">
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      'relative z-10 w-[16px] h-[16px] rounded-full shrink-0 mt-1',
                      item.dotStyle
                    )}
                  />

                  {/* Content */}
                  <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold font-heading text-neutral-900">
                      {item.generation}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.description}{' '}
                      <span
                        className={cn(
                          'font-semibold',
                          item.isActive ? 'text-[#F59E0B]' : 'text-[#1D4ED8]'
                        )}
                      >
                        ({item.period})
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
