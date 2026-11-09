# Portfolio — Mohamad Shadi Omar

Personal portfolio built with the modern React stack. Three locales (English,
Dutch, Arabic) with full RTL support, dark-first design, and a focus on
performance and accessibility.

## Stack

| Layer      | Choice                                     |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 16 (App Router, Cache Components)  |
| Language   | TypeScript (strict)                        |
| UI         | Tailwind CSS v4, shadcn/ui (Radix), Lucide |
| i18n       | next-intl (`en`, `nl`, `ar`, RTL)          |
| Data       | TanStack Query                             |
| Validation | Zod v4                                     |
| Utilities  | usehooks-ts, next-themes, Motion, nuqs     |
| Tooling    | pnpm, ESLint, Prettier, GitHub Actions     |

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the proxy redirects to the
negotiated locale (`/en`, `/nl` or `/ar`).

## Scripts

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Start the development server           |
| `pnpm build`        | Production build (includes TypeScript) |
| `pnpm start`        | Serve the production build             |
| `pnpm lint`         | ESLint                                 |
| `pnpm typecheck`    | Generate route types and run `tsc`     |
| `pnpm format`       | Format with Prettier                   |
| `pnpm format:check` | Check formatting                       |

## Project structure

```
src/
  app/[locale]/       localized routes
  components/         layout, sections, shared components, shadcn ui
  config/             site identity and featured projects
  i18n/               routing, request config, navigation
  lib/                environment validation
messages/             en.json, nl.json, ar.json
docs/roadmap.md       project status and decisions
```

## Environment

| Variable               | Required                    | Purpose                              |
| ---------------------- | --------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Yes (defaults to localhost) | Canonical URLs, hreflang, Open Graph |
| `RESEND_API_KEY`       | Optional                    | Contact form delivery (Phase 4)      |
| `GITHUB_TOKEN`         | Optional                    | Live GitHub section (Phase 4)        |

## Roadmap

Progress, decisions and the changelog live in [`docs/roadmap.md`](docs/roadmap.md).

## Notes

Company and client work is **not** shown visually. Only personal projects are
featured, in line with NDA and IP obligations.
