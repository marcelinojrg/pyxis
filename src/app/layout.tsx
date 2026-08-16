import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Mixins/Navbar';
import Footer from '@/components/Mixins/Footer';
import ScrollToTop from '@/components/Common/ScrollToTop';
import { Toaster } from 'sonner';

const poppins = Poppins({
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'PT. Pyxis Ultimate Solution — Software Hotel & Restoran Terpercaya',
    template: '%s | PT. Pyxis Ultimate Solution',
  },
  description:
    'Penyedia solusi software enterprise terbaik untuk manajemen hotel (Alcor PMS) dan sistem kasir restoran (Alcor POS) di Indonesia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body text-neutral-800 bg-neutral-50 antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <ScrollToTop />
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
