// import { Container } from '@/components/ui/container';
import { Eye, Rocket } from 'lucide-react';

export default function HomeVisionMission() {
  return (
    <section className="py-16 bg-white border-t border-neutral-200/70">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <h2
              data-home-reveal="heading"
              className="text-3xl sm:text-4xl font-bold font-heading text-neutral-900 leading-tight"
            >
              Visi & Misi Perjalanan Kami
            </h2>
            <p
              data-home-reveal="copy"
              className="text-sm sm:text-base text-neutral-600 leading-relaxed"
            >
              Sepanjang perjalanan kami, kami telah melayani berbagai industri. Pada tahun 2011,
              kami melihat peluang di industri operasi tambang batu bara dan perhotelan. Namun,
              untuk memberikan solusi terbaik, kami memutuskan untuk memfokuskan kembali dedikasi
              kami pada industri Teknologi Informasi perhotelan melalui Pyxis Ultimate Solution,
              melanjutkan warisan keahlian dan inovasi kami.
            </p>
          </div>

          {/* Right Stacked Cards */}
          <div className="lg:col-span-6 space-y-4">
            {/* Visi Card */}
            <div
              data-home-reveal="card"
              className="bg-[#EFF6FF] rounded-2xl p-6 border border-blue-200/80 flex items-start gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Eye className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold font-heading text-neutral-900">Visi</h3>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  Menjadi penyedia solusi Teknologi Informasi perhotelan terdepan yang memberdayakan
                  industri melalui inovasi digital berbasis cloud dan layanan unggulan.
                </p>
              </div>
            </div>

            {/* Misi Card */}
            <div
              data-home-reveal="card"
              className="bg-[#0B1E48] text-white rounded-2xl p-6 border border-blue-950 shadow-md flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Rocket className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold font-heading text-white">Misi</h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Berdedikasi untuk melanjutkan warisan keahlian kami dengan memberikan solusi
                  operasional hotel yang cerdas, efisien, dan andal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
