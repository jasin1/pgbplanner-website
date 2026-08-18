# Implement PostHog on the marketing site

## Context

Repository: pgbplanner-website (Astro v5, SSR, Netlify).
Read `docs/marketing/analytics-architecture.md` first. It is the source of
truth for this task. If anything below conflicts with it, stop and report
the conflict rather than choosing.

A read-only inventory of all conversion actions on this site was produced
in a previous session and informed the decisions below. Do not redo it.

## Phased execution — mandatory

**Phase 1, read-only.** Confirm the files you will touch and report what
you find. Then STOP and wait.

**Phase 2, proposal.** Describe your implementation approach per file, with
no code written yet. Then STOP and wait.

**Phase 3, implementation.** Confirm each edit individually before making
it. Never batch edits.

**Phase 4, build.** Run the build and report the result.

Do not proceed past a STOP without explicit approval.

## Out of scope — do not touch

- GA4. It stays exactly as it is. Do not modify, remove, or wrap it.
- Any consent banner. None is required and none is to be added.
- Session replay. It must be off (see config below).
- `identify()`. Never call it on this site.
- The `.mdx` migration, `ProductCta.astro`, and the article 1 CTA. These
  belong to a separate session.
- The Tally embeds on `/vragenlijst` and `/feedback`. Their thank-you pages
  are measured by pageview only.
- The dead `dankje` query param in `src/pages/index.astro`. Leave it.

## 1. Load PostHog

Add posthog-js to all pages via `src/layouts/BaseLayout.astro`, alongside
the existing GA4 snippet.

Configuration:

- API host: `https://eu.i.posthog.com`
- Project key: from environment variable `PUBLIC_POSTHOG_KEY`.
  Never hardcode the key. Add it to `.env.example` with an empty value.
- `disable_session_recording: true`
- `person_profiles: 'identified_only'`
- `cross_subdomain_cookie: false`
- `autocapture: false` — all events in this task are explicit
- `capture_pageview: true`

If `PUBLIC_POSTHOG_KEY` is missing, PostHog must not initialise and the
site must not error.

## 2. First-touch acquisition context

On every page load, determine the visitor's acquisition context and store
it in `localStorage` on `pgbplanner.nl`, under a single key.

Stored value: `source`, `medium`, `campaign`, `content`, `first_seen_at`.

Determining the context:

- If UTM parameters are present in the URL, use them.
- If not, derive from `document.referrer`:
  - a search engine referrer -> source is the engine name, medium `organic`
  - any other external referrer -> source is the referring hostname,
    medium `referral`
  - no referrer -> source `direct`, medium `direct`

**Critical:** if a stored context exists and `first_seen_at` is less than
30 days old, do NOT overwrite it. Not on later navigation, not on a later
visit, not when new UTM parameters arrive. First-touch is the decision on
record. After 30 days, a new first-touch may be established.

This must not be cross-subdomain. `localStorage` is origin-scoped, which is
the intended behaviour — the app must not be able to read it.

## 3. Propagate context to registration CTAs only

Append the stored acquisition context as UTM parameters to links pointing
to `https://app.pgbplanner.nl/registreer`.

`utm_source`, `utm_medium`, `utm_campaign`, `utm_content` are taken
verbatim from the stored context. Omit any that are empty.

Do NOT append anything to:

- `app.pgbplanner.nl/login`
- `app.pgbplanner.nl/privacy`
- `app.pgbplanner.nl/voorwaarden`
- any other outbound link

Rationale: only registration is acquisition. Login would re-attribute
existing customers on every visit and corrupt the data.

`utm_content` carries the original distribution variant from the inbound
link. It must never be overwritten with the page slug — the page is already
known from `page_slug` on the click event.

## 4. Events

Three explicit events, plus the standard pageview.

### `product_cta_clicked`

Fires on click of any link to `app.pgbplanner.nl/registreer`.

Properties: `page_type`, `page_slug`, `position`.

### `share_clicked`

Fires on click of any share control in `BlogPostLayout.astro`, including
the copy-link button.

Properties: `page_type`, `page_slug`, `position`, `channel`.

### `contact_form_submitted`

Fires inside `showSuccess()` in `src/components/SignupSection.astro`, i.e.
only after `data.success === true`. Never on the submit click.

Properties: `page_type`, `page_slug`, `position`.

Do NOT send any form field values. Specifically not the PGB type and not
the newsletter checkbox — these concern the visitor's health situation and
must never reach analytics.

## 4b. Acquisition properties on every event

All three explicit events AND the standard pageview carry the stored
first-touch context as properties:

- `first_source`
- `first_medium`
- `first_campaign`
- `first_content`

Values come from `localStorage`, not from the current URL. A visitor who
arrives via Facebook, browses three pages, then clicks the CTA must still
carry `first_source: facebook` on that click.

Omit a property when its stored value is empty. Never substitute a
placeholder.

For pageviews, register these as super properties so they attach
automatically, rather than wiring them per event.

## 5. Property values — fixed vocabulary

`page_type`: `homepage` | `blog` | `landingpage` | `other`

`page_slug`: `home` for the homepage, otherwise the page or article slug.

`position`: `header` | `hero` | `inline` | `section` | `bottom`

`channel`: `mail` | `link` | `facebook` | `whatsapp`

These values are fixed. Do not invent new ones. If an element does not fit,
stop and report it.

## 6. Mapping to existing elements

Apply `position` as follows:

- `src/components/Header.astro:132` (registration CTA) -> `header`
- `src/pages/index.astro:34` (hero CTA) -> `hero`
- `src/pages/index.astro:157` (mid-page CTA block) -> `section`
- `src/pages/index.astro:240` (audience section CTA) -> `section`
- `src/content/blog/2026-08-pgb-tekort-berekenen/index.md:115`
  (styled product-cta block) -> `inline`
- `src/content/blog/2026-08-pgb-tekort-berekenen/index.md:140`
  (plain inline text link at end of article) -> `bottom`
- share controls, top instance -> `top` is NOT in the vocabulary; use
  `header` for the top share row and `bottom` for the bottom share row
- contact form in `SignupSection.astro` -> `section`

The existing `data-article`, `data-position` and `data-channel` attributes
on the share controls are already in place. Reuse them. Note that
`data-position` currently uses `top`/`bottom`; map `top` to `header` when
emitting the event, or normalise the attribute — propose which in phase 2.

Elements not listed above and not matching the rules get no event.

## 7. Verification before you report done

- The build succeeds.
- With `PUBLIC_POSTHOG_KEY` unset, no console errors and the site renders.
- A registration CTA link, inspected in the DOM after page load, carries
  UTM parameters. A login link does not.
- Report anything you could not verify without a running browser.

## Report

End with a list of every file changed and one line per change.