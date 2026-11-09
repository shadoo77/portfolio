# Roadmap

Single source of truth for this project. Update this file whenever work lands —
there are no separate task files.

**Legend:** ✅ Done · 🚧 In progress · ⬜ Todo · 💡 Backlog
**Last updated:** 2026-11-09

## At a glance

| Area                 | Status | Notes                                                         |
| -------------------- | ------ | ------------------------------------------------------------- |
| Foundation           | ✅     | Next.js 16.4, React 19.3, TypeScript, Tailwind v4, pnpm       |
| Design system        | ✅     | Dark-first tokens, Geist + IBM Plex Sans Arabic, shadcn/ui    |
| Internationalisation | ✅     | `en` / `nl` / `ar`, RTL, locale-aware metadata and hreflang   |
| Landing page         | 🚧     | Hero, selected work, about and contact sections live          |
| Case studies         | ⬜     | Content model and detail routes not started                   |
| Dynamic features     | ⬜     | Contact action, GitHub section, CV download                   |
| Quality & SEO        | 🚧     | Lint, typecheck, build and CI green; tests/OG/sitemap pending |
| Deployment           | ⬜     | Not deployed yet — Vercel free URL planned                    |

## Phase 0 — Foundation ✅

- ✅ Next.js 16.4 App Router with `cacheComponents` + partial prefetching
- ✅ React 19, TypeScript strict, `@/*` path alias
- ✅ Tailwind CSS v4 (CSS-first, no config file)
- ✅ shadcn/ui initialised with **RTL enabled** (Radix primitives)
- ✅ `next-intl` routing for `en`, `nl`, `ar`; `proxy.ts` locale negotiation
- ✅ Zod environment validation (`src/lib/env.ts`, `.env.example`)
- ✅ TanStack Query and `usehooks-ts` providers installed
- ✅ Prettier + Tailwind plugin, ESLint
- ✅ GitHub Actions CI (lint → typecheck → build)
- ✅ Initial commit pushed to `shadoo77/portfolio` (branch `master`)

## Phase 1 — Design foundation ✅

- ✅ Dark-first colour tokens (zinc + lime accent), light mode supported
- ✅ Typography: Geist Sans/Mono + IBM Plex Sans Arabic for `ar`
- ✅ Sticky header with brand, navigation, social links
- ✅ Locale switcher (flag-free, accessible dropdown)
- ✅ Theme toggle with hydration-safe rendering
- ✅ Footer with colophon and social links
- ✅ Skip-to-content link, logical CSS properties (`ps`/`pe`/`ms`/`me`)
- ⬜ Mobile navigation sheet
- ⬜ Scroll-reveal motion (Motion) with reduced-motion support

## Phase 2 — Core pages 🚧

- ✅ Hero: availability badge, portrait, CTAs, stats, social links
- ✅ Selected work grid with the four featured projects, public repo links and a
  side-project disclaimer
- ✅ About section: bio, languages, interests
- ✅ Contact CTA section
- ⬜ Experience timeline (This Development, Gofilex, 4NET, We Are Eves)
- ⬜ Contact form (Zod + react-hook-form + server action + Resend)
- ⬜ `/work` overview route with tag filtering (`nuqs`)
- ⬜ `/work/[slug]` case-study route
- ⬜ Dedicated `/about` and `/contact` routes

## Phase 3 — Content ⬜

- ⬜ Velite + Zod content collections for projects and posts
- ⬜ 4 case studies: CV Maker 2026, Recipes App, Next.js Viator, DeepNotLoud
- ⬜ Screenshots and poster frames (own projects only — **no company/client material**)
- ⬜ Project metadata: role, stack, problem, outcome, lessons learned
- ⬜ Translation strategy: EN/NL at launch, AR case studies in v1.1

## Phase 4 — Dynamic features ⬜

- ⬜ GitHub section (repos, stars, language mix) via cached route + TanStack Query
- ⬜ Contact form delivery with Resend + React Email, honeypot and rate limit
- ⬜ CV PDF export reusing the best `cv-maker-2026` template
- ⬜ `sonner` toasts and form error states
- ⬜ `cmdk` command palette (v1.1 candidate)
- ⬜ Full RTL QA pass across form controls, dropdowns and sheets

## Phase 5 — Quality & SEO 🚧

- ✅ Canonical URL and `hreflang` alternates in localized metadata
- ✅ Build-time typecheck and CI pipeline
- ⬜ `sitemap.ts` and `robots.ts`
- ⬜ Dynamic Open Graph images (`ImageResponse`)
- ⬜ JSON-LD `Person` schema with `knowsLanguage`
- ⬜ Playwright smoke tests including Arabic/RTL
- ⬜ Lighthouse CI budgets (≥ 95 across categories)
- ⬜ Accessibility audit (keyboard, focus, contrast)

