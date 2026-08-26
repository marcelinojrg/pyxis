import type { Metadata } from 'next';

import { siteMetadata } from '@/data/siteMetadata';
import type { PageSEOProps } from '@/interfaces/seo';

export function genPageMetadata({
  title,
  description,
  image,
  path = '/',
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    description: description || siteMetadata.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: path,
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'id_ID',
      type: 'website',
    },
    authors: [{ name: siteMetadata.author }],
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  };
}
