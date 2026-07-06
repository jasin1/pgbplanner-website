⏺ Here's the full analysis report:

  ---
  PGB Planner Website — Project Analysis

  1. Tech Stack

  Astro: v5.12.8 — output: 'server' (SSR mode)
  Adapter: @astrojs/netlify v6.6.0 (serverless functions + API routes)
  CSS: Custom CSS only — no Tailwind. Global main.css + per-component <style> blocks
  TypeScript: extends astro/tsconfigs/strict, clientType: "astro/client", excludes dist/
  Fonts: Google Fonts — Inter (body), Lexend Deca (headings), BBH Sans Hegarty (decorative)

  package.json dependencies:
  {
    "dependencies": { "astro": "^5.12.8" },
    "devDependencies": { "@astrojs/netlify": "^6.6.0" }
  }

  Very lean — no UI library, no Tailwind, no MDX plugin, no image optimization library.

  astro.config.mjs:
  export default defineConfig({
    output: 'server',
    adapter: netlify(),
  });

  No extra integrations. Bare minimum config.

  ---
  2. Project Structure

  pgbplanner-website/
  ├── public/                         Static assets (images, logos, favicon)
  │   ├── Dashboard-*.{avif,jpg,webp} Hero images in 3 modern formats
  │   ├── main-logo-v2.svg
  │   ├── ico-logo.svg
  │   └── og.jpg
  │
  ├── src/
  │   ├── components/                 26 component files total
  │   │   ├── Header.astro
  │   │   ├── Footer.astro
  │   │   ├── SignupSection.astro
  │   │   ├── FaqSection.astro
  │   │   ├── FaqItem.astro
  │   │   ├── StepCard.astro
  │   │   ├── Card.astro              (lowercase filename: card.astro)
  │   │   ├── Button.astro
  │   │   ├── LogoWhite.astro
  │   │   ├── blog/
  │   │   │   └── BlogPostLayout.astro
  │   │   └── *Icon.astro             ~17 SVG icon components
  │   │
  │   ├── content/
  │   │   ├── config.ts               Content collection schema (Zod)
  │   │   └── blog/
  │   │       ├── 2026-02-rdah/
  │   │       │   ├── index.md        The only published post
  │   │       │   └── hero.jpg
  │   │       ├── _templates/
  │   │       │   └── blog-post.md    Template for future posts
  │   │       └── .obsidian/          Obsidian editor config (shouldn't be here)
  │   │
  │   ├── layouts/
  │   │   └── BaseLayout.astro        Root HTML wrapper for all pages
  │   │
  │   ├── pages/
  │   │   ├── index.astro
  │   │   ├── vragenlijst.astro
  │   │   ├── bedankt.astro
  │   │   ├── bedankt-vragenlijst.astro
  │   │   ├── email-bevestigen.astro
  │   │   ├── lees-meer.astro
  │   │   ├── privacy.astro
  │   │   ├── blog/
  │   │   │   ├── index.astro
  │   │   │   └── [...slug].astro
  │   │   └── api/
  │   │       └── verify-recaptcha.ts
  │   │
  │   ├── styles/
  │   │   └── main.css
  │   └── env.d.ts
  │
  ├── astro.config.mjs
  ├── package.json
  ├── tsconfig.json
  └── .env                            (gitignored — contains reCAPTCHA keys)

  ---
  3. Pages Inventory

  ┌───────────────────────────┬───────────────────────────┬─────────────────────────────────────────────────────────────────────┐
  │           File            │            URL            │                               Purpose                               │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ index.astro               │ /                         │ Full landing page — hero, problem, features, steps, FAQ, newsletter │
  │                           │                           │  signup                                                             │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ vragenlijst.astro         │ /vragenlijst              │ Embedded Tally.so feedback form in full-page iframe                 │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ bedankt.astro             │ /bedankt                  │ Thank-you after newsletter signup; links to questionnaire           │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ bedankt-vragenlijst.astro │ /bedankt-vragenlijst      │ Thank-you after completing the questionnaire                        │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ email-bevestigen.astro    │ /email-bevestigen         │ Email verification confirmation screen                              │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ lees-meer.astro           │ /lees-meer                │ "About PGB Planner" page with longer prose + CTAs                   │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ privacy.astro             │ /privacy                  │ GDPR-compliant privacy policy (Dutch)                               │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ blog/index.astro          │ /blog                     │ Blog listing; shows published posts, fallback if empty              │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ blog/[...slug].astro      │ /blog/[slug]              │ Dynamic blog post renderer via content collections                  │
  ├───────────────────────────┼───────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ api/verify-recaptcha.ts   │ POST                      │ Server endpoint — validates reCAPTCHA v2 token with Google          │
  │                           │ /api/verify-recaptcha     │                                                                     │
  └───────────────────────────┴───────────────────────────┴─────────────────────────────────────────────────────────────────────┘

  Layout used: All pages use BaseLayout.astro. Blog posts additionally wrap content in BlogPostLayout.astro.

  External embeds:
  - vragenlijst.astro — Tally.so iframe (tally.so/r/...)
  - index.astro — Google reCAPTCHA v2 widget script, Kit.com (ConvertKit) form submission
  - BaseLayout.astro — Google Analytics 4 (G-16D80VC6VQ) inline script, Google Fonts preconnect

  ---
  4. Components Inventory

  Layout & Navigation

  ┌───────────────────────────┬────────────────────────────────────────────────────────────────────────────┬─────────────────┐
  │         Component         │                                  Purpose                                   │     Used In     │
  ├───────────────────────────┼────────────────────────────────────────────────────────────────────────────┼─────────────────┤
  │ Header.astro              │ Sticky nav bar with hamburger menu + IntersectionObserver for active links │ BaseLayout      │
  ├───────────────────────────┼────────────────────────────────────────────────────────────────────────────┼─────────────────┤
  │ Footer.astro              │ Dark footer with grid layout (links, contact, social)                      │ BaseLayout      │
  ├───────────────────────────┼────────────────────────────────────────────────────────────────────────────┼─────────────────┤
  │ blog/BlogPostLayout.astro │ Blog article wrapper with back-link, title, date                           │ [...slug].astro │
  └───────────────────────────┴────────────────────────────────────────────────────────────────────────────┴─────────────────┘

  Form & Interactive

  ┌─────────────────────┬───────────────────────────────────────────────────────────────────────────┬──────────────────┐
  │      Component      │                                  Purpose                                  │     Used In      │
  ├─────────────────────┼───────────────────────────────────────────────────────────────────────────┼──────────────────┤
  │ SignupSection.astro │ Full newsletter signup: name, email, PGB type, tester checkbox, reCAPTCHA │ index.astro      │
  ├─────────────────────┼───────────────────────────────────────────────────────────────────────────┼──────────────────┤
  │ Button.astro        │ Generic button with variant (primary/secondary) and type props            │ Multiple pages   │
  ├─────────────────────┼───────────────────────────────────────────────────────────────────────────┼──────────────────┤
  │ FaqSection.astro    │ Container rendering 8 hardcoded FAQ items                                 │ index.astro      │
  ├─────────────────────┼───────────────────────────────────────────────────────────────────────────┼──────────────────┤
  │ FaqItem.astro       │ <details>/<summary> accordion item                                        │ FaqSection.astro │
  └─────────────────────┴───────────────────────────────────────────────────────────────────────────┴──────────────────┘

  Content Display

  ┌────────────────┬─────────────────────────────────────────────────┬────────────────────────────────┐
  │   Component    │                     Purpose                     │            Used In             │
  ├────────────────┼─────────────────────────────────────────────────┼────────────────────────────────┤
  │ card.astro     │ Card with icon slot, title, description         │ index.astro (audience section) │
  ├────────────────┼─────────────────────────────────────────────────┼────────────────────────────────┤
  │ StepCard.astro │ Numbered step card with optional connector line │ index.astro (how-it-works)     │
  └────────────────┴─────────────────────────────────────────────────┴────────────────────────────────┘

  Icon Components (~17 SVG files)

  All inline SVG components with optional size prop. Present: AlertIcon, ArrowDown, PrognoseIcon, CalendarIcon, WorkersIcon,
  BudgetIcon, StatsIcon, CogIcon, CheckIcon, ParentsIcon, HouderIcon, ProsIcon, PaperIcon, LogoWhite, HeartIcon, InstaIcon, FbIcon,
  and a few others.

  ---
  5. Layouts

  BaseLayout.astro

  Props: title (default: "PGB Planner"), description (default: "Welkom bij PGB Planner."), ogImage (default: "/og.jpg")

  Contains:
  - Full <head>: charset, viewport, canonical URL, Open Graph (nl_NL locale), Twitter Card
  - Google Fonts preconnect + import (Inter, Lexend Deca, BBH Sans Hegarty)
  - GA4 script (G-16D80VC6VQ) inline
  - <Header /> — skip-to-main link — <main id="main"><slot /></main> — <Footer />

  BlogPostLayout.astro

  Props: title: string, pubDate: Date

  Contains:
  - Back link → /blog/
  - Article heading + Dutch-formatted date (nl-NL locale)
  - <article class="article-content"><slot /></article>
  - Typography styles for rendered Markdown (h2–h4, links, lists, blockquotes, code, tables)

  ---
  6. Content & Data

  Content Collection: blog

  Schema (src/content/config.ts):
  z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
    heroAlt: z.string().optional(),
  })

  Note: draft: true is the default — you must explicitly set draft: false to publish.

  Existing Posts

  ┌──────────────┬─────────────────────────────────────────────────────────────┬────────────┬───────┐
  │     Slug     │                            Title                            │    Date    │ Draft │
  ├──────────────┼─────────────────────────────────────────────────────────────┼────────────┼───────┤
  │ 2026-02-rdah │ "Rdah-wijziging 2026: wat betekent dit voor jouw PGB dude?" │ 2026-02-23 │ false │
  └──────────────┴─────────────────────────────────────────────────────────────┴────────────┴───────┘

  This post has a hero.jpg and uses H2/H3 headers, lists, blockquotes, and tables. Despite being the only "published" post, the
  content reads as placeholder/test content ("dude" in the title is likely unintentional).

  There's also a _templates/blog-post.md template with boilerplate Dutch section headings.

  src/content/blog/.obsidian/

  Obsidian editor config directory committed to the repo. Not harmful but shouldn't be in version control — should be gitignored.

  ---
  7. Styling

  Global CSS (src/styles/main.css)

  CSS Custom Properties (design tokens):

  ┌───────────────────┬─────────────────────────────┬───────────────────────────────┐
  │       Token       │            Value            │              Use              │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-primary   │ #265284                     │ Dark blue — headings, CTAs    │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-secondary │ #4baa96                     │ Teal — accents, links         │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-l-blue    │ #3b73b4                     │ Light blue                    │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-bg        │ #f9f2ea                     │ Warm beige — page background  │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-bg-icon   │ #dbeeea                     │ Light cyan — icon backgrounds │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-black     │ #414040                     │ Body text                     │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-body-text │ #4b5563                     │ Secondary text                │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-alert     │ #e27a7a                     │ Red — problem/alert icons     │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-orange    │ #ed9008                     │ Highlights                    │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --color-form-btn  │ #02007f                     │ Form submit button            │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --font-primary    │ Inter                       │ Body                          │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --font-heading    │ Lexend Deca                 │ Headings                      │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --container-w     │ 1200px                      │ Max content width             │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --radius          │ 12px                        │ Border radius                 │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --header-h        │ 72px                        │ Header height offset          │
  ├───────────────────┼─────────────────────────────┼───────────────────────────────┤
  │ --shadow-soft     │ 0 4px 12px rgba(0,0,0,0.06) │ Card shadows                  │
  └───────────────────┴─────────────────────────────┴───────────────────────────────┘

  Responsive breakpoints: 400px, 480px, 640px, 768px, 1024px, 1280px+

  Typography scale: Fluid with clamp() — h1: clamp(1.8rem, 4.5vw, 2.5rem), down to h6: 0.8rem

  Utility classes: .container, .container-large, .container-small, .container-block, .btn-primary, .btn-secondary, .flex-center,
  .cta-block, etc.

  Accessibility: .skip-link, @media (prefers-reduced-motion: reduce), focus ring styles

  Component-Scoped Styles

  All 26 components have <style> blocks. Notably:
  - Header.astro: backdrop-blur sticky header, hamburger animation, slide-down mobile menu
  - SignupSection.astro: two-column responsive form layout, custom select styling
  - index.astro: extensive scoped styles for every landing page section (the bulk of layout CSS lives here, not in main.css)

  ---
  8. Deployment & Config

  Platform: Netlify (via @astrojs/netlify adapter)
  Mode: SSR (output: 'server') — enables serverless API routes

  No netlify.toml — deployment relies entirely on Astro adapter defaults.
  No _redirects or _headers files.

  Environment Variables (.env, gitignored):
  PUBLIC_RECAPTCHA_SITE_KEY=6Ld...  ← exposed to client (correct)
  RECAPTCHA_SECRET_KEY=6Ld...       ← server-only (correct)

  .gitignore correctly excludes: dist/, .astro/, node_modules/, .env, .env.production, .netlify, .DS_Store

  Build scripts:
  "dev": "astro dev"
  "build": "astro build"
  "preview": "astro preview"

  ---
  9. Things That Stand Out

  Bugs

  1. Typo in FaqItem.astro: CSS selector .faq-tem[open] (missing i) — should be .faq-item[open]. Appears twice (lines ~50 and ~62).
  The FAQ open state animation is broken.
  2. CSS naming inconsistency in StepCard.astro: Uses .stepcard_badge, .stepcard_number, .stepcard_desc (single underscore) while
  BEM convention would be double underscore. Not a bug but inconsistent with the rest of the codebase.
  3. card.astro filename is lowercase while all other components are PascalCase (Button.astro, Header.astro, etc.). Minor but
  inconsistent.
  4. // @ts-ignore in Header.astro — suppresses TypeScript errors in the IntersectionObserver script block instead of properly
  typing it.

  Placeholder / Incomplete Content

  5. Blog post title has "dude" in it: "...wat betekent dit voor jouw PGB dude?" — almost certainly an accidental leftover from
  drafting.
  6. Only one blog post exists and it reads as test/draft content despite draft: false. The blog listing page will show this to
  visitors.
  7. src/content/blog/.obsidian/ — Obsidian editor config directory should not be in the repository. Add
  /src/content/blog/.obsidian/ to .gitignore.

  Architecture Notes

  8. Bulk of landing page CSS is scoped inside index.astro rather than main.css. This makes sense for Astro's scoping model, but
  means the index page carries an unusually large <style> block. Worth noting when maintaining.
  9. FAQ content is hardcoded in FaqSection.astro — 8 questions baked into the component. Not content-managed. Any copy changes
  require a code edit.
  10. Navigation links are hardcoded in Header.astro — same issue.
  11. No netlify.toml means no control over build settings, redirects, HTTP headers (security headers like CSP, HSTS, etc.), or
  deploy contexts. Worth adding.
  12. GA4 is inline in BaseLayout.astro with no consent gate — in the Dutch market (GDPR), loading analytics without explicit
  consent is non-compliant. The privacy policy mentions it, but there's no cookie banner or consent mechanism in the code.
  13. No <noscript> fallback for the signup form — if JS is disabled, reCAPTCHA won't load and the form won't submit.
  14. dist/ and .netlify/ folders should not be committed — but per the .gitignore they are excluded, so this is fine as long as
  they weren't force-added at some point.
  15. src/env.d.ts exists but may be redundant — Astro 5 handles env types automatically. Worth checking if it's adding anything
  meaningful.

✻ Baked for 3m 23s