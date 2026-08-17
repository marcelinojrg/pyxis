// import { Container } from '@/components/ui/container';
import { Image as ImageIcon } from 'lucide-react';

const MILESTONES = [
  {
    year: '1989',
    title: 'PT. DACCOM ANUGERAHMULYA',
    description:
      'Didirikan sebagai perusahaan dagang di bidang komputer, telekomunikasi, dan pengembangan perangkat lunak.',
  },
  {
    year: '2000',
    title: 'PT. MYOHDOTCOM',
    description:
      'Menyediakan perangkat lunak dan layanan TI untuk hotel, restoran, real estate, telekomunikasi, dan lainnya.',
  },
  {
    year: '2003',
    title: 'The DOTCOM',
    description:
      'Berubah nama menjadi PT MYOH Technology Tbk untuk memberikan kesan yang tepat sebagai perusahaan IT Developer.',
  },
  {
    year: '2011',
    title: 'PT. Pyxis Ultimate Solution',
    description:
      'Didirikan untuk berkonsentrasi pada bisnis awal yaitu Teknologi Informasi perhotelan, mengambil alih layanan dari pelanggan MYOH.',
  },
];

export default function HomeAboutSummary() {
  return (
    <section className="py-20 bg-[#F8FAFC] border-t border-neutral-200/70">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Split: Text Left + Empty Photo Container Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-neutral-900 leading-tight">
              Tentang Pyxis
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              PT PYXIS Ultimate Solution (PYXIS) adalah perusahaan teknologi informasi yang
              membangun inovatif solusi digital dengan menyediakan infrastruktur digital berbasis
              cloud dan layanan teknologi, memungkinkan pelanggan untuk tetap berada di depan kurva.
            </p>
          </div>

          <div className="lg:col-span-6">
            {/* Clean Empty Photo Container prepared for photo */}
            <div className="w-full h-56 sm:h-64 rounded-2xl bg-[#E8EEFB] border border-blue-200/60 flex items-center justify-center shadow-sm">
              <ImageIcon className="w-12 h-12 text-[#1D4ED8]/30" />
            </div>
          </div>
        </div>

        {/* Bottom: 4 Milestone Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((item) => (
            <div
              key={item.year}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex flex-col space-y-3"
            >
              <span className="text-xl font-extrabold font-heading text-[#1D4ED8]">
                {item.year}
              </span>
              <h3 className="text-xs sm:text-sm font-bold font-heading text-neutral-900 uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
