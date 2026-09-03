import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import { headers } from 'next/headers';

import 'sonner/dist/styles.css';
import './globals.css';
import { cn } from '@/lib/utils';
import { siteMetadata } from '@/data/siteMetadata';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl || 'http://localhost:3000'),
  title: {
    default: siteMetadata.title,
    template: `%s`,
  },
  description: siteMetadata.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'id_ID',
    type: 'website',
  },
  authors: [{ name: siteMetadata.author }],
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteMetadata.title,
  url: siteMetadata.siteUrl || undefined,
  email: siteMetadata.email || undefined,
  telephone: siteMetadata.phone || undefined,
}).replace(/</g, '\\u003c');

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce');

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(inter.variable, roboto.variable, 'font-sans')}
    >
      <head>
        <script
          type="application/ld+json"
          nonce={nonce || undefined}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
      </head>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
