import { BarChart3, Calendar, RefreshCw, Users } from 'lucide-react';

const FEATURES = [
  {
    number: '01',
    title: 'Future Proof',
    description: 'Built to evolve with technology and the changing needs of hotel operations.',
    icon: Calendar,
  },
  {
    number: '02',
    title: 'All-in-one',
    description: 'One ecosystem for your core hospitality operations.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Simple and Powerful',
    description: 'Easy to use, with the capabilities to support business growth.',
    icon: BarChart3,
  },
  {
    number: '04',
    title: 'Seamless Integration',
    description: 'Connected modules that keep operations moving smoothly.',
    icon: RefreshCw,
  },
] as const;

export default function HomeFeatures() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-12 md:gap-16 md:px-8">
        <div className="md:col-span-4 md:pt-2">
          <p
            data-home-reveal="copy"
            className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1D4ED8]"
          >
            Why Pyxis
          </p>
          <h2
            data-home-reveal="heading"
            className="max-w-sm text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl"
          >
            Technology that works for your operation.
          </h2>
          <p data-home-reveal="copy" className="mt-6 max-w-md text-base leading-7 text-neutral-600">
            Complete, modular, and integrated hospitality solutions that help teams work faster and
            make better decisions.
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="grid border-t border-neutral-200 sm:grid-cols-2 sm:divide-x sm:divide-neutral-200">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  data-home-reveal="card"
                  className={`group py-7 sm:px-8 ${index > 0 ? 'border-t border-neutral-200' : ''} ${index === 1 ? 'sm:border-t-0' : ''}`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-semibold tabular-nums text-[#1D4ED8]">
                      {feature.number}
                    </span>
                    <Icon className="h-5 w-5 text-neutral-400 transition-colors duration-300 group-hover:text-[#1D4ED8]" />
                  </div>
                  <h3 className="mt-8 text-lg font-semibold tracking-tight text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
