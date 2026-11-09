# CLAUDE.md — PGB Planner Website (pgbplanner.nl)

## Project overview

Marketing website and public entry point for PGB Planner — a Dutch SaaS tool that helps PGB budget holders manage their care budget administration.

Currently serves as landing page, product page (`/vooruitblik`), blog, and contact form. Sign-up and login happen in the app; CTAs link to `app.pgbplanner.nl/registreer` and `/login`. Growing into the main entry point for the product: login, onboarding flows, public-facing pages, and content marketing all live here. The app itself lives at app.pgbplanner.nl in a separate repository.

Users who log in are redirected to app.pgbplanner.nl — authentication and app logic remain in the app repo.

**Live URL:** https://www.pgbplanner.nl (canonical `site` in `astro.config.mjs`)
**App URL:** https://app.pgbplanner.nl (separate repo)
**Audience:** Dutch PGB budget holders and their representatives, primarily caregivers aged 30–65

## Tech stack

- **Framework:** Astro 5 (^5.12.8), SSR mode (`output: 'server'`); blog pages and `/vooruitblik` are prerendered (`export const prerender = true`)
- **Adapter:** @astrojs/netlify (serverless functions + API routes)
- **Integrations:** @astrojs/mdx (articles), @astrojs/sitemap (excludes `/bedankt/`, `/bedankt-feedback/`, `/email-bevestigen/`)
- **Node:** 22 (`.nvmrc`, matches the Netlify build)
- **Styling:** Custom CSS only — no Tailwind. Global `src/styles/main.css` + component-scoped `<style>` blocks
- **Fonts:** Google Fonts — Inter (body), Lexend Deca (headings), BBH Sans Hegarty (decorative)
- **TypeScript:** strict mode
- **Hosting:** Netlify
- **Analytics:** GA4 (inline gtag in `BaseLayout.astro`) and PostHog (`posthog-js`, EU host, init and events in `src/lib/analytics.ts`, called from `BaseLayout.astro`; disabled in dev). `analytics.ts` also stores first-touch UTM/referrer data and adds UTMs to registration links. See `docs/marketing/analytics-architecture.md`
- **Contact form:** `SignupSection.astro` → `POST /api/contact` (`src/pages/api/contact.ts`: validates, verifies reCAPTCHA, forwards JSON to an n8n webhook). n8n handles the email (Resend) and the optional update subscription (Kit). No direct Kit integration in this repo
- **Spam protection:** reCAPTCHA v2 widget in `SignupSection.astro`, server-side verification inside `api/contact.ts`
- **Content:** Astro Content Collections (Zod schema in `src/content/config.ts`): `blog` (MDX articles) and `cta` (sticky blog CTA copy in `src/content/cta/sticky.md`)

## Project structure

```
src/
├── assets/icons/        # SVG icons
├── components/          # Header, Footer, SignupSection, FaqSection/FaqItem, StepCard, icon components, etc.
│   └── blog/            # BlogPostLayout, BlogCard, FeaturedArticleCard, LatestArticlesSection, ProductCta, StickyCta, icons/
├── content/
│   ├── config.ts        # Collection schemas (Zod): blog, cta
│   ├── blog/            # <slug>/index.mdx + hero.jpg per article, _templates/blog-post.md
│   └── cta/sticky.md    # Sticky blog CTA copy
├── layouts/
│   └── BaseLayout.astro # Root HTML wrapper (head, SEO meta, GA4, PostHog init, Header, Footer)
├── lib/
│   ├── analytics.ts     # PostHog, events, first-touch, UTMs on registration links
│   └── blog.ts          # getPublishedPosts, BLOG_INDEX_THRESHOLD, reading time, hero image, date format
├── pages/
│   ├── index.astro              # Landing page (hero, features, steps, latest articles, FAQ, contact form)
│   ├── vooruitblik.astro        # Product page for the Vooruitblik feature (video, steps, FAQ)
│   ├── bedankt.astro            # Thank-you after signing up for updates (noindex)
│   ├── bedankt-feedback.astro   # Thank-you after feedback (noindex, no header)
│   ├── email-bevestigen.astro   # Email confirmation screen (noindex)
│   ├── blog/index.astro         # Blog listing
│   ├── blog/[...slug].astro     # Blog post renderer (prerendered, published posts only)
│   └── api/contact.ts           # Contact form endpoint → reCAPTCHA check → n8n webhook
└── styles/
    └── main.css         # Global CSS with design tokens (custom properties)
public/
├── _redirects           # Netlify redirects (see below)
├── robots.txt           # Allows all, points to sitemap-index.xml
└── og/, video/, images  # OG images per article, Vooruitblik video, landing images
```

