# Graph Report - src  (2026-08-19)

## Corpus Check
- Corpus is ~43,712 words - fits in a single context window. You may not need a graph.

## Summary
- 752 nodes · 1720 edges · 63 communities (52 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.62)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Primitives & Base Components
- Alerts & Modals
- Sheet & Sidebar Layout
- Display Primitives (Avatar, Breadcrumb)
- Root Layout & App Shell
- Combobox Component
- DataTable & Select
- Dropdown Menu
- Home Page Sections
- TipTap Search & Replace
- Landing Layout & Navbar
- Auth Core & Admin Gate
- About Page
- Admin User Management
- Admin Article Service
- Context Menu
- Form Field Components
- Public Auth Actions
- Footer & Social Icons
- Admin Search Schemas
- Carousel Component
- Tabs & TipTap Image Placeholder
- Admin Role Management
- Chart Components
- Article Interfaces
- Error Handling UI
- Newsletter & Email Queue
- Service Barrels & Uploads
- Pagination Component
- Empty State Component
- useSort Hook
- TipTap Font Size Ext
- TipTap Line Height Ext
- Profile Schemas
- Auth Type Declarations
- Loading States
- Heading Component
- Component Architecture Doc
- Admin Dashboard Page
- Greeting Card
- useScreenSize Hook
- Article Category Schemas
- Nav Links Config
- Auth Client
- Moment Types
- Service Response Type
- Auth Client Exports

## God Nodes (most connected - your core abstractions)
1. `cn()` - 284 edges
2. `useToolbar()` - 53 edges
3. `Button` - 39 edges
4. `getModKey()` - 33 edges
5. `verifyPermission()` - 26 edges
6. `TooltipContent()` - 24 edges
7. `Tooltip()` - 23 edges
8. `TooltipTrigger()` - 23 edges
9. `ButtonProps` - 17 edges
10. `prisma` - 14 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `FacebookIcon()` --calls--> `cn()`  [EXTRACTED]
  components/Common/CustomIcons.tsx → lib/utils.ts
- `GoogleIcon()` --calls--> `cn()`  [EXTRACTED]
  components/Common/CustomIcons.tsx → lib/utils.ts
- `ImageCropperModal()` --calls--> `cn()`  [EXTRACTED]
  components/Common/Modals/ImageCropperModal.tsx → lib/utils.ts
