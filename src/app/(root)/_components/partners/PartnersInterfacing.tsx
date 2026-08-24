import type { FC } from 'react';
import {
  ArrowLeftRight,
  TabletSmartphone,
  KeyRound,
  PhoneCall,
  SlidersHorizontal,
} from 'lucide-react';
import { Container } from '@/components/ui/container';

const INTERFACING_CATEGORIES = [
  {
    id: 'channel-managers',
    icon: ArrowLeftRight,
    title: 'Channel Managers',
    description: 'Optimasi distribusi via jaringan OTA global terkemuka.',
  },
  {
    id: 'device-integration',
    icon: TabletSmartphone,
    title: 'Device Integration',
    description: 'Konektivitas hardware operasional hotel yang mulus.',
  },
  {
    id: 'keylock-systems',
    icon: KeyRound,
    title: 'Keylock Systems',
    description: 'Keamanan akses kamar dengan teknologi RFID & Mobile Key.',
  },
  {
    id: 'pabx',
    icon: PhoneCall,
    title: 'P.A.B.X.',
    description: 'Sistem telekomunikasi internal dan eksternal terpadu.',
  },
  {
    id: 'smart-devices',
    icon: SlidersHorizontal,
    title: 'Smart Devices',
    description: 'Otomatisasi ruangan dan kontrol lingkungan berbasis IoT.',
  },
];

export const PartnersInterfacing: FC = () => {
  return (
    <section className="py-16 bg-neutral-50/60 border-t border-neutral-100">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            50+ Interfacing Partners
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Terintegrasi dengan ekosistem teknologi terbaik di industri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {INTERFACING_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-start space-y-3.5"
              >
                <div className="text-blue-600">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">{category.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
