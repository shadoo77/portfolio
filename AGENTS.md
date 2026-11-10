<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio — agent guide

Personal portfolio for **Mohamad Shadi Omar**, a senior frontend / fullstack
developer based in Zeist, the Netherlands.

## Project facts

- Repo: `shadoo77/portfolio` · default branch `master`
- Package manager: **pnpm** (do not use npm/yarn)
- Node: `>=20.9.0` (CI uses Node 24 on `ubuntu-24.04`)
- Stack: Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4,
  shadcn/ui (Radix, RTL mode), next-intl, TanStack Query, Zod, usehooks-ts,
  next-themes, Motion, nuqs
- Deploy target: Vercel (free URL first, custom domain later)

## Commands

```bash
pnpm dev          # start the dev server
pnpm build        # production build (runs TypeScript)
pnpm start        # serve the production build
pnpm lint         # ESLint
pnpm typecheck    # next typegen && tsc --noEmit
pnpm format       # Prettier write
pnpm format:check # Prettier check
```

Run `pnpm lint` and `pnpm typecheck` before calling work complete.

## Architecture

```
src/
  app/[locale]/          # every route lives under the locale segment
    layout.tsx           # root layout: html/lang/dir, fonts, providers
    page.tsx             # landing page
    work/                # /work overview and /work/[slug] project pages
    opengraph-image.tsx  # generated social card per locale
    not-found.tsx
  app/sitemap.ts         # sitemap with hreflang alternates
  app/robots.ts
  components/
    layout/              # header, mobile nav, footer
    sections/            # hero, selected-work, experience, about, contact
    work/                # client-side project filter/browser
    shared/              # locale switcher, theme toggle, icons, headings, project card
    providers/           # theme + TanStack Query providers
    ui/                  # shadcn primitives (generated — avoid hand edits)
  config/                # site.ts (identity/links), projects.ts, experience.ts
  i18n/                  # routing, request config, navigation helpers
  lib/                   # env validation and localized metadata helper
  types/                 # next-intl type augmentation
messages/{en,nl,ar}.json # all UI copy
docs/roadmap.md          # the only status tracker
```

## Next.js 16 specifics

- Middleware is called **Proxy**: the file is `src/proxy.ts`.
- `cacheComponents` and `partialPrefetching` are enabled in `next.config.ts`.
  Do not use `dynamicParams` route config (incompatible). Avoid unstable values
  like `new Date()` during prerender — cache them or compute on the client.
- Locale is read from `next/root-params` in `src/i18n/request.ts`.
- Route helpers are globally typed (`PageProps`, `LayoutProps`). Run
  `pnpm typecheck` to regenerate route types.

## Conventions

- Server Components by default. Add `"use client"` only when required.
- **Tailwind logical properties only**: `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-`.
  Never `pl-`/`pr-`/`ml-`/`mr-` — they break Arabic RTL.
- Mirror directional icons in RTL with `rtl:` variants when needed.
- All user-facing copy lives in `messages/{en,nl,ar}.json`. Never hardcode
  strings in components.
- Keep the three locale files structurally identical.
- Content is typed via Velite + Zod once Phase 3 lands; do not hardcode project
  data inside components — use `src/config/projects.ts` for now.
- The Work grid shows **only personal side projects** and must keep the note that
  company/client work was delivered through employers — never imply it is public.
- Theme script lives in the layout head (`next/script` + `beforeInteractive`);
  `next-themes`' own script is marked `application/json` to avoid the React 19
  client-script warning. Keep both in sync with the `ThemeProvider` config.
- Images use `next/image` with explicit dimensions or `sizes`.
- Preserve accessibility: semantic landmarks, visible focus, AA contrast,
  labels on icon-only buttons.
- Format with Prettier (`singleQuote: false`, Tailwind class sorting).

## Status tracking

`docs/roadmap.md` is the **only** status tracker.

- Mark an item `✅` when it lands.
- Use `🚧` for work in progress.
- Move new ideas to the v1.1 backlog instead of starting them mid-phase.
- Add one line to the changelog for every meaningful change.
- Do **not** create TODO/TASKS files or task lists elsewhere.

## Git

- Default branch: `master` · remote: `git@github.com:shadoo77/portfolio.git`
- Commit messages: short imperative subject, conventional-commit style
  (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
- Keep commits focused; do not commit `.env.local`, `.next/`, or `node_modules`.

## Do not

- Commit secrets. `.env.local` is gitignored; `.env.example` is the template.
- Publish company/client screenshots, internal data, or anything covered by an
  NDA. Company work is represented only as a text timeline.
- Invent metrics, project outcomes or testimonials.
- Add dependencies without stating the reason in the commit or roadmap.
