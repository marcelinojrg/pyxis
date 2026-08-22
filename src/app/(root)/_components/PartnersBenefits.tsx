import type { FC } from 'react';
import { Cpu, Globe, Headphones } from 'lucide-react';
import { Container } from '@/components/ui/container';

const BENEFITS = [
  {
    id: 'tech',
    icon: Cpu,
    title: 'Teknologi Terdepan',
    description:
      'Akses API modern dan arsitektur cloud terdesentralisasi yang dirancang khusus untuk reliabilitas tinggi dan skalabilitas operasional hospitality.',
  },
  {
    id: 'market',
    icon: Globe,
    title: 'Jangkauan Pasar Luas',
    description:
      'Terhubung dengan jaringan klien enterprise kami di seluruh wilayah, membuka peluang baru untuk distribusi dan ekspansi bisnis bersama.',
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Dukungan Teknis Prioritas',
    description:
      'Dapatkan bantuan langsung dari tim engineer kami untuk memastikan integrasi berjalan lancar dan optimal tanpa hambatan teknis.',
  },
];

export const PartnersBenefits: FC = () => {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Mengapa Bermitra dengan Kami?
          </h2>
          <div className="h-1 w-14 bg-[#F59E0B] rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="bg-white rounded-2xl p-7 border border-neutral-200/70 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{benefit.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
