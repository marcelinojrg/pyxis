import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { CareerCulture } from '@/app/(root)/_components/careers/CareerCulture';
import { CareerList } from '@/app/(root)/_components/careers/CareerList';
import CTASection from '@/components/Common/CTASection';
import EditorialHero from '@/components/Common/EditorialHero';

export const metadata = genPageMetadata({
  title: 'Careers | PT. Pyxis Ultimate Solution',
  description: 'Join the team building connected systems for modern hospitality operations.',
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
      category: { select: { name: true } },
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <EditorialHero
        eyebrow="Careers"
        title="Build the systems hospitality depends on."
        description="Join a team that turns complex hotel and restaurant operations into clearer, more dependable work."
        ctaText="See open roles"
        ctaHref="#openings"
        tone="light"
      >
        <div className="border border-neutral-300 bg-white text-neutral-900">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:px-6">
            <span>Life at Pyxis</span>
            <span className="text-[#1D4ED8]">Malang, Indonesia</span>
          </div>
          <div className="px-5 py-6 sm:px-6">
            <p className="max-w-sm text-2xl font-semibold leading-tight tracking-tight text-neutral-950">
              Good work starts with a team that stays close to the problem.
            </p>
            <div className="mt-8 grid grid-cols-2 border-t border-neutral-200 pt-5 text-sm">
              <div>
                <p className="font-semibold text-[#1D4ED8]">01</p>
                <p className="mt-1 text-neutral-600">Own the detail</p>
              </div>
              <div>
                <p className="font-semibold text-[#1D4ED8]">02</p>
                <p className="mt-1 text-neutral-600">Grow together</p>
              </div>
            </div>
          </div>
        </div>
      </EditorialHero>
      <CareerCulture />
      <CareerList careers={careers} />
      <CTASection />
    </div>
  );
}
