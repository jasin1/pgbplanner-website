# Read-only website audit — pgbplanner-website

**Date:** 2026-07-06
**Note:** This is a read-only audit snapshot — a point-in-time report of the codebase as it existed on this date. No files were modified as part of producing this report.

---

**Mode:** read-only. No files were modified, created, or deleted. No commands beyond `find`/`grep`/`cat` were run.

---

## Q1 — Homepage meta tags: do they exist, and what do they say?

**Yes, they exist**, defined in two places:

**1. Shared defaults** in `src/layouts/BaseLayout.astro:6-10` (props with fallback defaults):
```
title = "PGB Planner"
description = "Welkom bij PGB Planner."
ogImage = "/og.jpg"
```
This same component builds canonical URL, Open Graph (`og:type`, `og:site_name`, `og:locale=nl_NL`, `og:title`, `og:description`, `og:url`, `og:image` + width/height/alt), and Twitter Card (`summary_large_image`) tags — all derived from the `title`/`description`/`ogImage` props passed in per-page. There is no separate SEO/Head component or config file; it's all inline in `BaseLayout.astro:19-52`.

**2. Per-page override** for the homepage, in `src/pages/index.astro:25`:
```astro
<BaseLayout title="PGB Planner" description="PGB Planner is een praktische online tool in ontwikkeling die je helpt je PGB overzichtelijk en zonder stress te beheren. Meld je aan voor updates.">
```

**Verdict: yes, the homepage description still contains pre-launch language** — "een praktische online tool **in ontwikkeling**" (a tool *in development*) and "**Meld je aan voor updates**" (sign up for updates). The `og:image:alt` in BaseLayout also says "Voorbeeldafbeelding bij gedeelde link" (generic placeholder alt text, not product-specific — probably fine to keep, but worth reviewing).

No page in the repo sets a custom `ogImage`; every page uses the `/og.jpg` default.

---

## Q2 — Current footer, and which supporting pages exist?

Footer is `src/components/Footer.astro`, shared via `BaseLayout.astro:83`, present on **every page** site-wide.

