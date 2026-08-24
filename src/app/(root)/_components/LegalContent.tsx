'use client';

import { useState, type FC } from 'react';
import { ShieldCheck, FileText, Cookie } from 'lucide-react';
import { Container } from '@/components/ui/container';

const LEGAL_TABS = [
  { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
  { id: 'terms', label: 'Terms of Service', icon: FileText },
  { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
];

export const LegalContent: FC = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation Bar */}
          <div className="flex border-b border-neutral-200 mb-10 overflow-x-auto">
            {LEGAL_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm border-b-2 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6 text-sm sm:text-base leading-relaxed">
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Kebijakan Privasi (Privacy Policy)
                </h2>
                <p>
                  PT. Pyxis Ultimate Solution menghormati dan berkomitmen untuk melindungi privasi
                  setiap pengunjung dan pengguna produk software kami (Alcor PMS, Alcor POS, dan
                  layanan terkait).
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">
                  1. Pengumpulan Informasi
                </h3>
                <p>
                  Kami mengumpulkan informasi pribadi yang Anda berikan secara langsung saat mengisi
                  formulir kontak, formulir demo produk, atau pendaftaran akun layanan. Informasi
                  ini mencakup nama, alamat email, nomor telepon, dan data nama properti Anda.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">
                  2. Penggunaan Informasi
                </h3>
                <p>
                  Informasi yang kami kumpulkan digunakan untuk memberikan layanan, memproses
                  permintaan demo, meningkatkan pengalaman pengguna, serta mengirimkan pemberitahuan
                  penting terkait pembaruan sistem dan keamanan.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">3. Keamanan Data</h3>
                <p>
                  Kami menerapkan tindakan teknis dan organisasional yang ketat untuk melindungi
                  data pribadi Anda dari akses tidak sah, pengubahan, pengungkapan, atau
                  penghancuran yang tidak sah.
                </p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Syarat & Ketentuan Layanan (Terms of Service)
                </h2>
                <p>
                  Dengan mengakses atau menggunakan situs web dan produk dari PT. Pyxis Ultimate
                  Solution, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut ini.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">
                  1. Lisensi Penggunaan
                </h3>
                <p>
                  Pyxis memberikan Anda lisensi terbatas, non-eksklusif, dan tidak dapat
                  dipindahtangankan untuk mengakses dan menggunakan produk software kami sesuai
                  dengan perjanjian berlangganan yang disepakati.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">
                  2. Hak Kekayaan Intelektual
                </h3>
                <p>
                  Seluruh hak cipta, merek dagang, desain, dan kode sumber dari Alcor PMS, Alcor
                  POS, serta situs web ini adalah hak milik penuh dari PT. Pyxis Ultimate Solution.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">
                  3. Batasan Tanggung Jawab
                </h3>
                <p>
                  Pyxis tidak bertanggung jawab atas kerugian tidak langsung atau konsekuensial yang
                  timbul dari gangguan penggunaan layanan di luar kendali wajar kami.
                </p>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Kebijakan Cookie (Cookie Policy)
                </h2>
                <p>
                  Situs web kami menggunakan cookie dan teknologi pelacakan serupa untuk
                  meningkatkan kenyamanan penelusuran Anda.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">1. Apa itu Cookie?</h3>
                <p>
                  Cookie adalah file teks kecil yang disimpan di perangkat Anda saat Anda
                  mengunjungi situs web kami. Cookie membantu kami mengingat preferensi Anda dan
                  menganalisis lalu lintas situs.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">
                  2. Jenis Cookie yang Kami Gunakan
                </h3>
                <p>
                  Kami menggunakan Cookie Esensial (untuk fungsi keamanan dan navigasi dasar) serta
                  Cookie Analitis (untuk memahami cara pengunjung berinteraksi dengan halaman kami).
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">
                  3. Pengaturan Cookie
                </h3>
                <p>
                  Anda dapat mengatur browser Anda untuk menolak semua atau beberapa cookie, namun
                  hal ini dapat mempengaruhi fungsi beberapa bagian dari situs web kami.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
