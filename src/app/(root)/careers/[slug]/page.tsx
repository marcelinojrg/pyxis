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
  if (!career) return genPageMetadata({ title: 'Lowongan Tidak Ditemukan' });

  return genPageMetadata({
    title: `${career.title} — Karir PT. Pyxis Ultimate Solution`,
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
    <div className="flex flex-col min-h-screen bg-[#f7f8fa] pb-16">
      <CareerDetailHeader
        title={career.title}
        department={career.department}
        location={career.location}
        type={career.type}
      />

      <Container className="py-8 md:py-10">
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
            <div className="mt-8 rounded-xl bg-[#dce5ff] p-7 text-neutral-800">
              <span className="text-3xl font-bold text-[#07358b]">“</span>
              <p className="mt-2 text-sm italic leading-relaxed">
                Bekerja di Pyxis berarti menjadi bagian dari tim yang peduli pada kualitas dan
                inovasi. Kami membangun solusi yang membantu bisnis hospitality berkembang.
              </p>
              <p className="mt-5 text-xs font-bold">
                Siti Rahmawati
                <br />
                <span className="font-normal">CTO, Pyxis</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
