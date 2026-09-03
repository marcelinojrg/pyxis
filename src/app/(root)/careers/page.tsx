import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import PageHero from '@/components/Common/PageHero';
import { CareerCulture } from '@/app/(root)/_components/careers/CareerCulture';
import { CareerList } from '@/app/(root)/_components/careers/CareerList';
import CTASection from '@/components/Common/CTASection';

export const metadata = genPageMetadata({
  title: 'Karir — Bergabung dengan PT. Pyxis Ultimate Solution',
  description:
    'Jelajahi kesempatan karir di PT. Pyxis Ultimate Solution. Temukan posisi impian Anda di bidang software hospitality.',
  path: '/careers',
});

export const revalidate = 60;

export default async function CareersPage() {
  const careers = await prisma.career.findMany({
    where: { isActive: true },
    select: {
      id: true,
      title: true,
      slug: true,
      location: true,
      type: true,
      department: true,
      description: true,
      category: {
        select: { name: true },
      },
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Bergabung dengan Tim Pyxis"
        description="Membangun masa depan teknologi bersama talenta terbaik."
      />
      <CareerCulture />
      <CareerList careers={careers} />
      <CTASection />
    </div>
  );
}
