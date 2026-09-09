'use client';

import { useState, useEffect } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Products', href: '/products' },
  { title: 'Partners', href: '/partners' },
  { title: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hide public navbar on admin pages
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/login');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  const isHome = pathname === '/';
  const isWhite = !isHome || isScrolled;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-3.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-200/80'
          : isWhite
            ? 'bg-white border-b border-transparent'
            : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={isWhite ? '/assets/img/Pyxis_logo.png' : '/assets/img/Pyxis_logo_white.png'}
            alt="Pyxis"
            width={128}
            height={37}
            priority
            className="h-auto w-[128px]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href as Route}
                className={cn(
                  'relative py-1 text-sm font-medium transition-colors duration-200 group inline-block',
                  isWhite
                    ? active
                      ? 'text-[#1D4ED8] font-bold'
                      : 'text-neutral-600 hover:text-neutral-900'
                    : active
                      ? 'text-white font-semibold'
                      : 'text-blue-100 hover:text-white'
                )}
              >
                {link.title}
                {/* Blue or white underline for active links; gray on hover elsewhere. */}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-[2px] w-full rounded-full transition-all duration-300 ease-out origin-left',
                    active
                      ? isWhite
                        ? 'bg-[#1D4ED8] scale-x-100 opacity-100'
                        : 'bg-white scale-x-100 opacity-100'
                      : isWhite
                        ? 'bg-neutral-300 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                        : 'bg-white/40 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              'inline-flex items-center border px-4 py-2 text-sm font-semibold transition-all duration-200 active:translate-y-px',
              isWhite
                ? 'border-neutral-300 text-neutral-900 hover:border-[#F59E0B] hover:bg-[#F59E0B]/10'
                : 'border-white/40 text-white hover:border-[#F59E0B] hover:bg-white/10 hover:text-[#FBBF24]'
            )}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'md:hidden p-2 rounded-lg transition-colors',
            isWhite ? 'text-neutral-800 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
          )}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className={cn(
            'md:hidden fixed inset-x-0 top-full shadow-xl p-6 transition-all border-b',
            isWhite
              ? 'bg-white border-neutral-200 text-neutral-800'
              : 'bg-[#1E40AF] border-blue-700 text-white'
          )}
        >
          <nav className="flex flex-col space-y-3 mb-6">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href as Route}
                  className={cn(
                    'relative px-4 py-2.5 rounded-lg text-base font-medium transition-colors',
                    isWhite
                      ? active
                        ? 'text-[#1D4ED8] bg-blue-50 font-bold'
                        : 'text-neutral-700 hover:bg-neutral-100'
                      : active
                        ? 'text-white bg-blue-700 font-bold'
                        : 'text-blue-100 hover:bg-blue-700/50'
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/contact"
              className="w-full text-center py-3 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-neutral-900 font-bold text-sm shadow-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