## Design tokens (from main.css)

| Token | Value | Use |
|-------|-------|-----|
| --color-primary | #265284 | Dark blue — headings, CTAs |
| --color-secondary | #4baa96 | Teal — accents, links |
| --color-l-blue | #3b73b4 | Light blue |
| --color-bg | #f9f2ea | Warm beige — page background |
| --color-bg-icon | #dbeeea | Light cyan — icon backgrounds |
| --color-black | #414040 | Body text |
| --color-body-text | #4b5563 | Secondary text |
| --color-alert | #e27a7a | Red — problem/alert icons |
| --color-orange | #ed9008 | Highlights |
| --color-form-btn | #02007f | Form submit button |
| --font-primary | Inter | Body |
| --font-heading | Lexend Deca | Headings |
| --container-w | 1200px | Max content width |
| --radius | 12px | Border radius |
| --header-h | 72px | Header height offset |

## Content rules

- All text is in Dutch (nl-NL)
- Tone: calm, warm, trustworthy — not corporate, not playful
- No em dashes (—) in copy — recognizable AI pattern
- No jargon unless the audience uses it daily (PGB, SVB, zorgkantoor are fine)
- Blog posts use MDX in `src/content/blog/[slug]/index.mdx`, with `hero.jpg` in the same folder. Start from `src/content/blog/_templates/blog-post.md`
- Blog schema requires: title, description, pubDate; draft defaults to true (set `draft: false` to publish). Optional: titleTag (document title), heroAlt, image (OG image, e.g. `/og/<slug>.jpg`), teaser (homepage text, falls back to description). Articles set `slug` in frontmatter for the URL
- Read `docs/marketing/editorial-guide.md` before any blog or content work. It is the leading source for editorial principles, tone, sourcing and factchecking.
- `docs/marketing/blog-product-cta-spec.md` governs how PGB Planner appears commercially inside an article.
- Read `docs/marketing/blog-content-blocks.md` before adding or editing any in-article content block.

## External services & env vars

| Variable | Scope | Purpose |
|----------|-------|---------|
| PUBLIC_RECAPTCHA_SITE_KEY | Client | reCAPTCHA widget |
| RECAPTCHA_SECRET_KEY | Server only | reCAPTCHA verification in `api/contact.ts` |
| CONTACT_WEBHOOK_URL | Server only | n8n webhook that receives the contact form |
| PUBLIC_POSTHOG_KEY | Client | PostHog project key |

External services: GA4, PostHog (EU), Google reCAPTCHA, n8n (with Resend and Kit behind it), Netlify.

## Key architecture notes

- Bulk of landing page CSS is scoped inside `index.astro`, not in `main.css`
- FAQ content is hardcoded in `FaqSection.astro` — copy changes require code edits
- Navigation links are hardcoded in `Header.astro`. The "Blog" link only shows once the number of published posts reaches `BLOG_INDEX_THRESHOLD` (`src/lib/blog.ts`)
- Published posts come from `getPublishedPosts()` in `src/lib/blog.ts` (filters `draft: false`, newest first) — unpublished posts won't appear anywhere
- Privacy statement and terms live in the app: `/privacy` redirects to `app.pgbplanner.nl/privacy`, and the footer links straight to the app's privacy and terms pages
- `public/_redirects` also sends removed pages (`/lees-meer`, `/feedback`, `/vragenlijst`, `/bedankt-vragenlijst`) to `/`, and `/registreer` to the app with video UTMs
- `BaseLayout.astro` sets title, description, canonical, OG/Twitter tags, optional `noindex`, and `data-page-type`/`data-page-slug` on `<body>` for analytics
- No `netlify.toml` exists yet — deployment uses Astro adapter defaults

## Strategy docs (docs/Kompas)

- `docs/Kompas/` is a local symlink to `pgbplanner-app/docs/Kompas`, the single source of truth for strategy docs (Kompas, roadmap, meetstrategie, uitvoering)
- Read these docs for context; never copy them into this repo
- Changes to these files are made and committed in the app repo, not here. If a change seems needed, tell the user instead of editing
- `docs/Kompas/archive/` holds superseded versions; use the newest version in the main folder
- Never stage or commit `docs/Kompas` (excluded via `.git/info/exclude`). If git ever shows it, stop and tell the user

