import Link from 'next/link';
// import { Container } from '@/components/ui/container';
import { Calendar, Users, BarChart3, RefreshCw, ArrowRight } from 'lucide-react';

export default function HomeFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-neutral-900">
            Fitur Lengkap untuk Segala Kebutuhan
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Solusi all-in-one yang dirancang khusus untuk menyederhanakan operasional hotel Anda
            dari front desk hingga back office.
          </p>
        </div>

        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Row 1: Reservasi Lebih Mudah (Left - Col 7) + Profil Tamu Spesifik (Right - Col 5) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Card 1: Reservasi Lebih Mudah */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-neutral-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-neutral-900">
                  Reservasi Lebih Mudah
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Kelola pemesanan dari berbagai saluran dalam satu kalender interaktif. Cegah
                  overbooking dan tingkatkan okupansi dengan manajemen inventaris real-time.
                </p>
              </div>
              {/* Clean Empty Photo Container */}
              <div className="w-full h-44 sm:h-52 rounded-xl bg-[#F0F4FA] border border-neutral-200/70" />
            </div>

            {/* Card 2: Profil Tamu Spesifik */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-8 border border-neutral-200/80 shadow-sm flex flex-col justify-start space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-heading text-neutral-900">
                Profil Tamu Spesifik
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Lacak preferensi dan riwayat tamu untuk memberikan layanan personal yang
                meningkatkan loyalitas.
              </p>
            </div>
          </div>

          {/* Row 2: Laporan Keuangan (Left - Col 4) + Integrasi Channel Manager (Right - Col 8) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Card 3: Laporan Keuangan */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-8 border border-neutral-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center shadow-sm">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-neutral-900">
                  Laporan Keuangan
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Dapatkan wawasan mendalam dengan laporan otomatis yang komprehensif dan mudah
                  dipahami.
                </p>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:underline"
                >
                  <span>Lihat contoh laporan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 4: Integrasi Channel Manager */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-sm">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-neutral-900">
                  Integrasi Channel Manager
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Hubungkan properti Anda ke berbagai OTA (Online Travel Agents) secara instan.
                  Perbarui tarif dan ketersediaan secara otomatis di semua platform.
                </p>
              </div>
              {/* Clean Empty Photo Container on Right */}
              <div className="w-full md:w-64 h-36 md:h-44 rounded-xl bg-[#F0F4FA] border border-neutral-200/70 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
