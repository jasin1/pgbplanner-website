# Sitemap — PGB Planner Website

Overview of all pages, their URLs, purpose, and key dependencies.
This document is the source of truth for what exists on the website.
Update this file when pages are added, removed, or renamed.

---

## Public pages

### / (index.astro)
**Purpose:** Main landing page — hero, problem statement, audience cards, features, how-it-works steps, FAQ, newsletter signup
**Layout:** BaseLayout
**Key components:** SignupSection, FaqSection, FaqItem, Card, StepCard, Button, icon components
**External services:** Kit.com (newsletter form submission), reCAPTCHA v2
**Notes:** Bulk of page-specific CSS lives in scoped `<style>` block, not in main.css

### /vooruitblik/ (vooruitblik.astro)
**Purpose:** Compact product landing page for Vooruitblik (Facebook campaign `product-vooruitblik-okt26`, Oct 2026), basis for the later permanent product page. One action only: start the 21-day trial
**Layout:** BaseLayout (prerendered, `export const prerender = true`)
**Key components:** StepCard, FaqItem, CheckIcon
**Tracking:** existing `product_cta_clicked` via registration links, `position` = `hero` / `bottom` (plus `header`), `page_slug` = `/vooruitblik/`
**Notes:** Video and poster are served from `public/video/vooruitblik-16x9.mp4` and `public/video/vooruitblik-poster.jpg` (paths fixed in the page). FAQ items are page-specific and live in the page, not in FaqSection

### /lees-meer (lees-meer.astro)
**Purpose:** Extended "about PGB Planner" page with longer prose and CTAs
**Layout:** BaseLayout

### /privacy (privacy.astro)
**Purpose:** GDPR-compliant privacy policy (Dutch)
**Layout:** BaseLayout

---

## Blog

### /blog (blog/index.astro)
**Purpose:** Blog listing page — shows all published posts, fallback message if empty
**Layout:** BaseLayout
**Data source:** Content collection `blog`, filtered on `draft: false`

### /blog/[slug] (blog/[...slug].astro)
**Purpose:** Dynamic blog post renderer
**Layout:** BaseLayout → BlogPostLayout
**Data source:** Content collection `blog`
**Notes:** Posts live in `src/content/blog/[slug-name]/index.md` with optional assets (e.g. hero.jpg)

---

## Form flows

### /vragenlijst (vragenlijst.astro)
**Purpose:** Full-page Tally.so feedback form (iframe embed)
**Layout:** BaseLayout

### /bedankt (bedankt.astro)
**Purpose:** Thank-you page after newsletter signup — links to questionnaire
**Layout:** BaseLayout

### /bedankt-vragenlijst (bedankt-vragenlijst.astro)
**Purpose:** Thank-you page after completing the questionnaire
**Layout:** BaseLayout

### /bedankt-feedback (bedankt-feedback.astro)
**Purpose:** Thank-you page after completing a Tally feedback form from email — public page, user may or may not be logged in
**Layout:** BaseLayout

### /email-bevestigen (email-bevestigen.astro)
**Purpose:** Email verification confirmation screen (Kit.com double opt-in)
**Layout:** BaseLayout

---

## API routes

### POST /api/verify-recaptcha (api/verify-recaptcha.ts)
**Purpose:** Server-side reCAPTCHA v2 token verification with Google
**Auth:** None (public endpoint, validates token)
**Env vars:** RECAPTCHA_SECRET_KEY

---

## Layouts

### BaseLayout.astro
**Contains:** Full `<head>` (meta, OG tags, fonts, GA4 script), Header, skip-to-main link, `<main>` slot, Footer
**Props:** title (default: "PGB Planner"), description, ogImage

### BlogPostLayout.astro
**Contains:** Back link to /blog, article heading, Dutch-formatted date, article content slot, typography styles for rendered Markdown
**Props:** title, pubDate