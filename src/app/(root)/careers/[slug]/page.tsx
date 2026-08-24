import { notFound } from 'next/navigation';
import { genPageMetadata } from '@/app/seo';
import { prisma } from '@/lib/prisma';
import { Container } from '@/components/ui/container';
import { CareerDetailHeader } from '@/app/(root)/_components/CareerDetailHeader';
import { CareerDetailContent } from '@/app/(root)/_components/CareerDetailContent';
import { CareerApplyForm } from '@/app/(root)/_components/CareerApplyForm';

export const revalidate = 60;

interface CareerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const career = await prisma.career.findUnique({ where: { slug } });
  if (!career) return genPageMetadata({ title: 'Lowongan Tidak Ditemukan' });

  return genPageMetadata({
    title: `${career.title} — Karir PT. Pyxis Ultimate Solution`,
    description: career.description.slice(0, 160),
  });
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;

  const career = await prisma.career.findUnique({
    where: { slug },
  });

  if (!career || !career.isActive) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/50 pb-20">
      <CareerDetailHeader
        title={career.title}
        department={career.department}
        location={career.location}
        type={career.type}
      />

      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CareerDetailContent
              description={career.description}
              responsibilities={career.responsibilities}
              requirements={career.requirements}
            />
          </div>
          <div className="lg:col-span-1">
            <CareerApplyForm careerId={career.id} careerTitle={career.title} />
          </div>
        </div>
      </Container>
    </div>
  );
}
