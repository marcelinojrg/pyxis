# COMPONENT-CATALOG.md
# Component Inventory and Reuse Rules

## 1. Purpose

Dokumen ini mencegah setiap section dibuat sebagai component unik yang sulit dipelihara.

## 2. Public Components

### Navbar
Props:
- nav items;
- active path;
- CTA optional.

States:
- desktop;
- mobile;
- menu open;
- scrolled.

### Footer
Props:
- company info;
- navigation;
- legal;
- social.

### HeroSection
Props:
- title;
- subtitle;
- image;
- primary CTA;
- optional secondary CTA.

### SectionHeading
Props:
- eyebrow optional;
- title;
- description;
- alignment.

### ProductCard
Props:
- product;
- variant.

Variants:
- grid;
- featured.

### FeatureList
Props:
- items;
- icon style;
- columns.

### PartnerCard
Props:
- name;
- category;
- description;
- icon.

### ContactForm
Props:
- source.

### CTASection
Props:
- title;
- subtitle;
- action.

### EmptyState
Props:
- title;
- description;
- action.

### ErrorState
Props:
- title;
- description;
- retry.

## 3. Admin Components

### AdminSidebar
### AdminHeader
### MetricCard
### ProductTable
### PartnerTable
### MessageTable
### ProductForm
### PartnerForm
### AboutForm
### HeroForm
### SiteSettingsForm
### LegalForm
### CareerForm
### ImageUploader
### ConfirmDialog

## 4. UI Primitives

Use shadcn primitives:
- Button;
- Input;
- Textarea;
- Select;
- Checkbox;
- Dialog;
- Sheet;
- Table;
- Badge;
- Toast;
- Alert;
- Skeleton.

## 5. Component Rules

- no business database query inside low-level UI component;
- data is passed by props;
- mutation lives in form/container layer;
- component should have typed props;
- variants must be intentional;
- no random styling per instance.

## 6. Naming

Files:
`kebab-case.tsx`

Components:
`PascalCase`

Examples:
- `product-card.tsx` => `ProductCard`
- `contact-form.tsx` => `ContactForm`

## 7. Figma Mapping

Setiap major component harus memiliki referensi:
- Figma node;
- visual role;
- responsive rule;
- data source.

Mapping tersebut dicatat di `FIGMA-AUDIT.md`.
