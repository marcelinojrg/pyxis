# SCREEN-SPEC.md
# Screen and Section Specification

> Dokumen ini menerjemahkan page dan section menjadi contract implementasi. Nama section final harus diselaraskan dengan Figma-Audit.

## 1. Global Shell

### Header
- logo/brand;
- navigation;
- CTA bila terdapat pada desain;
- mobile menu.

States:
- desktop;
- mobile closed;
- mobile open;
- scrolled;
- keyboard focus.

### Footer
- company information;
- navigation;
- legal links;
- copyright;
- social links jika tersedia.

## 2. Home Specification

### Section order contract
Urutan wajib mengikuti Figma yang sudah diset oleh designer.
Sebelum coding final, isi `FIGMA-AUDIT.md` dengan node/frame setiap section.

### Hero
Inputs:
- title;
- subtitle;
- hero image;
- primary CTA;
- optional secondary CTA.

Behavior:
- image tidak boleh menyebabkan CLS;
- CTA keyboard accessible;
- mobile text tidak overflow.

### Featured Products
Inputs:
- list product;
- product name;
- short description;
- image;
- CTA.

Empty:
- hidden section atau editorial fallback yang telah disetujui, bukan card kosong.

### Highlights / Capabilities
Inputs:
- title;
- description;
- icon;
- order.

Visual:
- gunakan komposisi Figma;
- jangan paksa tiga kolom jika desain menunjukkan bentuk lain.

### CTA
Inputs:
- title;
- subtitle;
- button.

## 3. About

Recommended data blocks:
- intro;
- history;
- vision;
- mission;
- office information;
- supporting visual.

Mobile:
- split layout menjadi stacked layout;
- image tidak boleh memotong wajah/object penting.

## 4. Product List

Each ProductCard:
- image;
- name;
- short description;
- CTA.

States:
- published list;
- no products;
- image fallback;
- loading.

## 5. Product Detail

Blocks:
- breadcrumb;
- title;
- intro;
- feature list;
- gallery;
- CTA.

Optional:
- related product jika ada data yang benar-benar dibutuhkan.

## 6. Partners

Blocks:
- hero;
- benefits;
- partner/integration list;
- application CTA/form.

Partner list filters jika ada harus sederhana dan tidak menciptakan interaction yang tidak didukung Figma.

## 7. Contact

Blocks:
- intro;
- form;
- contact information;
- optional map.

States:
- idle;
- validating;
- submitting;
- success;
- server error;
- rate limited.

## 8. Legal

Blocks:
- page intro;
- policy navigation;
- privacy;
- terms;
- cookies.

## 9. Career

Blocks:
- intro;
- culture;
- open position state;
- application CTA.

States:
- no opening;
- opening available.

## 10. Admin Screens

### Dashboard
Metric cards:
- products;
- partners;
- unread messages;
- total messages.

### Editor
Generic form behavior:
- loading;
- dirty;
- saving;
- success;
- validation error;
- server error.

### Tables
- sorting only where useful;
- action menu;
- delete confirm;
- empty state;
- pagination only if list size requires it.

### Image Uploader
States:
- idle;
- selecting;
- validating;
- uploading;
- success;
- failure;
- remove.

## 11. Responsive Contract

| Viewport | Minimum behavior |
|---|---|
| 360px | no horizontal page overflow |
| 390px | readable content and CTA |
| 768px | tablet layout |
| 1024px | desktop composition starts |
| 1280px+ | full layout |

## 12. UI State Contract

Every mutation component must define:
- loading;
- success;
- error;
- disabled;
- empty where relevant.

## 13. Accessibility Contract

Every screen:
- page title;
- heading hierarchy;
- keyboard focus;
- visible focus;
- labels;
- semantic landmarks;
- meaningful alt;
- accessible errors.