- `AlertAction()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Three-Layer Component Architecture (Common / Mixins / UI)** — src_components_readme_common, src_components_readme_mixins, src_components_readme_ui [EXTRACTED 1.00]

## Communities (63 total, 11 thin omitted)

### Community 0 - "UI Primitives & Base Components"
Cohesion: 0.12
Nodes (50): RichTextEditorProps, Button, ButtonProps, buttonVariants, Calendar(), CalendarDayButton(), Checkbox(), Popover() (+42 more)

### Community 1 - "Alerts & Modals"
Cohesion: 0.05
Nodes (40): ApiAlert(), textMap, variantMap, ApiListAlert(), AlertModal(), ImageCropperModal(), ImageCropperModalProps, ImagePreviewModalProps (+32 more)

### Community 2 - "Sheet & Sidebar Layout"
Cohesion: 0.06
Nodes (36): Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle(), Sidebar() (+28 more)

### Community 3 - "Display Primitives (Avatar, Breadcrumb)"
Cohesion: 0.09
Nodes (30): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Breadcrumb(), BreadcrumbEllipsis() (+22 more)

### Community 4 - "Root Layout & App Shell"
Cohesion: 0.10
Nodes (15): geistMono, geistSans, inter, metadata, RootLayout(), metadata, metadata, genPageMetadata() (+7 more)

### Community 5 - "Combobox Component"
Cohesion: 0.09
Nodes (23): ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent(), ComboboxEmpty(), ComboboxGroup(), ComboboxInput() (+15 more)

### Community 6 - "DataTable & Select"
Cohesion: 0.13
Nodes (23): DataTable(), DataTableProps, Select(), SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton() (+15 more)

### Community 7 - "Dropdown Menu"
Cohesion: 0.12
Nodes (17): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+9 more)

### Community 8 - "Home Page Sections"
Cohesion: 0.14
Nodes (11): HomeAboutSummary(), MILESTONES, HomeCTA(), EVOLUTION_NODES, HomeEvolution(), HomeFeatures(), HomeHero(), HomeHeroProps (+3 more)

### Community 9 - "TipTap Search & Replace"
Cohesion: 0.14
Nodes (17): Commands, getRegex(), ProcessedSearches, rebaseNextResult(), replace(), replaceAll(), SearchAndReplace, SearchAndReplaceOptions (+9 more)

### Community 10 - "Landing Layout & Navbar"
Cohesion: 0.13
Nodes (14): geistMono, geistSans, inter, jakartaSans, LandingPageLayout(), Props, ScrollToTop(), NAV_LINKS (+6 more)

### Community 11 - "Auth Core & Admin Gate"
Cohesion: 0.19
Nodes (6): AdminLayout(), AdminLayoutProps, auth, adapter, prisma, config

### Community 12 - "About Page"
Cohesion: 0.14
Nodes (10): AboutContact(), AboutContactProps, AboutCTA(), AboutHero(), AboutHeroProps, AboutProfile(), AboutProfileProps, AboutVisionMission() (+2 more)

### Community 13 - "Admin User Management"
Cohesion: 0.15
Nodes (12): Role, User, UserPaginationResponse, UserResponse, userSchema, AdminAuthApi, createUser(), deleteUser() (+4 more)

### Community 14 - "Admin Article Service"
Cohesion: 0.22
Nodes (14): slugify(), articleSchema, ArticleValues, createArticle(), createCategory(), deleteArticleById(), deleteBulkArticles(), deleteCategory() (+6 more)

### Community 15 - "Context Menu"
Cohesion: 0.12
Nodes (10): ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioItem(), ContextMenuSeparator(), ContextMenuShortcut(), ContextMenuSubContent() (+2 more)

### Community 16 - "Form Field Components"
Cohesion: 0.15
Nodes (13): Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), FieldLegend(), FieldSeparator() (+5 more)

### Community 17 - "Public Auth Actions"
Cohesion: 0.17
Nodes (11): Account, AuthResponse, Session, User, BLOCKED_DOMAINS, loginSchema, registerSchema, loginAction() (+3 more)

### Community 18 - "Footer & Social Icons"
Cohesion: 0.22
Nodes (12): FacebookIcon(), GitHubIcon(), GoogleIcon(), InstagramIcon(), LinkedInIcon(), Props, TwitterIcon(), companyLinks (+4 more)

### Community 19 - "Admin Search Schemas"
Cohesion: 0.13
Nodes (14): CategorySearchParams, categorySearchSchema, EventSearchParams, eventSearchSchema, GenericSearchParams, genericSearchSchema, PermissionSearchParams, permissionSearchSchema (+6 more)

### Community 20 - "Carousel Component"
Cohesion: 0.19
Nodes (13): Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions (+5 more)

### Community 21 - "Tabs & TipTap Image Placeholder"
Cohesion: 0.21
Nodes (12): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), Commands, ImagePlaceholder, ImagePlaceholderComponent() (+4 more)

### Community 22 - "Admin Role Management"
Cohesion: 0.18
Nodes (11): RolePaginationResponse, RoleResponse, roleSchema, createRole(), deleteRole(), getRoleById(), getRoleByName(), getRoles() (+3 more)

### Community 23 - "Chart Components"
Cohesion: 0.21
Nodes (11): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload(), INITIAL_DIMENSION (+3 more)

### Community 24 - "Article Interfaces"
Cohesion: 0.15
Nodes (12): Article, ArticleCategory, ArticleCategoryPaginationResponse, ArticleCategoryResponse, ArticleDetail, ArticleDetailFaq, ArticleDetailFlowchartItem, ArticleDetailStep (+4 more)

### Community 25 - "Error Handling UI"
Cohesion: 0.27
Nodes (7): ErrorState(), getErrorContent(), IllustrationProps, ErrorMetadata, ErrorStateProps, ErrorTheme, RequestError

### Community 26 - "Newsletter & Email Queue"
Cohesion: 0.29
Nodes (9): sendNewEventNewsletter(), subscribeNewsletter(), Footer(), registerAction(), sendPasswordChangeNotificationEmail(), createEmailHtmlWrapper(), getTransporter(), processEmailQueue() (+1 more)

### Community 27 - "Service Barrels & Uploads"
Cohesion: 0.20
Nodes (3): RichTextEditor(), slugify(), uploadImage()

### Community 28 - "Pagination Component"
Cohesion: 0.22
Nodes (7): Pagination(), PaginationContent(), PaginationEllipsis(), PaginationLink(), PaginationLinkProps, PaginationNext(), PaginationPrevious()

### Community 29 - "Empty State Component"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 30 - "useSort Hook"
Cohesion: 0.40
Nodes (3): SortHookReturn, SortDirection, SortHookReturn

### Community 31 - "TipTap Font Size Ext"
Cohesion: 0.40
Nodes (4): Commands, FontSize, FontSizeOptions, @tiptap/core

### Community 32 - "TipTap Line Height Ext"
Cohesion: 0.40
Nodes (4): Commands, LineHeight, LineHeightOptions, @tiptap/core

### Community 33 - "Profile Schemas"
Cohesion: 0.40
Nodes (4): changePasswordSchema, ChangePasswordValues, updateNameSchema, UpdateNameValues

### Community 34 - "Auth Type Declarations"
Cohesion: 0.40
Nodes (4): better-auth, better-auth/react, Session, User

### Community 38 - "Component Architecture Doc"
Cohesion: 0.83
Nodes (4): Arsitektur Komponen (Components README), Common Components (/src/components/Common/), Mixins Components (/src/components/Mixins/), UI Components (/src/components/ui/)

## Knowledge Gaps
- **125 isolated node(s):** `metadata`, `AdminLayoutProps`, `AboutContactProps`, `AboutHeroProps`, `AboutProfileProps` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Display Primitives (Avatar, Breadcrumb)` to `UI Primitives & Base Components`, `Alerts & Modals`, `Sheet & Sidebar Layout`, `Root Layout & App Shell`, `Combobox Component`, `DataTable & Select`, `Dropdown Menu`, `Home Page Sections`, `Landing Layout & Navbar`, `About Page`, `Context Menu`, `Form Field Components`, `Footer & Social Icons`, `Carousel Component`, `Tabs & TipTap Image Placeholder`, `Chart Components`, `Pagination Component`, `Empty State Component`?**
  _High betweenness centrality (0.449) - this node is a cross-community bridge._
- **Why does `prisma` connect `Auth Core & Admin Gate` to `Home Page Sections`, `About Page`, `Admin User Management`, `Admin Article Service`, `Public Auth Actions`, `Admin Role Management`, `Newsletter & Email Queue`, `Service Barrels & Uploads`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `auth` connect `Auth Core & Admin Gate` to `Landing Layout & Navbar`, `Admin User Management`, `Admin Article Service`, `Public Auth Actions`, `Newsletter & Email Queue`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `metadata`, `AdminLayoutProps`, `AboutContactProps` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Primitives & Base Components` be split into smaller, more focused modules?**
  _Cohesion score 0.12225233363444746 - nodes in this community are weakly interconnected._
- **Should `Alerts & Modals` be split into smaller, more focused modules?**
  _Cohesion score 0.054354178842782 - nodes in this community are weakly interconnected._
- **Should `Sheet & Sidebar Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.06090808416389812 - nodes in this community are weakly interconnected._