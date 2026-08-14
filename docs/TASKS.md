# TASKS.md
# Execution Checklist

> Kerjakan berurutan. Jangan lompat ke task berikutnya jika definition of done task sebelumnya gagal.

## PHASE 0: Documentation Alignment

- [x] Audit Figma section dan isi `FIGMA-AUDIT.md`
- [x] Verifikasi page order dengan `SCREEN-SPEC.md`
- [x] Verifikasi dynamic content dengan `CONTENT-DATA-MAPPING.md`
- [x] Finalkan design tokens
- [x] Finalkan component inventory
- [x] Finalkan architecture decisions
- [x] Tandai semua item yang belum punya source resmi

## PHASE 1: Project Foundation

- [x] Init Next.js
- [x] TypeScript strict
- [x] Tailwind
- [x] shadcn/ui
- [x] ESLint
- [x] Prettier
- [x] folder structure
- [x] environment template
- [x] Git repository
- [x] initial Vercel skeleton

## PHASE 2: Database and Prisma

- [x] Setup Prisma
- [x] Create schema Admin
- [x] Create schema SiteSettings
- [x] Create schema HeroSection
- [x] Create schema HomeHighlight
- [x] Create schema AboutContent
- [x] Create schema Product
- [x] Create schema PartnerBenefit
- [x] Create schema PartnersPageContent
- [x] Create schema Partner
- [x] Create schema ContactMessage
- [x] Create schema LegalContent
- [x] Create schema CareerContent
- [x] Create schema PageSeo
- [x] Migration
- [x] Seed admin
- [x] Seed initial singleton rows
- [x] Seed Alcor PMS and Alcor POS
- [x] Prisma client singleton
- [x] Query helpers

## PHASE 3: Authentication

- [ ] Auth.js credentials
- [ ] password hashing
- [ ] session handling
- [ ] requireAdmin helper
- [ ] protected admin layout
- [ ] login UI
- [ ] invalid login state
- [ ] logout
- [ ] auth API test

## PHASE 4: Validation and APIs

- [ ] Hero schema
- [ ] About schema
- [ ] Product schema
- [ ] Partner schema
- [ ] Legal schema
- [ ] Career schema
- [ ] Contact schema
- [ ] Site settings schema
- [ ] SEO schema
- [ ] Hero API
- [ ] About API
- [ ] Product CRUD API
- [ ] Partner page API
- [ ] Partner CRUD API
- [ ] Legal API
- [ ] Career API
- [ ] Contact create/list/read/delete
- [ ] Upload API
- [ ] rate limit
- [ ] API error contract

## PHASE 5: Design System

- [ ] install Poppins and Inter
- [ ] color tokens
- [ ] spacing tokens
- [ ] typography styles
- [ ] Button
- [ ] Container
- [ ] Section
- [ ] Heading
- [ ] Card
- [ ] Badge
- [ ] Input
- [ ] Textarea
- [ ] Select
- [ ] Dialog
- [ ] Toast
- [ ] Table
- [ ] Empty state
- [ ] Error state
- [ ] Loading skeleton
- [ ] responsive navigation
- [ ] footer

## PHASE 6: Public Website

### Home
- [ ] Implement Figma structure
- [ ] Hero
- [ ] Featured products
- [ ] Home highlights
- [ ] conversion CTA
- [ ] footer
- [ ] metadata

### About
- [ ] Figma structure
- [ ] content
- [ ] vision
- [ ] mission
- [ ] company contact
- [ ] metadata

### Products
- [ ] listing
- [ ] product card
- [ ] product empty state
- [ ] detail
- [ ] features
- [ ] gallery
- [ ] CTA
- [ ] metadata
- [ ] 404 product

### Partners
- [ ] hero
- [ ] benefits
- [ ] partner grid
- [ ] categories
- [ ] submit application form
- [ ] metadata

### Contact
- [ ] form
- [ ] validation
- [ ] success
- [ ] error
- [ ] contact info
- [ ] map only if approved backlog item

### Legal
- [ ] policy navigation
- [ ] content sections
- [ ] metadata

### Careers
- [ ] intro
- [ ] open position state
- [ ] application information
- [ ] metadata

### Global
- [ ] 404
- [ ] error
- [ ] loading
- [ ] sitemap
- [ ] robots

## PHASE 7: Admin

- [ ] sidebar
- [ ] dashboard metrics
- [ ] hero editor
- [ ] about editor
- [ ] site settings
- [ ] home highlights editor
- [ ] featured product selector
- [ ] product list
- [ ] create product
- [ ] edit product
- [ ] delete confirmation
- [ ] partner page editor
- [ ] partner benefit editor
- [ ] partner CRUD
- [ ] legal editor
- [ ] career editor
- [ ] message list
- [ ] message filters
- [ ] mark read
- [ ] delete message
- [ ] password change

## PHASE 8: Content

- [ ] Replace placeholders with verified company copy
- [ ] Verify company history
- [ ] Verify products and feature lists
- [ ] Verify contact data
- [ ] Verify partner data
- [ ] Upload approved media
- [ ] Add SEO copy

## PHASE 9: Testing

- [ ] public routes
- [ ] 360px
- [ ] 768px
- [ ] 1280px
- [ ] keyboard navigation
- [ ] contrast
- [ ] screen reader smoke test
- [ ] auth
- [ ] product CRUD
- [ ] partner CRUD
- [ ] legal
- [ ] career
- [ ] contact
- [ ] rate limit
- [ ] upload
- [ ] unpublished product access
- [ ] invalid slug
- [ ] malformed input
- [ ] XSS payload test
- [ ] Lighthouse
- [ ] build
- [ ] typecheck
- [ ] lint

## PHASE 10: Production

- [ ] production env
- [ ] database migration
- [ ] seed
- [ ] Cloudinary config
- [ ] Vercel deployment
- [ ] production smoke test
- [ ] backup/check database
- [ ] admin guide
- [ ] final Figma visual QA

## Definition of Done per task

- [ ] implementation works
- [ ] relevant manual test passed
- [ ] typecheck passed
- [ ] lint passed
- [ ] docs updated if behavior changed
- [ ] task checked
