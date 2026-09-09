import type { FC } from 'react';

export interface AboutVisionMissionProps {
  vision?: string | null;
  mission?: string | null;
}

const JOURNEY = [
  {
    year: '1988',
    title: 'ParHIS and the first generation',
    description:
      'PT. Daccom Anugerahmulya develops a DOS-based hotel system under the ParHIS brand.',
  },
  {
    year: '2000',
    title: 'BITS moves hotel software to Windows',
    description: 'PT. Myohdotcom Indonesia launches BITS, later known as MYOH Hotel Software.',
  },
  {
    year: '2004',
    title: 'A clearer focus on information technology',
    description:
      'The company becomes PT. MYOH Technology Tbk as its identity shifts toward IT development.',
  },
  {
    year: '2011',
    title: 'Pyxis continues the hospitality business',
    description:
      'PT. Pyxis Ultimate Solution is established to continue the hotel technology business and customer support.',
  },
  {
    year: '2016',
    title: 'The ecosystem grows',
    description:
      'Pyxis expands its technology ecosystem through new hospitality technology partnerships.',
  },
  {
    year: '2017',
    title: 'Alcor brings the next generation',
    description: 'Pyxis introduces Alcor, a new generation of cloud-based hotel systems.',
  },
];

export const AboutVisionMission: FC<AboutVisionMissionProps> = () => {
  return (
    <section className="border-t border-neutral-200/70 bg-[#F8FAFC] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2
              data-home-reveal="heading"
              className="max-w-sm text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl"
            >
              Built for the details that keep hospitality moving.
            </h2>
            <p
              data-home-reveal="copy"
              className="mt-6 max-w-md text-base leading-7 text-neutral-600"
            >
              Our work spans the full hospitality environment: hotels, apartments, condominiums,
              restaurants, bars, and karaoke venues.
            </p>
            <div className="mt-10 border-t border-neutral-300 pt-6">
              <p className="text-sm font-semibold text-neutral-900">What guides our work</p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Practical systems. Long-term support. Technology that fits the way each operation
                actually works.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-neutral-300">
              {JOURNEY.map((item) => (
                <article
                  key={item.year}
                  data-home-reveal="card"
                  className="grid gap-3 border-b border-neutral-300 py-6 sm:grid-cols-[7rem_1fr] sm:gap-8"
                >
                  <p className="text-sm font-semibold tabular-nums text-[#1D4ED8] sm:pr-6 sm:text-right">
                    {item.year}
                  </p>
                  <div className="sm:border-l sm:border-neutral-300 sm:pl-6">
                    <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
