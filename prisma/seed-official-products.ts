import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

type Pair = [string, string];
type ProductSeed = {
  slug: string;
  name: string;
  image: string;
  description: string;
  featureSubtitle: string;
  benefits: Pair[];
  features: Pair[];
  capability: string;
};

const products: ProductSeed[] = [
  {
    slug: 'property-management-system',
    name: 'Property Management System',
    image: '/assets/img/products/front-office.jpg',
    description:
      'Run the core of your property from one connected system for reservations, registration, room status, cashiering, housekeeping, and night audit.',
    featureSubtitle: 'One operational record for every stay.',
    benefits: [
      [
        'Faster front desk service',
        'Move reservations, check-in, cashiering, and check-out through one workflow.',
      ],
      ['Clearer room control', 'Keep front office and housekeeping aligned on live room status.'],
      [
        'Reliable daily close',
        'Review occupancy, charges, and revenue through a consistent night audit.',
      ],
    ],
    features: [
      ['Reservation management', 'Create, amend, and track reservations with live availability.'],
      [
        'Registration and cashier',
        'Handle walk-ins, deposits, folios, billing splits, and check-out.',
      ],
      [
        'Housekeeping control',
        'Coordinate room status and guest supply requests from the property system.',
      ],
      ['Night audit', 'Post daily room charges and review operating performance.'],
    ],
    capability: 'A connected property operation',
  },
  {
    slug: 'point-of-sale',
    name: 'Point Of Sale',
    image: '/assets/img/products/point-of-sale.jpg',
    description:
      'Support restaurants, bars, and hotel outlets with flexible order taking, kitchen routing, payment, audit trail, and room-charge posting.',
    featureSubtitle: 'From order to settlement, keep every outlet in sync.',
    benefits: [
      ['Quicker service', 'Capture orders and send them to the right preparation point.'],
      ['Accurate posting', 'Connect outlet transactions with guest folios and finance.'],
      ['Stronger outlet control', 'Review sales, payments, and shifts from one record.'],
    ],
    features: [
      ['Order and table management', 'Manage menus, modifiers, tables, and open checks.'],
      ['G-PRINT kitchen routing', 'Send order tickets to distributed kitchen printers over IP.'],
      ['Mobile order taking', 'Let service teams capture orders closer to the guest.'],
      ['Payment and room charge', 'Accept payment or post an outlet charge to the guest folio.'],
    ],
    capability: 'A single flow for food and beverage',
  },
  {
    slug: 'booking-engine',
    name: 'Booking Engine',
    image: '/assets/img/home-fitur-reservasi.jpg',
    description:
      'Give guests a direct way to book through your website while keeping reservations connected to the property management system.',
    featureSubtitle: 'Turn direct demand into a connected reservation.',
    benefits: [
      ['Direct booking control', 'Accept reservations through a branded website journey.'],
      [
        'Less duplicate entry',
        'Send booking information into the property workflow automatically.',
      ],
      ['Clearer availability', 'Present current room and rate information to direct bookers.'],
    ],
    features: [
      ['Website booking flow', 'Present rooms, packages, rates, and availability online.'],
      ['PMS connection', 'Move direct reservations into the property management record.'],
      ['Guest details capture', 'Collect the information needed before arrival.'],
      ['Booking confirmation', 'Give guests a clear record of their reservation.'],
    ],
    capability: 'Direct bookings connected to operations',
  },
  {
    slug: 'channel-manager-distribution',
    name: 'Channel Manager & Distribution',
    image: '/assets/img/products/channel-manager.jpg',
    description:
      'Keep room inventory, rates, restrictions, and reservations aligned across online distribution channels and connected properties.',
    featureSubtitle: 'One distribution view across every connected channel.',
    benefits: [
      ['Consistent inventory', 'Reduce mismatched availability across booking channels.'],
      ['Fewer manual updates', 'Manage distribution from a controlled property record.'],
      ['Better channel visibility', 'Understand where bookings originate and how demand moves.'],
    ],
    features: [
      ['Inventory synchronisation', 'Keep available rooms aligned across connected channels.'],
      ['Rate and restriction updates', 'Share rate plans and selling rules from one source.'],
      ['Reservation intake', 'Bring channel bookings into the front office workflow.'],
      ['Multi-property distribution', 'Support connected operations across a hotel group.'],
    ],
    capability: 'Distribution that stays connected',
  },
  {
    slug: 'mice-banquet-management',
    name: 'MICE & Banquet Management',
    image: '/assets/img/products/banquet-event.jpg',
    description:
      'Plan meetings, incentives, conferences, exhibitions, banquets, and catering with connected spaces, packages, schedules, and billing.',
    featureSubtitle: 'Make every event easier to plan, deliver, and settle.',
    benefits: [
      ['Fewer planning gaps', 'Give sales, banquet, kitchen, and finance one event brief.'],
      ['Clearer event delivery', 'Connect spaces, packages, menus, and service requirements.'],
      [
        'Accurate settlement',
        'Carry deposits, taxes, service charges, and final billing into one record.',
      ],
    ],
    features: [
      ['Function space booking', 'Manage rooms, schedules, layouts, and event requirements.'],
      ['Package and menu setup', 'Build packages with services, menus, and agreed rates.'],
      ['Event worksheets', 'Share operational details with the teams delivering the event.'],
      ['Event billing', 'Track deposits, charges, taxes, and final settlement.'],
    ],
    capability: 'A complete event operating brief',
  },
  {
    slug: 'revenue-management-system',
    name: 'Revenue Management System',
    image: '/assets/img/home-hero-hotel-lobby-unsplash.jpg',
    description:
      'Turn occupancy, room production, rates, and channel performance into a clearer basis for pricing and revenue decisions.',
    featureSubtitle: 'Price with a clearer view of demand and performance.',
    benefits: [
      [
        'Better rate decisions',
        'Review demand signals before adjusting room rates and restrictions.',
      ],
      ['Stronger yield control', 'Connect occupancy and production data to commercial action.'],
      ['Shared revenue context', 'Give management and sales the same performance picture.'],
    ],
    features: [
      ['Occupancy analysis', 'Track occupancy by room type, market, and period.'],
      ['Rate performance', 'Compare rate plans, channels, and production results.'],
      ['Revenue reporting', 'Review room revenue and operating trends over time.'],
      ['Decision support', 'Bring practical performance context into pricing reviews.'],
    ],
    capability: 'Revenue decisions grounded in operations',
  },
  {
    slug: 'reputation-management-system',
    name: 'Reputation Management System',
    image: '/assets/img/about-pyxis-journey.jpg',
    description:
      'Organise guest feedback and service signals so hospitality teams can understand sentiment, respond consistently, and improve the stay.',
    featureSubtitle: 'Turn guest feedback into a clearer service response.',
    benefits: [
      ['Earlier issue visibility', 'Bring recurring guest concerns closer to the operating team.'],
      ['More consistent responses', 'Keep feedback follow-up visible and accountable.'],
      ['Stronger service learning', 'Use patterns in feedback to guide practical improvements.'],
    ],
    features: [
      ['Feedback collection', 'Gather guest comments across relevant service touchpoints.'],
      ['Issue categorisation', 'Group feedback by department, topic, and priority.'],
      ['Response tracking', 'Assign follow-up and keep a record of action taken.'],
      ['Trend reporting', 'Review recurring themes across properties and periods.'],
    ],
    capability: 'A working view of guest sentiment',
  },
  {
    slug: 'crm-guest-loyalty-management',
    name: 'CRM & Guest Loyalty Management',
    image: '/assets/img/home-about-hospitality-lobby.jpg',
    description:
      'Build a central guest and membership record that supports recognition, communication, repeat stays, and loyalty across properties.',
    featureSubtitle: 'Make every guest relationship more recognisable and useful.',
    benefits: [
      [
        'Recognised returning guests',
        'Keep profiles and stay history available across the operation.',
      ],
      ['More relevant engagement', 'Use guest preferences and membership context in service.'],
      [
        'Connected loyalty data',
        'Keep a central membership record available to participating properties.',
      ],
    ],
    features: [
      ['Guest profiles', 'Maintain preferences, contact details, and stay history.'],
      ['Membership management', 'Manage centralised membership records and status.'],
      ['Preference tracking', 'Give teams context for more personal service.'],
      ['Multi-property CRM', 'Share relevant guest information across connected properties.'],
    ],
    capability: 'Guest relationships that travel with the stay',
  },
  {
    slug: 'mobile-operation-guest-engagement',
    name: 'Mobile Operation & Guest Engagement',
    image: '/assets/img/home-fitur-integrasi.jpg',
    description:
      'Bring operational tasks and guest services closer to the people using them, from mobile order taking to in-stay requests and information.',
    featureSubtitle: 'Put the next useful action closer to the guest and team.',
    benefits: [
      ['More responsive service', 'Let teams capture and act on requests where they happen.'],
      ['Less distance between teams', 'Keep mobile tasks connected to the property workflow.'],
      ['Better in-stay engagement', 'Make relevant hotel services easier for guests to discover.'],
    ],
    features: [
      ['Mobile order taking', 'Capture food and beverage orders from the table or service area.'],
      ['Team task access', 'Bring operational updates to staff moving around the property.'],
      ['Guest service requests', 'Support requests and follow-up during the stay.'],
      [
        'In-room information',
        'Present relevant services and offers through connected guest touchpoints.',
      ],
    ],
    capability: 'Operations that move with the guest',
  },
  {
    slug: 'financial-accounting-system',
    name: 'Financial & Accounting System',
    image: '/assets/img/products/ipx-series.jpg',
    description:
      'Connect accounts payable, accounts receivable, general ledger, income audit, and management reporting with daily hospitality transactions.',
    featureSubtitle: 'One financial record built from daily operations.',
    benefits: [
      [
        'Less re-entry',
        'Bring front office, outlet, purchasing, and accounting activity together.',
      ],
      ['Clearer controls', 'Trace transactions through connected journals and source records.'],
      ['Faster reporting', 'Review income and financial performance from a consistent ledger.'],
    ],
    features: [
      ['Accounts payable', 'Record liabilities, suppliers, vouchers, and payments.'],
      ['Accounts receivable', 'Track company, agent, employee, and card receivables.'],
      ['General ledger', 'Post transactions and review balances with an audit trail.'],
      ['Income audit', 'Review cash, credit card, guest ledger, and city ledger revenue.'],
    ],
    capability: 'Financial control connected to the property',
  },
  {
    slug: 'procurement-logistic-system',
    name: 'Procurement & Logistic System',
    image: '/assets/img/products/inventory-cost.jpg',
    description:
      'Coordinate suppliers, purchase orders, receiving, storage movement, and department requests across hotel and restaurant operations.',
    featureSubtitle: 'From supplier commitment to property delivery.',
    benefits: [
      [
        'More controlled purchasing',
        'Keep supplier, price, quality, and delivery decisions visible.',
      ],
      ['Cleaner receiving', 'Match delivered goods with the approved purchase order.'],
      ['Better movement tracking', 'Follow goods from receiving to the team that uses them.'],
    ],
    features: [
      ['Supplier management', 'Maintain supplier records, terms, and purchase history.'],
      ['Purchase orders', 'Create, approve, and follow up on purchasing commitments.'],
      ['Receiving control', 'Record delivered quantities and validate incoming goods.'],
      ['Logistic requests', 'Coordinate department requests and internal movement.'],
    ],
    capability: 'A visible path for every purchase',
  },
  {
    slug: 'inventory-cost-accounting-system',
    name: 'Inventory & Cost Accounting System',
    image: '/assets/img/home-hero-hotel-lobby.jpg',
    description:
      'Manage stock movement and cost accounting for rooms, food, beverage, linen, and other operational supplies.',
    featureSubtitle: 'Know what is used, where it goes, and what it costs.',
    benefits: [
      ['Tighter stock control', 'Track inventory movement across stores and departments.'],
      ['More useful cost data', 'Connect usage and cost with operational revenue.'],
      ['Less avoidable variance', 'Spot unusual movement and cost changes earlier.'],
    ],
    features: [
      ['Inventory movement', 'Record receipts, transfers, issues, returns, and adjustments.'],
      ['Store management', 'Keep stock levels and item records organised.'],
      ['Cost accounting', 'Review actual cost against revenue and operating targets.'],
      ['Usage analysis', 'Understand movement by department, item, and period.'],
    ],
    capability: 'Inventory data that supports cost control',
  },
  {
    slug: 'maintenance-engineering-system',
    name: 'Maintenance & Engineering System',
    image: '/assets/img/products/maintenance-engineering.jpg',
    description:
      'Manage work orders, preventive maintenance, assets, rooms, buildings, machines, and equipment across the property.',
    featureSubtitle: 'Keep the property reliable with visible maintenance work.',
    benefits: [
      ['Faster issue response', 'Route work requests to the right engineering team.'],
      ['Better asset history', 'Keep equipment, location, and service records together.'],
      ['Less operational downtime', 'Schedule recurring work before small issues affect guests.'],
    ],
    features: [
      ['Work order management', 'Create, assign, prioritise, and close maintenance work.'],
      ['Asset records', 'Track equipment details, location, and service history.'],
      ['Preventive schedules', 'Plan recurring maintenance for critical systems.'],
      [
        'Parts and status control',
        'Follow materials, progress, and completion across work orders.',
      ],
    ],
    capability: 'Maintenance work with a visible owner',
  },
  {
    slug: 'third-party-interfaces',
    name: '3rd Party Interfaces',
    image: '/assets/img/products/device-integration.jpg',
    description:
      'Connect Pyxis with external systems and services so hotel teams can work across a more complete technology environment.',
    featureSubtitle: 'Make connected systems feel like one operation.',
    benefits: [
      [
        'Fewer disconnected records',
        'Move relevant information between Pyxis and external systems.',
      ],
      ['Lower manual effort', 'Reduce repeated entry across operational workflows.'],
      [
        'More flexible property setups',
        'Adapt the system around each hotel’s technology environment.',
      ],
    ],
    features: [
      ['Interface mapping', 'Define how operational data moves between connected systems.'],
      ['Reservation interfaces', 'Connect booking and distribution workflows.'],
      ['Finance and service links', 'Support connected payments, accounting, and service tools.'],
      [
        'Monitoring and recovery',
        'Keep interface status visible when a connection needs attention.',
      ],
    ],
    capability: 'An integration layer for the operation',
  },
  {
    slug: 'devices-smart-iot-integrations',
    name: 'Devices & Smart IOT Integrations',
    image: '/assets/img/karir-carousel-1.jpg',
    description:
      'Connect hotel operations with smart devices and property hardware including key locks, telephony, messaging, scales, and in-room services.',
    featureSubtitle: 'Bring the physical property into the digital workflow.',
    benefits: [
      ['Fewer manual handoffs', 'Move device events into the guest and room record.'],
      ['More consistent control', 'Keep hardware activity aligned with operating status.'],
      [
        'A more connected stay',
        'Support guest services through relevant in-room and property devices.',
      ],
    ],
    features: [
      ['PABX and call billing', 'Connect telephone usage with guest account posting.'],
      ['Key-lock integration', 'Align room access workflows with guest and room status.'],
      ['Smart device links', 'Support scales, messaging, IVR, and other property hardware.'],
      ['In-room services', 'Connect relevant food, beverage, and guest service touchpoints.'],
    ],
    capability: 'Smart property devices, connected by Pyxis',
  },
];

