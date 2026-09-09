import { Clock3, Code2, Globe2, Handshake, Smile, Users } from 'lucide-react';

const GLANCE_INFORMATION = [
  { label: 'Customers', value: '900+', icon: Smile },
  { label: 'Users', value: '36,000+', icon: Users },
  { label: 'Partners', value: '50+', icon: Handshake },
  { label: 'Pyxis-X Partners', value: '10+', icon: Code2 },
  { label: 'Countries Served', value: '10+', icon: Globe2 },
  { label: 'Years in Industry', value: '33+', icon: Clock3 },
];

export default function HomeVisionMission() {
  return (
    <section className="border-t border-neutral-200/70 bg-[#F8FAFC] py-20 sm:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2
            data-home-reveal="heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading tracking-tight text-neutral-900"
          >
            Glance information
          </h2>
          <p data-home-reveal="copy" className="text-base text-neutral-600 leading-relaxed">
            Pyxis supports hospitality operations through technology and a growing ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-neutral-200/80">
          {GLANCE_INFORMATION.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                data-home-reveal="card"
                className="flex min-h-36 flex-col items-center justify-center gap-3 px-3 py-5 text-center"
              >
                <Icon className="h-5 w-5 text-[#1D4ED8]" aria-hidden="true" />
                <strong className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-neutral-900">
                  {item.value}
                </strong>
                <span className="text-xs sm:text-sm font-medium text-neutral-500">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
