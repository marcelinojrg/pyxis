import { genPageMetadata } from '@/app/seo';
import { Container } from '@/components/ui/container';
import { LegalContent } from '@/app/(root)/_components/LegalContent';

export const metadata = genPageMetadata({
  title: 'Kebijakan Legal — PT. Pyxis Ultimate Solution',
  description:
    'Informasi kebijakan privasi, syarat dan ketentuan penggunaan layanan, serta kebijakan cookie PT. Pyxis Ultimate Solution.',
});

export const revalidate = 60;

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-r from-[#001A53] to-[#004AEB] text-white">
        <Container className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white mb-4">
            Informasi Legal & Kebijakan
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Komitmen transparansi dan perlindungan hukum bagi pengguna produk dan pengunjung situs
            PT. Pyxis Ultimate Solution.
          </p>
        </Container>
      </section>

      <LegalContent />
    </div>
  );
}
