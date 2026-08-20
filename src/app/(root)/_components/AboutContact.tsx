import type { FC } from 'react';
import { Building2, Phone, Mail } from 'lucide-react';

export interface AboutContactProps {
  companyName?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  officeAddress?: string | null;
}

export const AboutContact: FC<AboutContactProps> = ({ companyName, address, phone, email }) => {
  return (
    <section className="py-20 md:py-24 bg-white border-t border-neutral-200/70">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-neutral-900">
            Lokasi Kami
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Kunjungi kantor kami atau hubungi kami untuk informasi lebih lanjut.
          </p>
        </div>

        {/* Two Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* PT. Pyxis Ultimate Solution Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-sm shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold font-heading text-neutral-900">
                  {companyName || 'PT. Pyxis Ultimate Solution'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {address || 'Jl. Tambora No. 15\nMalang 65115, Jawa Timur\nINDONESIA'}
                </p>
              </div>
            </div>

            <div className="space-y-2 pl-[3.75rem]">
              {phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <a
                    href={`tel:${phone}`}
                    className="text-xs sm:text-sm text-neutral-700 hover:text-[#1D4ED8] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="text-xs sm:text-sm text-neutral-700 hover:text-[#1D4ED8] transition-colors"
                  >
                    {email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* CV. Aryacom Teknologi (Distributor) Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center shadow-sm shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold font-heading text-neutral-900">
                  CV. Aryacom Teknologi{' '}
                  <span className="text-xs font-normal text-neutral-500">(Distributor)</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Grand Sudirman Agung B-26
                  <br />
                  Jl. PB Sudirman
                  <br />
                  Denpasar, Bali, INDONESIA
                </p>
              </div>
            </div>

            <div className="space-y-2 pl-[3.75rem]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a
                  href="tel:+62361224681"
                  className="text-xs sm:text-sm text-neutral-700 hover:text-[#1D4ED8] transition-colors"
                >
                  +62 361 224681
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a
                  href="mailto:aryateknologi@gmail.com"
                  className="text-xs sm:text-sm text-neutral-700 hover:text-[#1D4ED8] transition-colors"
                >
                  aryateknologi@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
