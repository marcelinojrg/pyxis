import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/ui/container';
import { ContactInfo } from '@/app/(root)/_components/contact/ContactInfo';
import { ContactForm } from '@/app/(root)/_components/contact/ContactForm';

export const metadata = genPageMetadata({
  title: 'Kontak — Hubungi Kami',
  description:
    'Hubungi tim PT. Pyxis Ultimate Solution untuk konsultasi, demo produk Alcor PMS/POS, atau kemitraan.',
  path: '/contact',
});

export const revalidate = 60;

export default async function ContactPage() {
  const branches = await prisma.branch.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      phone: true,
      email: true,
      isPrimary: true,
    },
    orderBy: {
      isPrimary: 'desc',
    },
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          <div className="lg:col-span-5">
            <ContactInfo branches={branches} />
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