const legacySlugs = [
  'alcor-channel-manager',
  'alcor-pms',
  'front-office-management',
  'financial-accounting',
  'inventory-cost',
  'banquet-event-management',
  'sales-marketing',
  'maintenance-engineering',
  'device-integration',
  'channel-manager-integration',
  'ipx-series',
];

async function main() {
  console.log('Seeding official Pyxis product catalog...');

  await prisma.product.updateMany({
    where: { slug: { in: legacySlugs } },
    data: { isActive: false },
  });

  for (const [index, product] of products.entries()) {
    const benefits = product.benefits.map(([title, description], itemIndex) => ({
      title,
      description,
      order: itemIndex + 1,
    }));
    const features = product.features.map(([title, description], itemIndex) => ({
      title,
      description,
      order: itemIndex + 1,
    }));
    const capability = {
      title: product.capability,
      description: product.featureSubtitle,
      imageUrl: product.image,
      items: { create: features },
    };

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        image: product.image,
        featureSubtitle: product.featureSubtitle,
        order: index + 1,
        isActive: true,
        benefits: { deleteMany: {}, create: benefits },
        features: { deleteMany: {}, create: features },
        capabilities: { deleteMany: {}, create: capability },
      },
      create: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        image: product.image,
        featureSubtitle: product.featureSubtitle,
        order: index + 1,
        isActive: true,
        benefits: { create: benefits },
        features: { create: features },
        capabilities: { create: capability },
      },
    });
  }

  console.log('Done. Products:', await prisma.product.count());
  console.log('Active official products:', products.length);
}

main()
  .catch((error) => {
    console.error('Product seed failed:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
