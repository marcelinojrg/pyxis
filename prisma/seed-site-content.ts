import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

type PartnerSeed = { name: string; image: string; order: number };
type LegalDocumentSeed = { slug: string; title: string; content: string };

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function readJson<T>(fileName: string): Promise<T> {
  const file = await readFile(resolve(process.cwd(), 'prisma', 'data', fileName), 'utf8');
  return JSON.parse(file) as T;
}

async function main() {
  const partners = await readJson<PartnerSeed[]>('partners.json');
  const legalDocuments = await readJson<LegalDocumentSeed[]>('legal-documents.json');

  for (const partner of partners) {
    await prisma.partner.upsert({
      where: { name: partner.name },
      update: { image: partner.image, order: partner.order, isActive: true },
      create: partner,
    });
  }

  for (const document of legalDocuments) {
    await prisma.legalDocument.upsert({
      where: { slug: document.slug },
      update: { title: document.title, content: document.content, isPublished: true },
      create: { ...document, isPublished: true },
    });
  }

  console.log(`Seeded ${partners.length} partners and ${legalDocuments.length} legal documents.`);
}

main()
  .catch((error) => {
    console.error('Site content seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
