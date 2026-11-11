# Roadmap

Single source of truth for this project. Update this file whenever work lands —
there are no separate task files.

**Legend:** ✅ Done · 🚧 In progress · ⬜ Todo · 💡 Backlog
**Last updated:** 2026-11-10

## At a glance

| Area                 | Status | Notes                                                               |
| -------------------- | ------ | ------------------------------------------------------------------- |
| Foundation           | ✅     | Next.js 16.4, React 19.3, TypeScript, Tailwind v4, pnpm             |
| Design system        | ✅     | Dark-first tokens, Geist + IBM Plex Sans Arabic, shadcn/ui          |
| Internationalisation | ✅     | `en` / `nl` / `ar`, RTL, locale-aware metadata and hreflang         |
| Landing page         | 🚧     | Hero, side projects, experience, about and contact sections         |
| Case studies         | ⬜     | Content model and detail routes not started                         |
| Dynamic features     | 🚧     | Contact form live; GitHub section and CV download pending           |
| Quality & SEO        | 🚧     | Lint, typecheck, build and CI green; tests/OG/sitemap pending       |
| Deployment           | 🚧     | Vercel production live; custom domain and branch protection pending |

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
- ✅ Mobile navigation sheet with section links, locale switcher, theme toggle
- ✅ Sticky header that shrinks on scroll with reduced-motion support
- ✅ Wordmark renders `siteConfig.shortName` (`Shadi`) with a localized home label

## Phase 2 — Core pages 🚧

- ✅ Hero: availability badge, portrait, CTAs, stats, social links
- ✅ Selected work grid with the four featured projects, public repo links and a
  side-project disclaimer
- ✅ Experience timeline (This is Development, Gofilex, 4net, We Are Eves)
- ✅ About section: bio, grouped skills from the CV, languages, interests
- ✅ Contact CTA section
- ✅ Contact form (Zod schema, server action, Resend, mailto handoff fallback)
- ✅ `/work` overview route with tag filtering (`nuqs`)
- ✅ `/work/[slug]` project pages (static, EN/NL/AR)

## Phase 3 — Content ⬜

- ⬜ Velite + Zod content collections — deferred: `projects.ts` is Zod-validated
  and typed, Velite earns its keep once the blog lands in v1.1
- ✅ 5 case studies with problem, constraints, approach, decisions, outcome and
  lessons in EN/NL/AR; Recipes App framed honestly as an unfinished experiment
- ⬜ Screenshots and poster frames (own projects only — **no company/client material**)
- ✅ Project metadata: problem, constraints, approach, decisions, outcome and
  lessons are typed and validated by Zod; every project now fills them
- ✅ Translation strategy: every case-study field is `Localized<T>`, so a
  missing locale fails the build

## Phase 4 — Dynamic features ⬜

- ⬜ GitHub section (repos, stars, language mix) via cached route + TanStack Query
- 🚧 Contact form delivery: Resend, honeypot and per-instance rate limit wired;
  React Email templates and a shared rate-limit store pending
- ⬜ CV PDF export reusing the best `cv-maker-2026` template
- ✅ `sonner` toasts and accessible form error states
- ⬜ `cmdk` command palette (v1.1 candidate)
- ⬜ Full RTL QA pass across form controls, dropdowns and sheets

## Phase 5 — Quality & SEO 🚧

- ✅ Canonical URL and `hreflang` alternates in localized metadata
- ✅ Build-time typecheck and CI pipeline
- ✅ Font loading: the Arabic family is only fetched on `/ar`, not preloaded everywhere
- ✅ `sitemap.ts` (with hreflang alternates) and `robots.ts`
- ✅ Dynamic Open Graph image (`ImageResponse`), wired into every route's metadata
- ✅ JSON-LD `Person` schema with `knowsLanguage`
- ✅ Playwright smoke suite (18 tests: home, work filters, case study, contact form, AR/RTL, mobile nav)
- 🚧 Lighthouse measured on production: EN 95/100/100/100, AR 99/100/100/100
  before motion; re-measure after the motion release. Budgets not enforced in CI
- ✅ Scroll-reveal motion (Motion) with reduced-motion and no-JS fallbacks
- ✅ Accessibility audit: axe-core runs on six routes plus the form error state in CI

## Phase 6 — Launch ⬜

- ✅ Deploy to Vercel (free `*.vercel.app` URL: `shadi-omar-portfolio.vercel.app`)
- ✅ Vercel Analytics + Speed Insights (scripts only load on Vercel)
- ✅ Branch protection on `master`
- ⬜ Custom domain decision and connection
- ⬜ Final content and copy review in all three languages

