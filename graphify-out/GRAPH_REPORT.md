# Graph Report - pyxis  (2026-08-16)

## Corpus Check
- 289 files · ~110,427 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 501 nodes · 971 edges · 39 communities (28 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Components & Helpers
- Admin API Handlers
- UI Components & Helpers
- Database Queries & ORM
- UI Components & Helpers
- Module Cluster 5
- API Routes & Endpoints
- Admin API Handlers
- Database Queries & ORM
- Module Cluster 9
- Admin API Handlers
- Navigation & Shared Layout
- Navigation & Shared Layout
- UI Components & Helpers
- Custom React Hooks
- Custom React Hooks
- Database Queries & ORM
- Navigation & Shared Layout
- Module Cluster 19
- Module Cluster 21
- Custom React Hooks
- Module Cluster 23
- Module Cluster 24
- Navigation & Shared Layout
- API Routes & Endpoints
- Custom React Hooks

## God Nodes (most connected - your core abstractions)
1. `cn()` - 63 edges
2. `errorResponse()` - 59 edges
3. `successResponse()` - 58 edges
4. `requireAdmin()` - 48 edges
5. `handleZodError()` - 34 edges
6. `prisma` - 31 edges
7. `compilerOptions` - 17 edges
8. `Container()` - 13 edges
9. `new_documents` - 12 edges
10. `testPhase5()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `testPhase5()` --indirect_call--> `Container()`  [INFERRED]
  scripts/test-phase5.ts → src/components/ui/container.tsx
- `testPhase4()` --calls--> `isRateLimited()`  [EXTRACTED]
  scripts/test-phase4.ts → src/lib/rate-limit.ts
- `testPhase5()` --indirect_call--> `Badge()`  [INFERRED]
  scripts/test-phase5.ts → src/components/ui/badge.tsx
- `testPhase5()` --indirect_call--> `Dialog()`  [INFERRED]
  scripts/test-phase5.ts → src/components/ui/dialog.tsx
- `testPhase5()` --indirect_call--> `EmptyState()`  [INFERRED]
  scripts/test-phase5.ts → src/components/ui/empty-state.tsx

## Import Cycles
- None detected.

## Communities (39 total, 11 thin omitted)

### Community 0 - "UI Components & Helpers"
Cohesion: 0.06
Nodes (57): testPhase5(), HomeFeaturedProducts(), HomeFeaturedProductsProps, ProductItem, HighlightItem, HomeHighlightsProps, ICON_MAP, ScrollToTop() (+49 more)

### Community 1 - "Admin API Handlers"
Cohesion: 0.10
Nodes (47): AdminDashboardPage(), metadata, GET(), PUT(), GET(), PUT(), GET(), PUT() (+39 more)

### Community 2 - "UI Components & Helpers"
Cohesion: 0.04
Nodes (49): axios, babel-plugin-react-compiler, @base-ui/react, bcryptjs, class-variance-authority, cloudinary, clsx, dotenv (+41 more)

### Community 3 - "Database Queries & ORM"
Cohesion: 0.05
Nodes (41): autoprefixer, eslint-config-next, eslint-config-prettier, @eslint/eslintrc, eslint-plugin-prettier, devDependencies, autoprefixer, eslint (+33 more)

### Community 4 - "UI Components & Helpers"
Cohesion: 0.11
Nodes (18): testHome(), HomeAboutSummary(), MILESTONES, HomeCTA(), EVOLUTION_NODES, HomeEvolution(), HomeFeatures(), HomeHero() (+10 more)

### Community 5 - "Module Cluster 5"
Cohesion: 0.07
Nodes (29): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, ./next-env.d.ts, .next/types/**/*.ts, node_modules, src/data/siteMedadata.js (+21 more)

### Community 6 - "API Routes & Endpoints"
Cohesion: 0.15
Nodes (8): metadata, metadata, metadata, genPageMetadata(), sitemap(), siteMetadata, PageSEOProps, getAppRoutes()

### Community 7 - "Admin API Handlers"
Cohesion: 0.10
Nodes (19): new_documents, note, updated_existing, API-CONTRACTS.md, ARCHITECTURE.md, CLAUDE.md, COMPONENT-CATALOG.md, CONTENT-DATA-MAPPING.md (+11 more)

### Community 8 - "Database Queries & ORM"
Cohesion: 0.11
Nodes (17): author, email, name, name, packageManager, prisma, seed, private (+9 more)

### Community 9 - "Module Cluster 9"
Cohesion: 0.20
Nodes (15): testPhase4(), isRateLimited(), RateLimitRecord, tracker, aboutSchema, careerSchema, contactSchema, heroSchema (+7 more)

### Community 10 - "Admin API Handlers"
Cohesion: 0.27
Nodes (5): AdminLayout(), AdminLayoutProps, authConfig, { handlers, signIn, signOut, auth }, config

### Community 11 - "Navigation & Shared Layout"
Cohesion: 0.24
Nodes (6): inter, metadata, poppins, Footer(), NAV_LINKS, Navbar()

### Community 12 - "Navigation & Shared Layout"
Cohesion: 0.39
Nodes (5): ErrorState(), ErrorMetadata, ErrorStateProps, ErrorTheme, RequestError

### Community 15 - "Custom React Hooks"
Cohesion: 0.33
Nodes (3): client, HookType, httpsAgent

### Community 16 - "Custom React Hooks"
Cohesion: 0.40
Nodes (3): SortHookReturn, SortDirection, SortHookReturn

## Knowledge Gaps
- **149 isolated node(s):** `PRD.md`, `ARCHITECTURE.md`, `DESIGN(1).md`, `CLAUDE.md`, `ONLY_ME.md` (+144 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `UI Components & Helpers` to `Navigation & Shared Layout`, `UI Components & Helpers`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `prisma` connect `Admin API Handlers` to `Admin API Handlers`, `UI Components & Helpers`, `Database Queries & ORM`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `HomeEvolution()` connect `UI Components & Helpers` to `UI Components & Helpers`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `PRD.md`, `ARCHITECTURE.md`, `DESIGN(1).md` to the rest of the system?**
  _149 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Components & Helpers` be split into smaller, more focused modules?**
  _Cohesion score 0.056022408963585436 - nodes in this community are weakly interconnected._
- **Should `Admin API Handlers` be split into smaller, more focused modules?**
  _Cohesion score 0.10057211683227943 - nodes in this community are weakly interconnected._
- **Should `UI Components & Helpers` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._