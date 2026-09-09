import { notFound } from 'next/navigation';
import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/ui/container';
import { CareerDetailHeader } from '@/app/(root)/_components/careers/CareerDetailHeader';
import { CareerDetailContent } from '@/app/(root)/_components/careers/CareerDetailContent';
import { CareerApplyForm } from '@/app/(root)/_components/careers/CareerApplyForm';

export const revalidate = 60;

interface CareerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const career = await prisma.career.findFirst({ where: { slug, isActive: true } });
  if (!career) return genPageMetadata({ title: 'Opening not found' });

  return genPageMetadata({
    title: `${career.title} — Careers at PT. Pyxis Ultimate Solution`,
    description: career.description.slice(0, 160),
    path: `/careers/${career.slug}`,
  });
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;

  const career = await prisma.career.findFirst({
    where: { slug, isActive: true },
  });

  if (!career) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white pb-20">
      <CareerDetailHeader
        title={career.title}
        department={career.department}
        location={career.location}
        type={career.type}
      />

      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-20">
          <CareerDetailContent
            description={career.description}
            responsibilities={career.responsibilities}
            requirements={career.requirements}
          />
          <div>
            <CareerApplyForm careerId={career.id} careerTitle={career.title} />
            <blockquote className="mt-16 border-t border-neutral-300 pt-6 text-neutral-800">
              <p className="text-lg leading-8 tracking-tight text-neutral-900">
                Working at Pyxis means being part of a team that cares about quality and craft. We
                build solutions that help hospitality businesses grow.
              </p>
              <footer className="mt-6 text-sm font-semibold">
                Siti Rahmawati
                <br />
                <span className="font-normal text-neutral-500">CTO, Pyxis</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </div>
  );
}
