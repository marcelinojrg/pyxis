import type { FC } from 'react';
import { Rocket, Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/ui/container';

const CULTURES = [
  {
    icon: Rocket,
    title: 'Inovasi Tanpa Henti',
    description:
      'Kami terus mengeksplorasi teknologi baru untuk memberikan nilai terbaik bagi mitra hospitality.',
  },
  {
    icon: Users,
    title: 'Kolaborasi Terbuka',
    description: 'Budaya kerja yang saling mendukung, terbuka akan ide-ide kreatif, dan inklusif bagi semua.',
  },
  {
    icon: ShieldCheck,
    title: 'Kualitas & Integritas',
    description: 'Menjaga standar tertinggi dalam penulisan kode, keamanan data, dan layanan pelanggan.',
  },
  {
    icon: HeartHandshake,
    title: 'Keseimbangan Kerja',
    description: 'Fleksibilitas kerja dan dukungan penuh untuk pertumbuhan karir dan kesejahteraan tim.',
  },
];

export const CareerCulture: FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Kultur & Nilai Utama Kami
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Lingkungan kerja yang dirancang untuk mendorong potensi terbaik Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {CULTURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
