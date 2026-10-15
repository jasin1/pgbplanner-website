# Build: Vooruitblik product landing page (campaign 15 Oct 2026)

## Context

On Thursday 15 October 2026 (evening) I launch a product-focused Facebook campaign for the Vooruitblik feature of the PGB Planner app. The post links to a new, compact landing page on pgbplanner.nl. This page will later become the basis of the permanent product page, so build it cleanly, but keep it small.

Campaign rules:
- One action only: start the 21-day free trial. The button may appear more than once, but there is no second CTA (no newsletter, no "blijf op de hoogte", no contact form).
- A silent 30–45 second demo video (16:9) is embedded on the page.
- Measurement: visitors arrive with `utm_campaign=product-vooruitblik-okt26` and a per-group `utm_content`. I need to count unique product-CTA clickers in PostHog (website project), and the UTM parameters must reach the app signup page, because the app has its own PostHog project and there is no cross-domain stitching.

Constraints:
- Reuse existing layouts, components, design tokens and utility classes. Do not introduce new raw sizes, colours or values. If something truly does not exist yet, propose it in Phase 2 and wait.
- Do not change the homepage, the navigation or the blog.
- Never "allow all edits". Work in the phases below and stop where indicated.
- Do not commit, push or deploy. I deploy myself.

## Phase 1: Read-only audit (stop after the report)

Report, with file paths:

1. Which layout, section and component files the homepage uses (hero, steps, pricing, FAQ, buttons), and which of them can be reused as-is on a new page.
2. How the existing product CTA is tracked in PostHog today (event name, properties, where it is fired, e.g. the blog product CTA and homepage CTA). The new page must use the same event so it lands in the same funnel.
3. How the signup link to the app is built today (exact URL), and whether UTM parameters from the landing URL are already passed through to the app. If not, describe the smallest way to do it.
4. Where the pricing and trial facts live (price per month, trial length, "geen betaalgegevens"). Quote them exactly.
5. Where the homepage FAQ items live, and quote verbatim the items about: SVB, price, and security/privacy (if they exist).
6. Whether a route `/vooruitblik` already exists or conflicts with anything. Check sitemap and SEO component handling (title, description, canonical, Open Graph image).
7. How static assets (video, images) are served, and the best place for a ~5–15 MB MP4 plus a poster JPG.

Stop and wait for my response.

## Phase 2: Proposal (stop after the proposal)

Propose the page at `/vooruitblik`, with:
- File list (new and changed), and which existing components you reuse.
- Section order as specified below.
- The tracking implementation (same event as the existing product CTA, plus properties `cta_location` = `hero` or `bottom` and `page` = `vooruitblik`).
- The UTM passthrough to the app signup link.
- The video element: `<video>` with `muted`, `playsinline`, `autoplay`, `loop`, `controls`, `preload="metadata"`, a poster image, and a fixed aspect ratio so the layout does not jump. Must work in the Facebook in-app browser on iOS and Android.
- SEO: own title and description (below), indexable, canonical to itself, added to the sitemap, existing default Open Graph image unless an image is provided.

Stop and wait for my approval. Then apply edits one at a time, each with my confirmation.

## Page content

All Dutch copy below is VERBATIM. Do not translate, rephrase or "improve" it. Do not add em-dashes.

### SEO

```
Title: Vooruitblik: kom je uit met je pgb-budget? | PGB Planner
Description: Zie nu al wat er eind december overblijft van je pgb-budget, en wat er verandert als er iets verandert. 21 dagen gratis proberen, geen betaalgegevens nodig.
```

### Section 1: Hero

```
Kom je uit met je pgb-budget?

Met Vooruitblik zie je nu al wat er eind december overblijft. En wat er gebeurt als er iets verandert, voordat je het doorvoert.

[Knop] Probeer 21 dagen gratis

Geen betaalgegevens nodig. Stopt automatisch.
```

### Section 2: Video

Video file: `vooruitblik-16x9.mp4`. Poster: `vooruitblik-poster.jpg`. I will add both files to the location you propose in Phase 2. No caption.

### Section 3: Wat je ziet

```
Vooruit kijken, niet alleen terug

• Je resterende budget aan het eind van het jaar, op basis van je eigen planning.
• Wat een wijziging doet, zoals extra uren of een nieuw tarief, voordat je die doorvoert. Je administratie blijft zoals hij is.
• Het werkt naast het SVB-portaal, niet in plaats ervan.
```

### Section 4: Zo werkt het

```
In drie stappen

1. Vul je budget in en wat je al hebt besteed.
2. Voeg je zorgverleners toe, met hun tarief en werkgeverslasten.
3. Vul in Vooruitblik in hoeveel uur ze per week werken. Je ziet direct wat er overblijft.
```

### Section 5: Proefperiode en prijs

Reuse the existing pricing facts from the site (Phase 1, item 4). If they contradict this text, stop and report instead of choosing yourself:

```
21 dagen gratis proberen. Geen betaalgegevens nodig.
Daarna € 20 per maand, maandelijks opzegbaar.
```

### Section 6: Veelgestelde vragen

Reuse the three existing FAQ items about SVB, price and security verbatim (Phase 1, item 5). If one does not exist, report it; do not write new FAQ copy.

### Section 7: Afsluiting

```
Bekijk het voor je eigen budget

Ik heb PGB Planner gebouwd vanuit mijn eigen jaren als pgb-beheerder. Met Vooruitblik weet je op tijd waar je staat.

[Knop] Probeer 21 dagen gratis
```

## Phase 4: Verify (after the build)

Report:
1. Local build passes and the page renders at `/vooruitblik`.
2. Mobile check at 375 px width: no horizontal scroll, video keeps its aspect ratio, buttons are tappable.
3. Opening `/vooruitblik?utm_source=facebook&utm_medium=social&utm_campaign=product-vooruitblik-okt26&utm_content=test` and clicking both buttons: show the exact app URL the browser navigates to (UTM parameters included) and the PostHog event payload that fires.
4. A list of everything I must do before deploy (adding the video and poster files).
