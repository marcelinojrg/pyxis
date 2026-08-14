# SEO-SPEC.md
# SEO and Discoverability Specification

## 1. Goals

- accurate page titles;
- meaningful descriptions;
- crawlable pages;
- canonical URLs;
- sitemap;
- robots;
- structured data;
- social sharing metadata.

## 2. Page Metadata

Required:
- title;
- description;
- canonical;
- Open Graph title;
- Open Graph description;
- Open Graph image.

Primary pages:
- Home;
- About;
- Products;
- Product Detail;
- Partners;
- Contact;
- Legal;
- Careers.

## 3. Dynamic Product SEO

Product detail should derive:
- title from product name;
- description from shortDesc unless explicit SEO description exists;
- OG image from product image where suitable.

Do not create misleading keyword stuffing.

## 4. Structured Data

Minimum:
- Organization on global layer;
- WebSite on Home;
- Product/SoftwareApplication style data only where factual data supports it.

## 5. Technical

Provide:
- sitemap.xml;
- robots.txt;
- semantic headings;
- image alt;
- clean slug;
- no accidental noindex on public pages.

## 6. Admin SEO

Site settings:
- default meta title;
- default meta description;
- default OG image.

PageSeo:
- page-specific overrides.

## 7. QA

Check:
- duplicate titles;
- missing descriptions;
- broken canonical;
- missing OG image;
- bad heading order;
- unpublished pages indexed accidentally;
- product detail 404 behavior.
