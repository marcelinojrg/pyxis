import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const ARTICLES = [
  {
    slug: 'the-operating-system-behind-a-better-guest-stay',
    title: 'The Operating System Behind a Better Guest Stay',
    category: 'Operations',
    cover: '/assets/img/blog/blog-operating-system.jpg',
    publishedAt: '2026-09-08',
    content: `
<p>A great guest stay is shaped by hundreds of small decisions made across a property. The reservation, room status, restaurant charge, and service request all need to move through the operation without creating extra work for the people responsible for the guest.</p>
<h2>One operation, many moments</h2>
<p>Guests experience one stay. Teams often work across several systems, departments, and handovers. A connected operating layer gives each team the context it needs while keeping the wider property aligned.</p>
<h2>Clarity at the point of work</h2>
<p>The value of hospitality technology is clearest when staff can act without searching through duplicate records or waiting for a manual update. Clear status, shared information, and dependable workflows give teams more time to focus on service.</p>
<h2>Designing for the whole property</h2>
<p>The strongest foundation supports front office, food and beverage, finance, housekeeping, and management together. It makes the next decision easier because the right information is available when it is needed.</p>
`.trim(),
  },
  {
    slug: 'designing-a-more-connected-guest-journey',
    title: 'From Check-in to Checkout: Designing a More Connected Guest Journey',
    category: 'Guest Experience',
    cover: '/assets/img/blog/blog-guest-experience.jpg',
    publishedAt: '2026-09-01',
    content: `
<p>The guest journey is not a single transaction. It is a sequence of expectations, decisions, and service moments that begin before arrival and continue after checkout.</p>
<h2>Start with the handovers</h2>
<p>Most friction appears between teams. A reservation changes, a room becomes ready, a guest adds an outlet charge, or a request needs follow-up. Connecting those handovers helps the property respond with less repetition and more confidence.</p>
<h2>Make context available</h2>
<p>Staff should not have to ask guests to repeat information the property already has. A shared view of the stay helps every team member understand what has happened and what needs to happen next.</p>
<h2>Keep the human part visible</h2>
<p>Technology should remove unnecessary steps from service, not make the experience feel automated. The best systems give hospitality teams more room to notice details, solve problems, and make a stay feel personal.</p>
`.trim(),
  },
  {
    slug: 'one-view-of-property-performance',
    title: 'Why Hospitality Teams Need One View of Performance',
    category: 'Technology',
    cover: '/assets/img/blog/blog-connected-operation.jpg',
    publishedAt: '2026-08-24',
    content: `
<p>Property performance is shaped by more than one number. Occupancy, revenue, outlet sales, guest feedback, and operational workload all describe different parts of the same business.</p>
<h2>Separate reports slow decisions</h2>
<p>When every department works from a different version of the operation, leaders spend time reconciling information before they can act. That delay makes small issues harder to resolve and larger opportunities easier to miss.</p>
<h2>Shared data improves the conversation</h2>
<p>A connected view gives teams a common starting point. It helps managers compare what is happening across the property, understand the reason behind a result, and decide where attention will have the greatest effect.</p>
<h2>Better decisions begin with better context</h2>
<p>Reporting is most useful when it leads to action. The goal is not to collect more dashboards. It is to make the operational picture clear enough for teams to move with purpose.</p>
`.trim(),
  },
  {
    slug: 'the-quiet-advantage-of-connected-hotel-systems',
    title: 'The Quiet Advantage of Well-Connected Hotel Systems',
    category: 'Integration',
    cover: '/assets/img/blog/blog-team-technology.jpg',
    publishedAt: '2026-08-17',
    content: `
<p>Guests may never see the systems behind a property, but they notice when those systems do not work together. A delayed update, a missing charge, or a room status that is out of date quickly becomes a service problem.</p>
<h2>Integration is an operating decision</h2>
<p>Connecting systems is not only an IT project. It shapes how departments coordinate, how quickly information moves, and how consistently a property can deliver its standards.</p>
<h2>Reduce the work between systems</h2>
<p>Every manual transfer creates another place for delay or error. Reliable connections allow teams to spend less time copying information and more time acting on it.</p>
<h2>Build for change</h2>
<p>Properties add channels, devices, services, and partners over time. A practical integration strategy gives the operation room to grow without forcing every new capability into a disconnected workflow.</p>
`.trim(),
  },
  {
    slug: 'technology-that-gives-hospitality-teams-time-back',
    title: 'Technology That Gives Hospitality Teams Time Back',
    category: 'People & Operations',
    cover: '/assets/img/blog/blog-service-detail.jpg',
    publishedAt: '2026-08-10',
    content: `
<p>Hospitality teams are measured by the quality of the experience they create, yet too much of their day can be spent working around the tools meant to support them.</p>
<h2>Remove repeat work first</h2>
<p>The most useful improvements often begin with routine tasks: entering the same information twice, checking several places for one answer, or waiting for a report that could be available sooner.</p>
<h2>Give teams confidence to act</h2>
<p>Clear workflows help staff make decisions at the right moment. When the system reflects the way the property actually works, training becomes easier and day-to-day work becomes more predictable.</p>
<h2>Measure time as part of the outcome</h2>
<p>A successful system does more than add features. It gives time back to the people who welcome guests, coordinate service, manage resources, and keep the property moving.</p>
`.trim(),
  },
] as const;

async function getOrCreateCategory(name: string) {
  const existing = await prisma.articleCategory.findFirst({ where: { name } });
  return existing || prisma.articleCategory.create({ data: { name } });
}

async function main() {
  const admin = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL || 'admin@pyxis.co.id' },
  });

  for (const article of ARTICLES) {
    const category = await getOrCreateCategory(article.category);
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        content: article.content,
        cover: article.cover,
        isPublished: true,
        publishedAt: new Date(article.publishedAt),
        articleCategories: { set: [{ id: category.id }] },
      },
      create: {
        slug: article.slug,
        title: article.title,
        content: article.content,
        cover: article.cover,
        isPublished: true,
        publishedAt: new Date(article.publishedAt),
        createdBy: admin ? { connect: { id: admin.id } } : undefined,
        articleCategories: { connect: [{ id: category.id }] },
      },
    });
  }

  console.log(`Seeded ${ARTICLES.length} published blog articles.`);
}

main()
  .catch((error) => {
    console.error('Blog seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