## v1.1 — Backlog 💡

- 💡 Blog / notes (MDX + Velite)
- 💡 Arabic translations of case studies
- 💡 Command palette
- 💡 GitHub contribution graph
- 💡 Live demos for featured projects
- 💡 Dedicated `/about` and `/contact` routes once long-form content justifies them
- 💡 Testimonials or recommendations section

## Assets and access needed

- ⬜ Screenshots for the four featured projects (can be captured locally)
- ✅ DeepNotLoud: public repo at `shadoo77/DeepNotLoud`
- ✅ CV Maker 2026: public repo and live GitHub Pages demo
- ✅ `SITE_URL` set on Vercel for Production and Preview
- ⬜ `RESEND_API_KEY` for the contact form (mailto fallback until then)
- ⬜ `GITHUB_TOKEN` for the live GitHub section
- ⬜ Domain name (optional, can launch on the Vercel URL)

## Decisions log

| Date       | Decision                                                                   | Why                                                                                      |
| ---------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 2026-11-09 | Next.js 16 App Router over Vite                                            | Strongest skill signal; SSG, metadata, server actions, easy Vercel deploy                |
| 2026-11-09 | Three locales: EN, NL, AR with full RTL                                    | Dutch market + native Arabic; RTL is a differentiator                                    |
| 2026-11-09 | Dark-first minimal tech design                                             | Matches personal preference and developer audience                                       |
| 2026-11-09 | Ship MVP first, then v1.1                                                  | Keeps launch scope realistic; avoids writing 12 case studies up front                    |
| 2026-11-09 | No company/client screenshots                                              | Legal and NDA safety; company work stays as a text-only timeline                         |
| 2026-11-09 | Free Vercel URL first                                                      | Unblocks launch; custom domain can be added without rework                               |
| 2026-11-09 | Featured projects: CV Maker 2026, Recipes App, Next.js Viator, DeepNotLoud | All own work, public or publishable                                                      |
| 2026-11-09 | Pin CI to `ubuntu-24.04` and current actions majors                        | Avoids Ubuntu 26 migration surprises and Node 20 runtime deprecation                     |
| 2026-11-09 | Site shows `7+` JavaScript, `7+` React and `5+` Next.js                    | Matches the CV skills; hero keeps three focused stats, languages move to About           |
| 2026-11-09 | Work grid is labelled as side projects with an explicit disclaimer         | The four featured repos are hobbies; professional work is company-owned                  |
| 2026-11-09 | Theme script hoisted into the layout `<head>` (superseded 11-10)           | React 19 rejects executable scripts rendered inside client components                    |
| 2026-11-09 | Sticky header shrinks via scroll listener + `data-scrolled` toggle         | Universal support and simple Tailwind classes; CSS scroll-timeline needs a JS fallback   |
| 2026-11-09 | Experience as a landing section, not a `/about` route                      | One scroll-telling story; four roles are too thin for a dedicated page                   |
| 2026-11-09 | Scroll-reveal motion moved to Phase 5                                      | Decoration only; it should not gate content work                                         |
| 2026-11-09 | Work filters use `nuqs` query state                                        | Shareable, back-button-friendly URLs; no client data fetching                            |
| 2026-11-09 | Project pages statically generated per slug and locale                     | Four projects × three locales prerender cleanly; `instant = false` allows params access  |
| 2026-11-10 | `SITE_URL` has no `NEXT_PUBLIC_` prefix                                    | Only read server-side; keeps the value out of the browser bundle                         |
| 2026-11-10 | Node pinned to `24.x` and build scripts allow-listed                       | Vercel warns about floating majors and silently skips native postinstall scripts         |
| 2026-11-10 | Contact form uses React 19 `useActionState`, not `react-hook-form`         | One shared Zod schema covers client and server; avoids two extra dependencies            |
| 2026-11-10 | Missing `RESEND_API_KEY` hands the message to the visitor's mail client    | The form works before any mail account exists; a real mailto link backs the handoff      |
| 2026-11-10 | IBM Plex Sans Arabic sets `preload: false`                                 | Four Arabic weights were preloaded on EN/NL where nothing renders them (~134 KB)         |
| 2026-11-10 | The Vercel production domain outranks `SITE_URL`                           | Renaming the project can no longer leave canonicals pointing at a dead host              |
| 2026-11-10 | Unknown slugs may answer `200` with `noindex` on the first hit             | PPR streams the shell before the page resolves; `notFound()` keeps the UI and noindex    |
| 2026-11-10 | Case studies keep the problem/decisions/outcome structure                  | Shows judgement rather than a feature list; the decisions block is the differentiator    |
| 2026-11-10 | Case-study content stays in `projects.ts`, validated by Zod                | Five projects need no content pipeline; Velite is deferred to the v1.1 blog              |
| 2026-11-10 | Landing page shows `featured` projects only                                | Keeps "Selected work" curated at four; `/work` lists all five                            |
| 2026-11-10 | Recipes App is labelled as an unfinished experiment                        | The repo is a routing/function scaffold; claiming otherwise would not survive a click    |
| 2026-11-10 | Dark is server-rendered; no inline theme script                            | React 19 never executes a script re-rendered on locale change; light users get one frame |
| 2026-11-10 | `ui/button` drops the icon-start padding override                          | The optical inset left 10px of asymmetry on small buttons, which reads as misalignment   |
| 2026-11-10 | No CV download; the site carries the full stack instead                    | The portfolio is the destination — a PDF leaves and is forgotten                         |
| 2026-11-10 | Scroll reveal uses one `Reveal` wrapper, not per-element animation         | Keeps the motion budget small and every section consistent                               |
| 2026-11-10 | Reveal keeps content visible without JS and under reduced motion           | Motion renders `opacity:0` in the HTML, so both fallbacks are load-bearing               |
| 2026-11-10 | axe-core runs in the Playwright suite                                      | Turns the accessibility claim into something CI enforces, across EN/NL/AR                |
| 2026-11-10 | Analytics and Speed Insights render only when `VERCEL` is set              | Their scripts 404 anywhere else, which failed best-practices locally                     |
| 2026-11-11 | Travel Hint added first; Next.js Viator leaves the landing page            | Newest work leads; Viator is the oldest and has no live demo                             |

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
- **2026-11-09** — Mobile navigation sheet added with section links, locale switcher, theme toggle and email CTA.
- **2026-11-09** — Experience timeline section added between Work and About, sourced from the CV with EN/NL/AR copy.
- **2026-11-09** — `/work` overview with `nuqs` tag filters and static `/work/[slug]` project pages in all three locales.
- **2026-11-10** — Dutch level shown as `intermediate (B1–B2)` in all three locales; CV copy aligned.
- **2026-11-10** — Wordmark simplified to `Shadi` from `siteConfig.shortName`; the trailing accent dot and the stale `shadi.dev` aria-label are gone.
- **2026-11-10** — Deployed to Vercel; `SITE_URL` replaces `NEXT_PUBLIC_SITE_URL` and falls back to `VERCEL_PROJECT_PRODUCTION_URL`. Node pinned to `24.x`, `@parcel/watcher` and `@swc/core` build scripts allow-listed.
- **2026-11-10** — Branch protection enabled on `master`; changes must pass lint, typecheck, build and the e2e suite.
- **2026-11-10** — Lighthouse audit of the live site: performance 95 (EN) and 99 (AR), accessibility, best practices and SEO 100 in both.
- **2026-11-11** — Travel Hint added as the sixth project with a full case study in EN/NL/AR; Next.js Viator moved off the landing page.
- **2026-11-10** — Reveal reimplemented with IntersectionObserver + CSS (−36 KB JS) after motion cost ~5 Lighthouse points.
- **2026-11-10** — Scroll-reveal motion with reduced-motion and no-JS fallbacks, Vercel Analytics + Speed Insights, and axe-core accessibility checks in CI.
- **2026-11-10** — Skills block in About mirrors the CV's categories, so the stack is on-page without a downloadable document.
- **2026-11-10** — Buttons with a leading icon keep symmetric padding; shadcn's tighter start padding read as misalignment at these sizes.
- **2026-11-10** — Case studies for all five projects, `featured` flag on the landing page, and Recipes App reframed honestly.
- **2026-11-10** — Case-study schema (problem, constraints, approach, decisions, outcome, lessons) plus a full Portfolio 2026 write-up in EN/NL/AR; 20 e2e tests.
- **2026-11-10** — Playwright smoke suite (18 tests) wired into CI; Vercel's production domain now outranks a stale `SITE_URL`.
- **2026-11-10** — Sitemap with hreflang alternates, robots, a generated Open Graph image and a `Person` JSON-LD block.
- **2026-11-10** — Arabic font no longer preloaded on EN/NL (4 unused weights, ~134 KB); AR keeps loading it on demand.
- **2026-11-10** — Contact form shipped: shared Zod schema, server action with honeypot and rate limit, Resend delivery, mailto handoff when no key is configured, localized errors and `sonner` toasts.
- **2026-11-09** — Fixed React 19 "script tag" console error by hoisting the theme init script into the layout head.
