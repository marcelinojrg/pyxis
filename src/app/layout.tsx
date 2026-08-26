import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { headers } from 'next/headers';

import './globals.css';
import { cn } from '@/lib/utils';
import { siteMetadata } from '@/data/siteMetadata';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';
// import { ImageKitProvider } from '@imagekit/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      data-scroll-behavior="smooth"
      className={cn('font-sans', inter.variable)}
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
        {/* <ImageKitProvider urlEndpoint={process.env.IMAGEKIT_URL}>
        </ImageKitProvider> */}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
