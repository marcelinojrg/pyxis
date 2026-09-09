import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/ui/container';
import { ContactInfo } from '@/app/(root)/_components/contact/ContactInfo';
import { ContactForm } from '@/app/(root)/_components/contact/ContactForm';

export const metadata = genPageMetadata({
  title: 'Contact | PT. Pyxis Ultimate Solution',
  description:
    'Talk with the Pyxis team about hospitality systems, implementation, and partnerships.',
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
    orderBy: { isPrimary: 'desc' },
  });

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20">
      <section className="border-b border-neutral-200 pb-12 pt-8 sm:pb-20 sm:pt-12">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="order-1 lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <ContactForm />
            </div>

            <div className="order-2 lg:col-span-4 lg:col-start-1 lg:row-start-1">
              <div className="border-t border-neutral-300 pt-7">
                <h1 className="max-w-xl text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-neutral-950 sm:text-5xl">
                  Let&apos;s talk about your operation.
                </h1>
                <p className="mt-6 max-w-md text-base leading-7 text-neutral-600">
                  Tell us what your property needs to connect, simplify, or improve. We will help
                  you find the right starting point.
                </p>
              </div>
              <div className="mt-12">
                <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                  Prefer a direct conversation?
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-600">
                  Reach the office closest to you using the contact details below.
                </p>
                <div className="mt-8">
                  <ContactInfo
                    branches={branches}
                    className="md:grid-cols-1 md:gap-y-8 md:divide-x-0 md:[&>article]:px-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
