'use client';

import { useState, useEffect } from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Product', href: '/products' },
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
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
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-neutral-200/80'
          : isWhite
            ? 'bg-white py-4'
            : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className={cn(
              'font-heading font-bold text-2xl tracking-tight transition-colors duration-300',
              isWhite ? 'text-[#1D4ED8]' : 'text-white'
            )}
          >
            Pyxis
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href as Route}
              className={cn(
                'text-sm font-medium transition-colors duration-200',
                isWhite
                  ? isActive(link.href)
                    ? 'text-[#1D4ED8] font-bold underline underline-offset-8 decoration-2 decoration-[#1D4ED8]'
                    : 'text-neutral-600 hover:text-[#1D4ED8]'
                  : isActive(link.href)
                    ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-white'
                    : 'text-blue-100 hover:text-white'
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-5 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-neutral-900 font-semibold text-sm transition-all duration-200 shadow-sm active:scale-95"
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
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href as Route}
                className={cn(
                  'px-4 py-2.5 rounded-lg text-base font-medium transition-colors',
                  isWhite
                    ? isActive(link.href)
                      ? 'text-[#1D4ED8] bg-blue-50 font-bold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                    : isActive(link.href)
                      ? 'text-white bg-blue-700 font-bold'
                      : 'text-blue-100 hover:bg-blue-700/50'
                )}
              >
                {link.title}
              </Link>
            ))}
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
