'use client';

import { useState, type FC, type FormEvent } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import { Globe, Mail, Share2 } from 'lucide-react';
import { toast } from 'sonner';

import { companyLinks, legalLinks, productLinks } from './constant/footerLinks';
import { subscribeNewsletter } from '@/app/actions/newsletter';

const Footer: FC = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Silakan masukkan alamat email yang valid.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        toast.success(res.message);
        setEmail('');
      } else {
        toast.error(res.message || 'Gagal mendaftar newsletter.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Terjadi kesalahan saat mendaftar newsletter.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#0B132B] text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Left Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-heading font-bold text-2xl text-white tracking-tight">Pyxis</span>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Sistem manajemen properti terdepan untuk industri perhotelan modern.
            </p>
            {/* Social / Contact Icons */}
            <div className="flex items-center gap-3 pt-2 text-neutral-400">
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-neutral-500 pt-3">
              © 2024 Pyxis Hospitality Systems. All rights reserved.
            </p>
          </div>

          {/* Produk */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm">Produk</h4>
            <ul className="space-y-2 text-xs">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href as Route}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm">Perusahaan</h4>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href as Route}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm">Legal</h4>
            <ul className="space-y-2 text-xs">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href as Route}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
