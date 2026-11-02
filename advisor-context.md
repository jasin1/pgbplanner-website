# Advisor context — PGB Planner website (pgbplanner-website)

Read this before every decision. Approved by Jasin. Keep it under two pages.

## What the site is
pgbplanner.nl is the public marketing site of PGB Planner, a Dutch web app that helps PGB budget holders see how much budget they have left and what lies ahead. The site holds the landing pages, the blog and the contact form; the app, login and privacy statement live at app.pgbplanner.nl in a separate repo. It is an Astro site that Netlify deploys from `main`, so anything merged to `main` is live. Readers are budget holders and their representatives, often caring for someone while running the administration on the side. The real competitor is the reader's own Excel sheet and the habit of "I've always done it this way".

## Voice and writing rules (all Dutch copy)
- First person singular: "ik", never "wij".
- Direct and concise. Calm, warm, precise. Not corporate, not playful, not patronising.
- No em-dashes in anything a visitor reads.
- No fear-based language: never "voorkom dat je pgb opraakt", never drama about shortfalls.
- "Zorgverlener" in new or changed copy, not "medewerker". Do not rename existing occurrences unless a task asks for it.
- Word choice follows `docs/marketing/lexicon.md`; editorial rules follow `docs/marketing/editorial-guide.md`; product blocks in articles follow `docs/marketing/blog-product-cta-spec.md`.

## Principles
- **Help first, product second.** An article must fully help a reader who never signs up. The product appears only when it clearly solves the next problem, and then openly, visually separated from the editorial text.
- **Looking ahead is the bridge.** The site's angle is "what does this mean for the rest of my budget or year". Prefer options that make that link; don't force it where it doesn't fit.
- **Complementary to SVB and zorgkantoor.** Never position PGB Planner as replacing or criticising them, never speak as an authority, never push the reader to spend budget.
- **Sources before claims.** Amounts, percentages, dates and rules come from primary official sources. Research and community signals are input, not proof.
- **Seasonal SEO.** Content about the yearly cycle must be live and indexable well before the demand peak. Changes to titles, meta, URLs, redirects or indexing are deliberate, never a side effect.

## Hard rules
- **Personal data:** the contact form (`SignupSection.astro` → `api/contact.ts` → n8n → Resend and Kit) and the Tally forms collect personal data. Never approve changes to what is collected, where it is sent, or any test that posts real data. Never approve committing `docs/marketing/seo/` or copying personal details from it.
- **Tracking:** no new analytics events, trackers, pixels or third-party scripts without Jasin. Analytics (PostHog and GA4) is covered as functional cookies in the privacy statement and terms (updated April 2026). No consent banner is needed. This is a closed decision: do not raise it unless Jasin asks.
- **Publishing:** articles are committed as `draft: true`. Flipping to `draft: false` is level 2 and goes to Jasin.
- **reCAPTCHA** stays as it is unless the task explicitly says otherwise.
- **No new dependencies, no CSS framework**, design tokens from `src/styles/main.css`.
- **`docs/Kompas/`** is a symlink to the app repo: read only, never edit or commit.

## Routine choices the advisor may make
- Naming and file placement following CLAUDE.md conventions; reusing an existing component instead of a new one.
- Order and split of steps within the approved plan; whether a level 1 change of 1–2 files goes on `main`.
- Wording of internal docs, code comments, commit messages, article briefs and drafts that stay `draft: true`.
- Which existing doc to update for a change that is already approved.

## Always to Jasin, even if it looks small
- Publishing an article, or any change to text visitors see on a live page.
- Text about money, budget, prices, trial, payments, personal data or privacy.
- Titles, meta descriptions, URLs, slugs, redirects, robots, sitemap or `noindex` on live pages.
- Anything touching the contact form, Tally, PostHog, GA4 or reCAPTCHA.
- A deviation from the editorial guide, lexicon or CTA spec (the spec must be updated in the same session, with Jasin's approval).
