import type { FC } from 'react';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { companyLinks, legalLinks, productLinks } from './constant/footerLinks';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#071327] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_repeat(3,minmax(0,1fr))] lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex" aria-label="Pyxis home">
              <Image
                src="/assets/img/Pyxis_logo_white.png"
                alt="Pyxis"
                width={148}
                height={42}
                className="h-auto w-[148px]"
              />
            </Link>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              Connected technology for clearer hospitality operations.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex border-b border-[#F59E0B] pb-1 text-sm font-semibold text-white transition-colors hover:text-[#FBBF24]"
            >
              Start a conversation
            </Link>
          </div>
          <FooterLinkGroup title="Products" links={productLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} PT. Pyxis Ultimate Solution. All rights reserved.</p>
          <p>Built for hospitality teams.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLinkGroup: FC<{
  title: string;
  links: Array<{ name: string; href: string }>;
}> = ({ title, links }) => (
  <div>
    <h2 className="text-sm font-semibold text-white">{title}</h2>
    <ul className="mt-5 space-y-3 text-sm">
      {links.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href as Route}
            className="text-slate-400 transition-colors hover:text-white"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
