# Polish: Vooruitblik landing page before launch (15 Oct 2026)

## Context

`src/pages/vooruitblik.astro` was built on 14 Oct (see `docs/prompts/2026-10-14-vooruitblik-landingspagina.md`). The Facebook campaign goes live today between 16:00 and 18:00. The single goal of this page is getting visitors to click through to registration (`app.pgbplanner.nl/registreer`). These are small, targeted changes. No new structure, no new sections beyond what is listed.

Rules:
- Only touch `src/pages/vooruitblik.astro` (page-scoped styles) and `public/_redirects`. Do not change BaseLayout, header, footer, homepage, blog, shared components, global typography or `src/lib/analytics.ts`.
- Reuse existing design tokens and utility classes where appropriate. A new H1 font size is allowed in page-scoped CSS if the existing typography scale is insufficient. Do not introduce new global tokens or colours.
- Keep the existing `product_cta_clicked` handling and UTM passthrough exactly as they are for every CTA, including the new one.
- Do not commit, push or deploy.

## Phase 1: Proposal (stop after the proposal)

Read the current page, the typography tokens/heading styles and `public/_redirects`, then propose the exact edits for the changes below. Stop and wait for my approval. Then apply edits one at a time with my confirmation.

### 1. Hero heading bigger

The H1 "Kom je uit met je pgb-budget?" must be noticeably larger and more dominant on desktop and mobile.

First inspect the existing typography tokens, heading styles and responsive rules.
- If an existing heading or display size achieves the desired result, reuse it.
- If the largest existing size is insufficient, propose a logical next size based on the current typography scale and apply it in page-scoped CSS only.
- Aim for a maximum of 2 lines at 375 px, without sacrificing readability or causing overflow. If that is not achievable at the chosen size, report it rather than forcing it.
- Keep the H1 visually balanced and avoid pushing the video unnecessarily far below the fold.

Show the proposed desktop and mobile sizes before implementing.

### 2. All section headings centered

Center the H2 headings "Vooruit kijken, niet alleen terug", "In drie stappen" and "Veelgestelde vragen". Body content (bullets, step cards, FAQ items) keeps its current alignment and width.

### 3. Extra CTA directly below the video

Add one CTA button directly under the video, using the same button component/style as the hero CTA. Text VERBATIM (do not translate):

```
Probeer het met je eigen budget
```

Small line under it, VERBATIM:

```
21 dagen gratis. Geen betaalgegevens nodig.
```

Tracking: same `product_cta_clicked` handler, with `position: video`. Same href and UTM passthrough as the hero CTA.

### 4. Short redirect for the video end card

The campaign video ends with the text `pgbplanner.nl/registreer`. Add a redirect in `public/_redirects` so that this typed URL works and is attributable:

```
/registreer  https://app.pgbplanner.nl/registreer?utm_source=video&utm_medium=video&utm_campaign=product-vooruitblik-okt26  302
```

Check first that `/registreer` does not conflict with an existing page, route or redirect, and that the rule is placed so it takes effect (order in `_redirects`). Report if there is a conflict instead of choosing yourself.

### 5. Video files check (read-only)

Confirm that these two files exist with exactly these names, and that the `<video>` element references them:

- `public/video/vooruitblik-16x9.mp4`
- `public/video/vooruitblik-poster.jpg`

If the video file is missing its `.mp4` extension or has a different name, report it. Do not rename or move files yourself.

## Phase 2: Verify (after the edits)

Report:
1. Production build passes.
2. Measurements at 1440 px and 375 px: hero H1 size and line count, headings centered, new CTA visible directly under the video, video shows the poster, no horizontal scroll.
3. All three CTAs (hero, video, bottom) point to the registration URL with UTM parameters preserved when opening `/vooruitblik/?utm_source=facebook&utm_medium=social&utm_campaign=product-vooruitblik-okt26&utm_content=test`.
4. The `_redirects` rule as it will be deployed, and how to test it after deploy (`curl -I https://www.pgbplanner.nl/registreer`).
5. `git status`.
