'use client';

import { useState, type FC } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Inbox, Mail } from 'lucide-react';
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
      new Set(careers.map((c) => c.department || c.category?.name).filter(Boolean))
    ) as string[]),
  ];

  const filtered = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const dept = c.department || c.category?.name || '';
    const matchesDept = selectedDept === 'ALL' || dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <section className="bg-[#f7f8fa] py-12 md:py-16" id="openings">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#07358b] mb-3">Lowongan Saat Ini</h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Temukan posisi yang sesuai dengan keahlian dan passion Anda.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <div className="flex w-full items-center gap-3 rounded-md border border-neutral-300 bg-white px-4 focus-within:ring-2 focus-within:ring-[#07358b]">
            <Search className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari posisi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm leading-5 outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  selectedDept === dept
                    ? 'bg-[#07358b] text-white'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {dept === 'ALL' ? 'Semua' : dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 md:p-16 rounded-2xl border border-dashed border-neutral-300 bg-white text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-1">Belum Ada Lowongan Aktif</h3>
            <p className="text-sm text-neutral-500 max-w-sm">
              Saat ini belum ada posisi yang sesuai dengan kriteria pencarian Anda. Silakan hubungi
              kami untuk open application.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 border-b border-neutral-100 p-6 last:border-b-0 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-[#e8eff9] px-3 py-1 text-xs font-medium text-[#2b65ad]">
                    {item.department || item.category?.name || 'Umum'}
                  </span>
                </div>
                <Link
                  href={`/careers/${item.slug}`}
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#07358b] hover:underline"
                >
                  Lihat Detail <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 rounded-lg border border-[#dbe3ff] bg-[#e9eeff] px-6 py-7 text-center">
          <Mail className="mx-auto h-6 w-6 text-[#07358b]" />
          <p className="mt-3 text-sm text-neutral-600">
            Tidak menemukan posisi yang cocok? Kirim CV dan portofolio kamu ke{' '}
            <a href="mailto:careers@thepyxis.net" className="font-semibold text-[#07358b]">
              careers@thepyxis.net
            </a>
          </p>
          <a
            href="mailto:careers@thepyxis.net"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#f9a51a] px-5 py-2.5 text-xs font-semibold text-neutral-900"
          >
            <Mail className="h-4 w-4" /> Kirim CV via Email
          </a>
        </div>
      </Container>
    </section>
  );
};
