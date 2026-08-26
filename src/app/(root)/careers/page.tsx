import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { CareerHero } from '@/app/(root)/_components/careers/CareerHero';
import { CareerCulture } from '@/app/(root)/_components/careers/CareerCulture';
import { CareerList } from '@/app/(root)/_components/careers/CareerList';
import HomeCTA from '@/app/(root)/_components/home/HomeCTA';

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
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <CareerHero />
      <CareerCulture />
      <CareerList careers={careers} />
      <HomeCTA />
    </div>
  );
}