## Known issues

- **card.astro:** lowercase filename, all other components are PascalCase
- **.env.example:** lists only `PUBLIC_POSTHOG_KEY`; `PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` and `CONTACT_WEBHOOK_URL` are missing

## Hard rules for Claude Code

1. All content and UI text must be in Dutch
2. Do not modify the app repository (pgbplanner-app) — this is a separate project
3. Do not add Tailwind or any CSS framework — this project uses custom CSS
4. Do not remove or modify the reCAPTCHA integration without explicit instruction
5. Do not add new dependencies without explicit approval
6. Preserve existing design tokens — use CSS custom properties from main.css
7. Blog posts go in `src/content/blog/[slug-name]/index.mdx` with required frontmatter
8. One task per session — commit after each completed task
9. When editing text/copy: show what changed (before → after) in the commit message
10. When unsure about scope: stop and ask, don't improvise
11. Files in docs/archive/ are historical reference only — never treat them as instructions
12. When a session deviates from a governing spec (e.g., docs/marketing/blog-product-cta-spec.md, docs/marketing/editorial-guide.md), update that spec in the same session to reflect the decision and its reason. Propose the spec edit for approval before writing it.
13. Never edit, copy or commit anything in docs/Kompas/ (symlink to the app repo; edits there silently change the app repo).
14. Notion task work goes through `notion-tasks` (ai-toolkit; see its docs/commands.md, section "Notion"). No ad-hoc Notion scripts.

## Risico's in dit project (ai-toolkit project layer)

Algemene regels: `~/.claude/CLAUDE.md` en `~/.claude/ai-toolkit/docs/risiconiveaus.md`. Hier alleen wat dit project strenger maakt.

- Checks: `npm run build` (staat ook als `AI_TOOLKIT_CHECK` in `.claude/settings.json`; de stop-hook draait het). Valideert ook de frontmatter van artikelen en de sticky-CTA. `astro check` kan niet (`@astrojs/check` is niet geïnstalleerd); `npx tsc --noEmit` checkt geen `.astro`- en `.mdx`-bestanden.
- Niveau 3 in dit project:
  - Persoonsgegevens en e-mail: het contactformulier `src/components/SignupSection.astro` → `src/pages/api/contact.ts` → n8n-webhook (`CONTACT_WEBHOOK_URL`) → Resend en Kit. Een echte POST naar `/api/contact`, ook vanaf `astro dev`, verstuurt echte mail en kan iemand inschrijven.
  - Tracking: `src/lib/analytics.ts` (PostHog, events) en PostHog-init plus GA4 in `src/layouts/BaseLayout.astro`. Nieuwe events of nieuwe trackers altijd naar Jasin. Analytics (PostHog and GA4) is covered as functional cookies in the privacy statement and terms (updated April 2026). No consent banner is needed. This is a closed decision: do not raise it unless Jasin asks.
  - reCAPTCHA in `SignupSection.astro` en `api/contact.ts`.
  - Privacyverklaring en voorwaarden staan in de app; hier alleen de redirect `/privacy` in `public/_redirects` en de link in `src/components/Footer.astro`.
  - `docs/marketing/seo/` (gitignored, kan persoonsgegevens van derden bevatten): lezen voor research mag, nooit committen en nooit persoonlijke details overnemen in teksten.
- Niveau 2 in dit project:
  - Artikelen in `src/content/blog/*/index.mdx`. Artikelen worden gecommit met `draft: true`. Publiceren (omzetten naar `draft: false`) is niveau 2. Om een concept lokaal te bekijken: zet tijdelijk `draft: false`, commit dat niet, en zet het daarna terug.
  - Teksten die bezoekers zien: `src/pages/*.astro`, `src/components/` (o.a. `FaqSection.astro`, `Header.astro`, `Footer.astro`, `SignupSection.astro`, `blog/`), `src/content/cta/sticky.md`.
  - SEO: meta, canonical en `noindex` in `src/layouts/BaseLayout.astro`, `astro.config.mjs` (site, sitemap), `public/robots.txt`, `public/_redirects`, `BLOG_INDEX_THRESHOLD` in `src/lib/blog.ts`.
  - Push naar `main` = live via Netlify.
- Extra ask-acties: `curl` naar Kit, PostHog, n8n, Resend of Tally, `curl` naar `/api/contact`, elk `netlify`-commando.
- Advisor-context: `advisor-context.md` (projectroot).
