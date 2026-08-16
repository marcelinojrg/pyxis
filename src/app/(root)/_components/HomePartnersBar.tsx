import { Container } from '@/components/ui/container';

const PARTNERS = [
  { name: 'ASTON', style: 'font-serif tracking-widest font-bold text-lg sm:text-xl text-neutral-500' },
  { name: 'HARRIS', style: 'font-sans tracking-wider font-extrabold text-lg sm:text-xl text-neutral-500' },
  { name: 'Santika', style: 'font-serif italic font-semibold text-lg sm:text-xl text-neutral-500' },
  { name: 'SWISS-BELHOTEL', style: 'font-sans tracking-wide font-bold text-base sm:text-lg text-neutral-500 uppercase' },
  { name: 'MERCURE', style: 'font-sans tracking-widest font-extrabold text-base sm:text-lg text-neutral-500' },
];

export default function HomePartnersBar() {
  return (
    <section className="py-12 bg-white border-b border-neutral-100">
      <Container>
        <div className="text-center space-y-6">
          <p className="text-[11px] sm:text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            DIPERCAYA OLEH LEBIH DARI 50+ PROPERTI DI SELURUH INDONESIA
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75">
            {PARTNERS.map((partner) => (
              <span
                key={partner.name}
                className={`${partner.style} select-none transition-opacity duration-200 hover:opacity-100 hover:text-neutral-700`}
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
