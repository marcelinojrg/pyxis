# AGENTS.md — Pyxis

## Project

Pyxis is the company-profile website and CMS for PT. Pyxis Ultimate Solution.
The product scope is public company content plus CMS management for Products,
Blog, and Careers. Treat `docs/PRD.md` as the current product source of truth.

## Stack

- Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4
- Base UI/shadcn components, TanStack Query/Table, and Zod
- Better Auth, Prisma 7, PostgreSQL, and Tiptap
- ImageKit, Sharp, and Nodemailer integrations
- npm 11 is the package manager

## Repository layout

- `src/app/(root)` — public website routes
- `src/app/(admin)` — protected CMS routes
- `src/app/(auth)` — authentication pages
- `src/app/api` — API routes, including Better Auth
- `src/components` — reusable UI components
- `src/services` — server-side business logic and actions
- `src/schemas` — validation schemas
- `src/interfaces` — shared contracts and types
- `src/lib`, `src/providers`, `src/hooks` — integrations, providers, and hooks
- `prisma` — schema, migrations, and seed data
- `test` — Playwright scenarios and test cases

## Required references

Read the relevant local documentation before making architecture or feature
changes:

- Product and architecture: `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`
- Folder and documentation conventions: `docs/FOLDER_STRUCTURE.md`, `docs/DOCUMENTATION.md`
- Code and type standards: `docs/CODING_STANDARDS.md`, `docs/TYPESCRIPT.md`
- Data and services: `docs/DATABASE.md`, `docs/SERVICES.md`
- Security and access: `docs/AUTHORIZATION.md`, `docs/SECURITY.md`
- Testing and contribution: `docs/TESTING.md`, `docs/CONTRIBUTING.md`
- Private/local constraints: `docs/ONLY_ME.md` (when present and relevant)

`CLAUDE.md` is the agent entry point and may add task-specific guidance.

## Commands

Use npm scripts from `package.json`:

- `npm run dev` — development server
- `npm run build` / `npm run start` — production build and server
- `npm run lint` / `npm run lint:fix` — linting
- `npm run typecheck` — TypeScript validation
- `npm run test:cms` — CMS tests
- `npm run db:seed` — seed the database

## Engineering rules

- Preserve unrelated user changes; inspect the diff before editing overlapping files.
- Prefer the smallest correct change and reuse existing patterns.
- Keep validation at trust boundaries and preserve security, accessibility, and error handling.
- For database changes, update Prisma schema/migrations and verify affected services.
- Do not expose secrets or private configuration.
- Run the narrowest relevant checks after changes; use `npm run lint` and
  `npm run typecheck` when the change spans general application code.
- Never add `Co-Authored-By: Codex` or other Codex authorship attribution to commits.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
