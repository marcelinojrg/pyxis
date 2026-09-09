import Image from 'next/image';

const MILESTONES = [
  {
    year: '1988',
    title: 'PT. DACCOM ANUGERAHMULYA',
    description:
      'Founded as PT. DACCOM ANUGERAHMULYA, developing ParHIS, a first-generation hotel system built on DOS.',
  },
  {
    year: '2000',
    title: 'PT. MYOHDOTCOM INDONESIA, TBK',
    description:
      'Launched BITS, a second-generation Windows-based hospitality platform later known as MYOH Hotel Software.',
  },
  {
    year: '2004',
    title: 'PT. MYOH TECHNOLOGY TBK',
    description: 'Renamed to reflect its role as an information technology developer.',
  },
  {
    year: '2011–2021',
    title: 'PT. PYXIS ULTIMATE SOLUTION',
    description:
      "PT. Pyxis Ultimate Solution was established to continue MYOH's hospitality technology business and customer services.",
  },
] as const;

export default function HomeAboutSummary() {
  return (
    <section className="border-y border-neutral-200/70 bg-[#F8FAFC] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-5">
            <p
              data-home-reveal="copy"
              className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]"
            >
              About Pyxis
            </p>
            <h2
              data-home-reveal="heading"
              className="max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl"
            >
              Decades of experience. Always moving forward.
            </h2>
            <p
              data-home-reveal="copy"
              className="mt-6 max-w-lg text-base leading-7 text-neutral-600"
            >
              Pyxis is an information technology company delivering cloud-based digital solutions
              and infrastructure for the hospitality industry.
            </p>
          </div>

          <figure data-home-reveal="media" className="flex flex-col lg:col-span-7">
            <div className="relative min-h-64 flex-1 overflow-hidden bg-neutral-200 sm:min-h-72">
              <Image
                src="/assets/img/home-about-hospitality-lobby.jpg"
                alt="Modern hotel lobby representing the hospitality industry served by Pyxis"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs text-neutral-500">
              Technology that helps hospitality operations move forward.
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 border-t border-neutral-300">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-neutral-300">
            {MILESTONES.map((item) => (
              <article
                key={item.year}
                data-home-reveal="card"
                className="border-b border-neutral-300 py-7 lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="text-sm font-semibold tabular-nums text-[#1D4ED8]">{item.year}</p>
                <h3 className="mt-5 max-w-xs text-sm font-semibold leading-5 text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
