import type { FC } from 'react';
import Image from 'next/image';

export interface AboutProfileProps {
  officeAddress?: string | null;
  imageUrl?: string | null;
}

export const AboutProfile: FC<AboutProfileProps> = ({ imageUrl }) => {
  const profileImageUrl = imageUrl || '/assets/img/home-about-hospitality-lobby.jpg';

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-home-reveal="media" className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
              <Image
                src={profileImageUrl}
                alt="Hotel lobby supported by Pyxis hospitality technology"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              A long-term partner for hospitality teams.
            </p>
          </div>

          <div className="space-y-6 lg:col-span-6">
            <h2
              data-home-reveal="heading"
              className="max-w-xl text-3xl font-bold leading-[1.08] tracking-tight text-neutral-900 sm:text-4xl"
            >
              A hospitality technology company with deep roots.
            </h2>
            <p data-home-reveal="copy" className="max-w-xl text-base leading-7 text-neutral-600">
              Pyxis is an information technology company specialising in software for hotel and
              restaurant management. From our base in Malang, we support hospitality businesses with
              systems that connect daily operations, people, and infrastructure.
            </p>
            <div className="grid max-w-xl grid-cols-2 border-y border-neutral-200 py-5 sm:grid-cols-4 sm:divide-x sm:divide-neutral-200">
              {[
                ['1988', 'Hospitality software roots'],
                ['2011', 'Pyxis established'],
                ['30+', 'Years of industry experience'],
                ['50+', 'Technology partners'],
              ].map(([value, label]) => (
                <div key={value} className="py-2 pr-4 sm:px-4 sm:first:pl-0">
                  <p className="text-2xl font-bold tracking-tight text-[#1D4ED8]">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
