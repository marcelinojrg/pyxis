'use client';

import { useState, type FC } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Inbox, Mail, Search } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface CareerItemData {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  department?: string | null;
  description: string;
  category?: { name: string } | null;
}

export interface CareerListProps {
  careers: CareerItemData[];
}

export const CareerList: FC<CareerListProps> = ({ careers }) => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const departments = [
    'ALL',
    ...(Array.from(
      new Set(careers.map((career) => career.department || career.category?.name).filter(Boolean))
    ) as string[]),
  ];
  const filtered = careers.filter((career) => {
    const query = search.toLowerCase();
    const department = career.department || career.category?.name || '';
    return (
      `${career.title} ${career.location}`.toLowerCase().includes(query) &&
      (selectedDept === 'ALL' || department === selectedDept)
    );
  });

  return (
    <section className="border-b border-neutral-200 bg-[#F8FAFC] py-16 sm:py-24" id="openings">
      <Container>
        <div className="grid items-end gap-8 border-t border-neutral-300 pt-7 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8]">
              Open roles
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-neutral-950 sm:text-4xl">
              Find your next useful challenge.
            </h2>
          </div>
          <p className="text-sm leading-6 text-neutral-600 lg:col-span-5 lg:text-right">
            Search by role or location, then take a closer look at the work.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-y border-neutral-300 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full items-center gap-3 border-b border-neutral-300 pb-3 lg:max-w-sm">
            <Search className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
            <input
              type="search"
              aria-label="Search open roles"
              placeholder="Search roles or locations"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </div>
          <div className="flex gap-5 overflow-x-auto pb-1">
            {departments.map((department) => (
              <button
                key={department}
                type="button"
                onClick={() => setSelectedDept(department)}
                className={`shrink-0 border-b pb-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  selectedDept === department
                    ? 'border-[#1D4ED8] text-[#1D4ED8]'
                    : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-900'
                }`}
              >
                {department === 'ALL' ? 'All teams' : department}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mx-auto mt-12 max-w-xl border-y border-dashed border-neutral-300 py-12 text-center sm:mt-16 sm:py-16">
            <Inbox className="mx-auto h-6 w-6 text-neutral-400" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-neutral-900">
              No open roles found.
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-600">
              We are always interested in thoughtful people. Send an introduction and your portfolio
              to our team.
            </p>
          </div>
        ) : (
          <div className="mt-12 border-y border-neutral-300">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="grid gap-6 border-b border-neutral-200 py-7 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    <span className="text-[#1D4ED8]">
                      {item.department || item.category?.name || 'General'}
                    </span>
                    <span>{item.location}</span>
                    <span>{item.type}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-neutral-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl line-clamp-2 text-sm leading-6 text-neutral-600">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={`/careers/${item.slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition-colors hover:text-[#1D4ED8]"
                >
                  View role
                  <ArrowUpRight className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:rotate-0" />
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 border-t border-neutral-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-neutral-600">
            No role that fits? Share your background with careers@thepyxis.net.
          </p>
          <a
            href="mailto:careers@thepyxis.net"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> Send your CV
          </a>
        </div>
      </Container>
    </section>
  );
};
