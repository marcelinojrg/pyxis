import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { LegalContent } from '@/app/(root)/_components/legal/LegalContent';
import EditorialHero from '@/components/Common/EditorialHero';

export const metadata = genPageMetadata({
  title: 'Legal | PT. Pyxis Ultimate Solution',
  description:
    'Review the policies that guide how Pyxis handles privacy, service terms, and cookies.',
  path: '/legal',
});

export const revalidate = 60;

export default async function LegalPage() {
  const documents = await prisma.legalDocument.findMany({
    where: {
      isPublished: true,
      slug: { in: ['privacy-policy', 'terms-of-service'] },
    },
    select: { slug: true, title: true, content: true },
    orderBy: { title: 'asc' },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <EditorialHero
        eyebrow="Legal"
        title="Clear terms for a trusted relationship."
        description="Review the policies that guide how Pyxis handles privacy, service terms, and cookies across our website and products."
        ctaText="Talk to our team"
        ctaHref="/contact"
        tone="light"
      >
        <div className="border border-neutral-300 bg-white text-neutral-900">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:px-6">
            <span>Policy index</span>
            <span className="text-[#1D4ED8]">Policy centre</span>
          </div>
          <div className="divide-y divide-neutral-200">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
              <div key={item} className="flex items-center justify-between px-5 py-5 sm:px-6">
                <span className="text-sm font-semibold text-neutral-900">{item}</span>
                <span className="text-xs font-semibold text-[#1D4ED8]">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </EditorialHero>
      <LegalContent documents={documents} />
    </div>
  );
}
