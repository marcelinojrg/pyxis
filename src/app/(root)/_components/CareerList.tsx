'use client';

import { useState, type FC } from 'react';
import Link from 'next/link';
import { MapPin, Briefcase, ArrowRight, Search, Inbox } from 'lucide-react';
import { Container } from '@/components/ui/container';

export interface CareerItemData {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  department?: string | null;
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
    <section className="py-16 md:py-24 bg-neutral-50/60" id="openings">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Lowongan Pekerjaan Tersedia
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Temukan posisi yang sesuai dengan keahlian dan passion Anda.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari posisi atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  selectedDept === dept
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {dept === 'ALL' ? 'Semua Departemen' : dept}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-neutral-200/80 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {item.department || item.category?.name || 'Umum'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mb-6">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {item.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                      {item.type}
                    </span>
                  </div>
                </div>
                <div>
                  <Link
                    href={`/careers/${item.slug}`}
                    className="inline-flex items-center justify-between w-full px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-blue-600 text-white font-semibold text-xs transition-colors"
                  >
                    <span>Lihat Detail Posisi</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
