# CONTENT-DATA-MAPPING.md
# Content to Database and Admin Mapping

## 1. Purpose

Mencegah gap antara desain, PRD, database, dan admin dashboard.

## 2. Global

| Content | Source | Model | Editable |
|---|---|---|---|
| Company name | DB | SiteSettings | Ya |
| Logo | DB/Cloudinary | SiteSettings | Ya |
| Address | DB | SiteSettings | Ya |
| Phone | DB | SiteSettings | Ya |
| Email | DB | SiteSettings | Ya |
| Footer text | DB | SiteSettings | Ya |
| Social links | DB | SiteSettings | Ya |

## 3. Home

| Content | Model | Field |
|---|---|---|
| Hero title | HeroSection | title |
| Hero subtitle | HeroSection | subtitle |
| Hero image | HeroSection | imageUrl |
| Hero CTA | HeroSection | ctaLabel, ctaUrl |
| Featured products | Product | isFeatured |
| Product order | Product | order |
| Highlights | HomeHighlight | title, description, icon, order |
| SEO | PageSeo | pageKey=home |

## 4. About

| Content | Model | Field |
|---|---|---|
| title | AboutContent | title |
| body | AboutContent | content |
| image | AboutContent | imageUrl |
| vision | AboutContent | vision |
| mission | AboutContent | mission |
| office address | AboutContent/SiteSettings | sesuai sumber resmi |
| SEO | PageSeo | pageKey=about |

## 5. Products

| Content | Model | Field |
|---|---|---|
| name | Product | name |
| slug | Product | slug |
| short desc | Product | shortDesc |
| full desc | Product | fullDesc |
| features | Product | features |
| main image | Product | imageUrl |
| gallery | Product | galleryUrls |
| order | Product | order |
| published | Product | isPublished |
| featured | Product | isFeatured |
| SEO | PageSeo or product SEO extension | documented implementation |

## 6. Partners

| Content | Model | Field |
|---|---|---|
| hero title | PartnersPageContent | heroTitle |
| hero subtitle | PartnersPageContent | heroSubtitle |
| CTA | PartnersPageContent | ctaLabel |
| benefit | PartnerBenefit | title, description, icon |
| partner name | Partner | name |
| category | Partner | category |
| description | Partner | description |
| icon | Partner | iconUrl |
| order | Partner | order |
| published | Partner | isPublished |

## 7. Contact

Public:
- name;
- email;
- phone;
- message.

DB:
`ContactMessage`.

Source:
- `general`;
- `partnership`.

## 8. Legal

`LegalContent`:
- privacyPolicy;
- termsOfService;
- cookiePolicy.

## 9. Careers

`CareerContent`:
- description;
- hasOpenPositions;
- openPositionsText;
- applyEmail.

## 10. CMS Rule

Setiap field editorial harus mempunyai:
- owner;
- source;
- validation;
- render target;
- fallback;
- editable status.

Tidak boleh ada konten bisnis penting yang muncul hanya karena developer menulis string baru di component.

## 11. Placeholder Policy

Placeholder diperbolehkan hanya:
- local development;
- clearly marked;
- tidak dipresentasikan sebagai fakta perusahaan.