**Structure and verbatim text:**
- Logo (`<LogoWhite />`) linking to `/`
- Tagline: `"Overzicht en grip op je PGB,<br />zonder gedoe."` (Footer.astro:12-14)
- Contact block: `"Vragen? Mail ons op"` → `info@pgbplanner.nl` (mailto link)
- Footer nav (in-page anchors only): `Over` (#over), `Preview` (#preview), `Hoe het werkt` (#hoe), `Meld je aan` (#aanmelden), `FAQ` (#faq)
- Bottom bar copyright: `"© 2025 PGB Planner. Alle rechten voorbehouden."` (Footer.astro:41) — **note: says 2025, not 2026**
- Legal links: only `Privacyverklaring` → `/privacy`
- **No KvK number anywhere** in the footer or site (confirmed via grep — no hits for "KvK"/"kvk")

**Linked pages — existence check:**

| Link | Route | Exists? |
|---|---|---|
| Privacyverklaring | `/privacy` | ✅ Exists — `src/pages/privacy.astro` |
| Algemene voorwaarden | *(not linked anywhere in footer/site)* | ❌ No route exists, no link either |
| Cookies | *(not linked)* | ❌ No route exists. `privacy.astro:64-77` explicitly states "we gebruiken **nog geen** cookies of analytics" — despite GA4 already running in `BaseLayout.astro:60-75`. This is a factual mismatch between the privacy policy and actual behavior. |
| Contact | *(no dedicated page, only mailto link)* | ⚠️ No `/contact` route — contact is handled via footer's `mailto:info@pgbplanner.nl` link only |
| Login | *(not present anywhere in the site)* | ❌ No login link in Header or Footer. No reference to `app.pgbplanner.nl` anywhere in the codebase. |

---

## 3. Project structure

- **Astro version:** 5.12.8 (`package.json:12`), SSR mode (`output: 'server'` in `astro.config.mjs`)
- **Adapter:** `@astrojs/netlify` v6.6.0 (dev dependency)
- **Config:** `astro.config.mjs` is minimal — no extra integrations, just the Netlify adapter
- **Dev server:** `npm run dev` → `astro dev` (default port 4321). Build: `npm run build`. Preview: `npm run preview`.
- **Key directories:** `src/components/` (26 files + `blog/` subfolder), `src/content/blog/` (Content Collections), `src/layouts/`, `src/pages/` (file-based routing, including `pages/api/verify-recaptcha.ts` as a server endpoint), `src/styles/main.css`
- **No `netlify.toml`** — deployment relies entirely on Astro/Netlify adapter defaults, no custom redirects/headers config exists

---

## 4. Homepage composition

Single file: **`src/pages/index.astro`** renders the whole homepage. It imports and assembles components in this order, with copy **inline in the `.astro` file** for most sections (not in a content collection, data file, or config):

| Section (brief mapping) | File | Copy location |
|---|---|---|
| Hero | `index.astro:27-70` | Inline JSX-like markup in `index.astro` |
| Probleem/Excel ("Een PGB beheren is geen makkelijke taak") | `index.astro:71-113` | Inline in `index.astro` |
| Features ("Daarom bouw ik PGB Planner") | `index.astro:114-175` | Inline in `index.astro` |
| Waarschijnlijk bedoeld als "waarom naast SVB" | *(does not exist as a distinct section — no SVB-specific content block found anywhere on the homepage)* | — |
| CTA block ("Blijf op de hoogte van PGB Planner") | `index.astro:176-195` | Inline in `index.astro` |
| Preview ("Een eerste blik op PGB Planner") | `index.astro:196-215` | Inline in `index.astro` |
| Voor wie ("Voor wie is PGB Planner bedoeld?") | `index.astro:216-247`, using `card.astro` | Card titles/descriptions inline in `index.astro`, rendered via `<Card>` |
| Zo werkt het ("Zo werkt het **straks**") | `index.astro:248-302`, using `StepCard.astro` | Inline in `index.astro` |
| FAQ | `<FaqSection />` component call at `index.astro:304` | Copy lives in **`src/components/FaqSection.astro:4-47`** as a hardcoded JS array (`faqs`), not in `index.astro` itself |
| Signup/newsletter (also functions as a second "Blijf op de hoogte" CTA) | `<SignupSection />` at `index.astro:306` | Copy hardcoded inside **`src/components/SignupSection.astro`** |

**Important for implementation:** there is **no dedicated "vertrouwensblok" (trust block) section** on the current live homepage — the marketing doc's planned trust block does not exist yet in code, it will be new. Similarly, there is no distinct "waarom naast SVB" section currently — the closest existing content is the generic "Daarom bouw ik PGB Planner" features section, but it doesn't address SVB at all.

**Where copy lives, summarized:** almost entirely **inline in `.astro` files**, except FAQ (hardcoded array in `FaqSection.astro`) and the newsletter form copy (hardcoded in `SignupSection.astro`). No content collection, JSON, or config file holds any homepage copy.

---

## 5. Navbar / header

- **File:** `src/components/Header.astro`, imported once in `BaseLayout.astro:3` and rendered at `BaseLayout.astro:78` — so yes, it's a single shared component across every page (homepage, blog, all standalone pages).
- **Nav items** (`Header.astro:12-17`, hardcoded array):
  ```js
  { label: "Over", id: "over" }
  { label: "Preview", id: "preview" }
  { label: "Hoe het werkt", id: "hoe" }
  { label: "FAQ", id: "faq" }
  ```
  All four are in-page anchor links (`#id` or `/#id` depending on current path via `getSectionLink()`), **not routes**. **No "Blog" nav item exists** — the blog is not linked from the header at all.
- **"Blijf op de hoogte" appears twice** in the header:
  - Mobile menu CTA: `Header.astro:111` — `<a class="btn primary" href={getSectionLink('aanmelden')}>Blijf op de hoogte</a>`
  - Desktop CTA (outside the menu, right-aligned): `Header.astro:116` — same text, same target (`#aanmelden`, which scrolls to `SignupSection.astro`)
- **No login link** anywhere in the header.

---

## 6. CTA implementation

**Where the primary CTA currently points:** every primary CTA site-wide points to `#aanmelden` (or `/#aanmelden` from non-homepage pages) — the in-page anchor on `SignupSection.astro`. This includes: Header desktop CTA, Header mobile CTA, homepage hero CTA (`index.astro:37`), homepage mid-page CTA block (`index.astro:186`), and the "Voor wie" CTA (`index.astro:242`). None of them point to `app.pgbplanner.nl` — that domain is **not referenced anywhere** in the codebase (confirmed via grep across `src/`).

**How signup currently works** (`src/components/SignupSection.astro`):
- It's a **Kit.com (ConvertKit) form**, POSTing to `https://app.kit.com/forms/8738389/subscriptions` (`SignupSection.astro:75`)
- Fields: `first_name`, `email_address`, a `fields[waitlist_pgb_type]` select (WLZ/WMO/Jeugdwet/Anders), a hidden `tags[]=Waitlist` tag, and a hidden `redirect_url=https://pgbplanner.nl/bedankt`
- Client-side JS (`SignupSection.astro:137-282`) intercepts submit, requires a Google reCAPTCHA v2 checkbox, verifies it server-side via `POST /api/verify-recaptcha` (`src/pages/api/verify-recaptcha.ts`), then submits the form itself (cross-origin to Kit, so it falls through to a native `form.submit()`)
- Separately, `src/pages/vragenlijst.astro` embeds a **Tally.so** iframe for a longer questionnaire, with its own thank-you page at `/bedankt-vragenlijst`

**What would need to change for a trial-first primary CTA to `app.pgbplanner.nl`:**
1. Replace every `href="#aanmelden"` / `href="/#aanmelden"` CTA (Header ×2, hero, mid-page CTA block, "Voor wie" CTA) with a link to `app.pgbplanner.nl` (presumably a signup/trial route on that domain — not visible from this repo)
2. Decide whether `SignupSection.astro` (Kit form) is demoted to a secondary "stay updated" block (per the copy doc's plan) or removed from the homepage entirely
3. Update `Header.astro`'s nav array to add an "Inloggen" text link if desired (not currently present)
4. `bedankt.astro` (redirect target from Kit) currently assumes the visitor is a newsletter subscriber ("We houden je op de hoogte...") — its copy would need to change if the Kit form's purpose changes

---

## 7. Blog

- **Overview page:** `src/pages/blog/index.astro` — fetches the `blog` content collection via `getCollection("blog")`, filters `!p.data.draft`, sorts by `pubDate` descending, renders a simple `<ul>` of title/date/description. Falls back to `"Er zijn nog geen artikelen gepubliceerd."` if empty. Uses **`BaseLayout`** directly (own inline `<section>`, no dedicated list-layout component).
- **Article template:** `src/pages/blog/[...slug].astro` — `getStaticPaths()` builds one route per non-draft post; renders `BaseLayout` wrapping **`BlogPostLayout.astro`** (`src/components/blog/BlogPostLayout.astro`), which shows a back-link, title, formatted Dutch date, and a `<slot />` for the Markdown content. If a post is a draft or missing, it redirects to `/blog/`.
- **Header:** blog pages use **the same shared `Header`/`Footer`** as the rest of the site — because both `blog/index.astro` and `[...slug].astro` wrap content in `BaseLayout`, which always renders `<Header />` and `<Footer />`. There is no blog-specific header.
- **Nav visibility:** **not linked from the main nav** (`Header.astro`'s `nav` array has no Blog entry — confirmed above). It's reachable only by direct URL.
- **Visible/gated:** not gated — any post with `draft: false` in frontmatter is publicly listed and rendered. Currently there is exactly **one published post**: `src/content/blog/2026-02-rdah/index.md` (`draft: false`, `pubDate: 2026-02-23`), titled *"Rdah-wijziging 2026: wat betekent dit voor jouw PGB dude?"*. Its body is Lorem-ipsum placeholder text with one stray word "dude" in the title — this looks like unpublished/test content that is nonetheless live and publicly reachable at `/blog/2026-02-rdah/` (and listed on `/blog`) since `draft: false`.
- There's also `src/content/blog/_templates/blog-post.md`, a blank frontmatter template (`draft: true`) for future posts.
- **Uncommitted local changes** (per `git status`) currently touch `2026-02-rdah/index.md`, `blog/[...slug].astro`, and `blog/index.astro` — these are in-progress edits not yet committed, outside the scope of this read-only audit.

---

## 8. Shared components / blast radius

Everything funnels through **`BaseLayout.astro`**, imported by every single page in `src/pages/` (confirmed: `index`, `lees-meer`, `privacy`, `vragenlijst`, `bedankt`, `bedankt-vragenlijst`, `email-bevestigen`, `feedback`, `blog/index`, `blog/[...slug]`). It unconditionally renders:

- **`<Header />`** — shared everywhere. A header/CTA copy or link change ripples to **every page on the site**, including the blog.
- **`<Footer />`** — same, shared everywhere.
- **Meta tags / SEO** — shared logic, but `title`/`description` values are passed per-page as props, so content differs per page even though the *mechanism* is shared.

Additional shared building blocks used **only on the homepage**: `Button.astro`, `card.astro`, `StepCard.astro`, `FaqSection.astro` (+ `FaqItem.astro`), `SignupSection.astro`, and the icon components (`AlertIcon`, `ParentsIcon`, `HouderIcon`, `ProsIcon`, etc.) — none of these are reused on the blog or other standalone pages, so changing them is homepage-scoped.

**Blast-radius takeaway:** a Header or Footer text/link change affects the homepage, the blog, and every standalone page in one edit — low risk technically (one file each) but high visibility (touches all routes). A CTA copy change confined to `SignupSection.astro`/`FaqSection.astro`/homepage inline sections only affects the homepage.

---

## 9. Docs inventory

| File | Contents (brief) |
|---|---|
| `CLAUDE.md` (repo root, currently untracked per `git status`) | Full project overview: tech stack, structure, design tokens, content rules, known issues, hard rules for Claude Code |
| `README.md` | Default, unedited Astro "minimal" starter template boilerplate — not project-specific at all |
| `docs/design-tokens.md` | Duplicates the design-token table from CLAUDE.md, plus utility classes and accessibility notes. **Has a formatting defect**: after its closing `---`, the file contains a leftover fragment of what looks like a pasted chat transcript ("Dat zijn alle drie de bestanden...") including a stray reference to a `docs/sitemap.md` file that **does not exist** in the repo |
| `docs/faq-review.md` | An earlier draft/reference version of FAQ copy for review — explicitly says "Do not edit FaqSection.astro yet," and its content **differs from what's live** in `FaqSection.astro` today (e.g., different Q1/Q2 wording) |
| `docs/marketing/homepage-copy-master.md` | The live sprint doc driving this whole exercise: frozen (APPROVED) new copy for Hero, "Waarom naast SVB," Probleem/Excel, Vertrouwensblok, Voor wie, Zo werkt het, CTA's, FAQ, plus decision log. Meta descriptions and Footer are still marked **STATUS: TODO** in that doc. It references a `docs/brand/brand-voice.md` file that **does not exist yet** (noted in the doc itself as "groeit mee met de sprint" — not yet created) |
| `docs/prompts/prompt-bedankt-feedback-page.md` | A one-off task prompt (already executed?) for a `/bedankt-feedback` page. **That page does not currently exist** in `src/pages/` — only `feedback.astro` exists (a Tally embed at `/feedback`, unrelated route/purpose), so this prompt appears not to have been implemented, or was implemented differently |
| `docs/prompts/website-readonly-audit.md` | This very audit's instructions |
| `docs/archive/project-analysis-2026-04-01.md` | A prior full project-analysis report (dated April 2026) — per CLAUDE.md, treated as historical reference only, not instructions. Its findings substantially overlap with this audit (same known bugs: `.faq-tem[open]` typo, `card.astro` lowercase, `.obsidian/` in repo, no consent gate for GA4) |

**Notably missing:**
- No `docs/sitemap.md` despite being referenced twice (`design-tokens.md`, `prompt-bedankt-feedback-page.md`)
- No `docs/brand/brand-voice.md` despite being referenced in the copy-master doc as auto-read by Claude Code
- No architecture/ADR docs beyond the archived one-off analysis
- No `netlify.toml` or deployment docs
- README.md is unmodified starter boilerplate — no project-specific setup instructions

---

## 10. Remaining pre-launch language — full inventory

Every location found in `src/` (searched for: binnenkort, in ontwikkeling, blijf op de hoogte, betafase, wachtlijst, meld je aan, opstartfase, testversie, "eerste gebruikers", "wordt getest", "wordt jouw", straks, and variants):

| File | Line | Verbatim text |
|---|---|---|
| `src/pages/index.astro` | 25 | `description="PGB Planner is een praktische online tool **in ontwikkeling** die je helpt je PGB overzichtelijk en zonder stress te beheren. **Meld je aan voor updates**."` |
| `src/pages/index.astro` | 29 | `<span class="font-color-primary">**Binnenkort:**</span>` (hero headline prefix) |
| `src/pages/index.astro` | 33 | `PGB Planner **wordt jouw** complete online omgeving voor budgetbeheer!` |
| `src/pages/index.astro` | 37 | `<a href="/#aanmelden" class="btn btn-primary">**Blijf op de hoogte**</a>` (hero CTA) |
| `src/pages/index.astro` | 179 | `<h2>**Blijf op de hoogte**<br />van PGB Planner</h2>` (mid-page CTA block) |
| `src/pages/index.astro` | 181-183 | `PGB Planner is volop **in ontwikkeling** en **wordt** op dit moment **getest door de eerste gebruikers**. We werken hard aan de lancering, die **binnenkort** gepland staat. Laat je gegevens achter en je hoort als eerste wanneer PGB Planner beschikbaar is.` |
| `src/pages/index.astro` | 186-187 | `<a class="btn btn-primary cta-desktop" href="#aanmelden">**Houd mij op de hoogte**</a>` |
| `src/pages/index.astro` | 202 | `...hoe overzichtelijk en praktisch PGB Planner **straks wordt**.` (Preview section) |
| `src/pages/index.astro` | 242-244 | `<a class="btn btn-primary cta-desktop" href="#aanmelden">**Meld je direct aan**</a>` ("Voor wie" CTA) |
| `src/pages/index.astro` | 251 | `<h2 class="h2">Zo werkt het **straks**</h2>` |
| `src/components/Header.astro` | 111 | `<a class="btn primary" href={getSectionLink('aanmelden')}>**Blijf op de hoogte**</a>` (mobile menu CTA) |
| `src/components/Header.astro` | 116 | `<a class="btn primary cta-desktop" href={getSectionLink('aanmelden')}>**Blijf op de hoogte**</a>` (desktop CTA) |
| `src/components/Footer.astro` | 35 | `<li><a href="#aanmelden">**Meld je aan**</a></li>` |
| `src/components/SignupSection.astro` | 10 | `<h2>**Blijf op de hoogte**<br />van PGB Planner</h2>` |
| `src/components/SignupSection.astro` | 12-14 | `PGB Planner **wordt** op dit moment **getest door de eerste gebruikers** en de lancering staat **binnenkort** gepland. Laat je gegevens achter en je hoort als eerste wanneer je aan de slag kunt.` |
| `src/components/FaqSection.astro` | 6-8 | Q: `"Wanneer komt PGB Planner beschikbaar?"` A: `"PGB Planner wordt op dit moment getest door de eerste gebruikers. We werken hard aan de lancering, die binnen de komende maanden gepland staat. Laat je gegevens achter en je hoort als eerste wanneer je aan de slag kunt."` |
| `src/components/FaqSection.astro` | 11-13 | Q: `"Kan ik mij aanmelden?"` A: `"Ja. Via het formulier op deze pagina kun je je aanmelden. Je hoort dan als eerste wanneer PGB Planner beschikbaar is."` |
| `src/components/FaqSection.astro` | 23-25 | Q: `"Is PGB Planner gratis?"` A: `"PGB Planner is tijdens de **betafase** gratis te gebruiken. Na de lancering wordt het een betaalde dienst met een toegankelijk maandelijks abonnement. Exacte prijzen worden **binnenkort** bekendgemaakt."` |
| `src/pages/lees-meer.astro` | 12-13 | `PGB Planner is een nieuwe, praktische tool **in ontwikkeling** die jou helpt om grip te houden op je PGB.` |
| `src/pages/lees-meer.astro` | 37-38 | `We zitten nu in de **opstartfase**, de tool is nog niet af, maar we bouwen hard door.` |
| `src/pages/lees-meer.astro` | 42-44 | `Wil je meedenken of gewoon **op de hoogte blijven** van de lancering? Laat dan je e-mailadres achter of vul de vragenlijst in.` |
| `src/pages/privacy.astro` | 27-28 | `PGB Planner is op dit moment nog **in ontwikkeling** en wordt begin 2026 officieel als eenmanszaak geregistreerd.` |
| `src/pages/privacy.astro` | 85-87 | `Het versturen van updates over PGB Planner (zoals nieuws of **uitnodigingen om te testen**)` |
| `src/pages/bedankt.astro` | 5, 14 | Title: `"Bedankt voor het aanmelden"`; body: `"We houden je op de hoogte van het laatste nieuws over PGB Planner."` |
| `src/pages/bedankt-vragenlijst.astro` | 5, 17-18 | Title: `"Bedankt voor het aanmelden"`; body: `"Zodra de eerste **testversie** klaar is, krijg je als een van de eersten een update."` |

Not found: "nieuwsbrief" (already removed per recent commit history — none remaining), literal "wachtlijst" string (though `tags[]` value in `SignupSection.astro:78` is `value="Waitlist"`, an English-language hidden form tag sent to Kit — not visible copy but functionally the same waitlist framing, worth flagging).

**`docs/faq-review.md`** also still contains old pre-launch draft language (e.g., "testversie", "testfase") but per CLAUDE.md, docs are reference material, not live copy — flagged for awareness, not action.

---

## Open questions for Jasin

- **Trial CTA target URL is unknown.** No route/path on `app.pgbplanner.nl` is referenced anywhere in this repo — what exact URL should the "Probeer 21 dagen gratis" CTA point to (e.g., `/signup`, `/trial`, `/register`)?
- **`docs/prompts/prompt-bedankt-feedback-page.md`** describes a `/bedankt-feedback` page that doesn't exist in `src/pages/`. Was this task abandoned, or was `feedback.astro` (a different route/purpose — a Tally embed at `/feedback`) meant to fulfill it instead?
- **`docs/sitemap.md`** is referenced twice but doesn't exist — should it be created, or are the references themselves stale?
- **Contact and Cookies pages**: neither exists, yet the audit prompt asks to check them as "supporting pages." Are these in scope for the upcoming copy sprint, or explicitly out of scope (per the copy-master doc, footer is still TODO)?
- **`/blog/2026-02-rdah`** is currently live (`draft: false`) with Lorem-ipsum placeholder content and "dude" in the title — should this be set back to `draft: true` before/independent of the copy sprint, regardless of the "make blog visible in nav once a real article exists" plan?
- **Footer copyright year** reads "© 2025" — is that an oversight to fix as part of the footer TODO, or intentional?
- **`SignupSection.astro`'s hidden `tags[]` value is literally `"Waitlist"`** (sent to Kit.com) — if the newsletter block becomes secondary/non-waitlist framing, should this tag also change, or does it only affect internal Kit segmentation (no visible copy impact)?