## Phase 6 — Launch ⬜

- ⬜ Deploy to Vercel (free `*.vercel.app` URL first)
- ⬜ Vercel Analytics + Speed Insights
- ⬜ Branch protection on `master`
- ⬜ Custom domain decision and connection
- ⬜ Final content and copy review in all three languages

## v1.1 — Backlog 💡

- 💡 Blog / notes (MDX + Velite)
- 💡 Arabic translations of case studies
- 💡 Command palette
- 💡 GitHub contribution graph
- 💡 Live demos for featured projects
- 💡 Testimonials or recommendations section

## Assets and access needed

- ⬜ Screenshots for the four featured projects (can be captured locally)
- ✅ DeepNotLoud: public repo at `shadoo77/DeepNotLoud`
- ✅ CV Maker 2026: public repo and live GitHub Pages demo
- ⬜ `RESEND_API_KEY` for the contact form (mailto fallback until then)
- ⬜ `GITHUB_TOKEN` for the live GitHub section
- ⬜ Domain name (optional, can launch on the Vercel URL)

## Decisions log

| Date       | Decision                                                                   | Why                                                                                    |
| ---------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 2026-11-09 | Next.js 16 App Router over Vite                                            | Strongest skill signal; SSG, metadata, server actions, easy Vercel deploy              |
| 2026-11-09 | Three locales: EN, NL, AR with full RTL                                    | Dutch market + native Arabic; RTL is a differentiator                                  |
| 2026-11-09 | Dark-first minimal tech design                                             | Matches personal preference and developer audience                                     |
| 2026-11-09 | Ship MVP first, then v1.1                                                  | Keeps launch scope realistic; avoids writing 12 case studies up front                  |
| 2026-11-09 | No company/client screenshots                                              | Legal and NDA safety; company work stays as a text-only timeline                       |
| 2026-11-09 | Free Vercel URL first                                                      | Unblocks launch; custom domain can be added without rework                             |
| 2026-11-09 | Featured projects: CV Maker 2026, Recipes App, Next.js Viator, DeepNotLoud | All own work, public or publishable                                                    |
| 2026-11-09 | Pin CI to `ubuntu-24.04` and current actions majors                        | Avoids Ubuntu 26 migration surprises and Node 20 runtime deprecation                   |
| 2026-11-09 | Site shows `7+` JavaScript, `7+` React and `5+` Next.js                    | Matches the CV skills; hero keeps three focused stats, languages move to About         |
| 2026-11-09 | Work grid is labelled as side projects with an explicit disclaimer         | The four featured repos are hobbies; professional work is company-owned                |
| 2026-11-09 | Theme script hoisted into the layout `<head>` via `next/script`            | React 19 rejects executable scripts rendered inside client components                  |
| 2026-11-09 | Sticky header shrinks via scroll listener + `data-scrolled` toggle         | Universal support and simple Tailwind classes; CSS scroll-timeline needs a JS fallback |

## Changelog

- **2026-11-09** — Project scaffolded with Next.js 16.4, React 19.3, Tailwind v4 and pnpm.
- **2026-11-09** — `next-intl` configured for `en` / `nl` / `ar` with RTL and localized metadata.
- **2026-11-09** — Dark-first design tokens, Geist + IBM Plex Sans Arabic, shadcn/ui with RTL.
- **2026-11-09** — Landing page: header, hero, selected work, about, contact, footer.
- **2026-11-09** — Zod env validation, Prettier, GitHub Actions CI, `.env.example`.
- **2026-11-09** — `docs/roadmap.md` and `AGENTS.md` created; initial push to `shadoo77/portfolio`.
- **2026-11-09** — CI upgraded to `checkout@v7`, `setup-node@v7`, `pnpm/action-setup@v6`, Node 24 and `ubuntu-24.04`.
- **2026-11-09** — Hero stats aligned to the CV (`7+` JavaScript, `7+` React, `5+` Next.js); location now includes Utrecht.
- **2026-11-09** — Work section relabelled as side projects with a disclaimer; repo links for CV Maker 2026 and DeepNotLoud; live demo link for CV Maker.
- **2026-11-09** — Header and logo enlarged; sticky header shrinks on scroll with a passive listener and reduced-motion support.
- **2026-11-09** — Fixed React 19 "script tag" console error by hoisting the theme init script into the layout head.
