# Sticky CTA bar on blog articles

Repo: `pgbplanner-website` (Astro/MDX)

## Context

Blog articles have an inline product CTA (`ProductCta`), placed editorially per article. It solves placement, not reach: in a long article it sits around 60% depth, so readers who leave earlier never see it. This task adds a separate sticky CTA bar: a permanent route to the product on every blog article, independent of the inline CTA.

`docs/` contains `blog-product-cta-spec.md`, which says the inline CTA is "not automatically injected on every blog page". That rule applies to the inline CTA only. The sticky bar is navigation, not editorial content, and has its own rule: it appears on all articles. Do not treat this as a conflict, and do not change the spec as part of this task.

## Decisions already made (do not reopen)

- **Scope:** all blog articles. No per-article opt-in or opt-out.
- **Trigger:** appears once the top of the article body element (`.article-content`) reaches the top of the viewport (`rect.top <= 0`). Replaced the percentage rule (25%, then 10%) after launch: a percentage depends on article length, and on short articles it was already met on load, so the bar showed immediately and never hid at the top. Do NOT couple it to the position of the inline CTA.
- **Scrolling back up until the article top is below the top of the viewport again:** the bar hides again.
- **Coexistence:** the sticky bar and the inline CTA may be visible at the same time. That is intended.
- **Footer and bottom share row:** the bar hides as soon as the site footer or the bottom share row (`.blog-post__share--bottom`) enters the viewport, detected with an IntersectionObserver on both, using the same animation as it appears with. It comes back when neither is in the viewport and the reader is past the threshold. No padding on the footer, no reserved space. (Share row added in Phase 3: otherwise the bar briefly covers the share row just before the footer appears.)
- **Not dismissible:** no close button, no remembered dismissed state, no storage of any kind.
- **Animation:** subtle slide-in from the bottom. Must respect `prefers-reduced-motion` (no slide, just show/hide). Non-blocking, does not shift content, no layout shift.
- **Copy:** supplied by me. Do not write, suggest or translate copy.

## Future destination and message match

The homepage is the current destination, but this is intentionally temporary. The intended future flow is: article → sticky CTA → dedicated landing page → signup.

- **Copy and destination live together in one editable data file**, not in the component. Preferred approach: a small content file (for example `src/content/cta/sticky.md`) with only frontmatter, validated by a schema, so a missing or misspelled field fails the build instead of shipping an empty button. Intended fields:
  - `text` (bar copy)
  - `buttonText`
  - `destination` (currently `/`)
- This must follow the project's existing conventions. If the blog already uses Astro content collections, a small collection for this file is the expected fit. If the audit shows a different existing pattern is clearly smaller or more consistent, propose that instead. Do not introduce new infrastructure solely for this.
- Copy and destination are a matched pair. The copy supplied for this task is written for the homepage destination and must be reconsidered when the destination changes. Keeping them in one file is how this is enforced.
- Do NOT build per-article destination mappings, landing-page routing, multiple variants, personalisation or any other future logic now. One file.
- The existing inline `ProductCta` remains out of scope. Whether its destination changes later is a separate decision.

## Measurement

- **Click:** reuse the existing CTA click event. The sticky bar sends `position: "sticky"`. The inline CTA keeps its current value (expected `"inline"`, verify in the audit). Existing data must stay valid: no renaming, no migration.
- **Impression:** add a new impression event for BOTH CTA types. It fires once per page view per CTA type, when the CTA enters the viewport:
  - sticky: when the bar appears for the first time;
  - inline: when at least 50% of the inline CTA is in the viewport for the first time.
- The impression must NOT fire again when the sticky bar reappears after hiding (footer, scrolling up).
- The impression event carries the same article identifier property and the same `position` values as the click event, so impressions and clicks can be joined per article and per position.
- **Destination:** sticky click and impression events include the CTA destination, read from the same data file the bar links to, so what is measured always matches what is live. If the existing click event already records the destination under another property (such as `href`, `url` or `target`), reuse that property and convention. Do not add a second property with the same meaning.
- PostHog project: website (not app).

Why: the sticky bar is seen by everyone who scrolls into the article, the inline CTA only by readers who reach it. Clicks alone would favour the sticky bar for being more visible, not for working better. The destination property lets the homepage period and a later landing-page period be separated without relying on a remembered switch date. All of this must be correct from day one; old events cannot be enriched retroactively.

## Out of scope

Scroll depth tracking, visibility duration, A/B variants, personalisation, any change to the existing `ProductCta` component.

Note: the inline impression must be implemented WITHOUT modifying `ProductCta`. If that is not possible (for example no stable selector or wrapper to observe), stop and report it in the audit. Do not work around it silently.

## Copy (verbatim)

Dutch UI copy for the data file. Use exactly as written. Do not translate, rephrase, shorten or add punctuation.

```
text: [AAN TE LEVEREN]
buttonText: [AAN TE LEVEREN]
```

If the placeholders are still present when you reach the build phase, stop and ask for the copy.

## Working method

Work in phases. Stop after each phase and wait for my go.

### Phase 1: Read-only audit (no edits)

Report on:

1. The blog article layout: which file(s) render an article, where the article body element and the site footer are, and how a sticky element would sit in that layout.
2. `ProductCta`: where it lives, how it is rendered in MDX, where its destination comes from, and whether its rendered output has a stable selector or wrapper that can be observed from outside the component.
3. The existing CTA click event: exact event name, all properties, the exact `position` value the inline CTA sends, how the article is identified, and whether the destination is already recorded (under any property name).
4. How content and configuration are organised: content collections and their schemas (`src/content/config.*` or equivalent), and any existing site config or data files. Assess whether a small `cta` collection fits.
5. How PostHog is loaded on the website (init location, how components call `capture`), and whether calls are safe if PostHog is blocked or not yet loaded.
6. Existing client-side scripts or islands in the blog layout, and whether React is used there or plain Astro `<script>`.
7. Existing z-index layers, fixed or sticky elements (header, cookie notice, anything else at the bottom of the viewport) that could collide with the bar.
8. Any risk to the existing inline CTA events.

Stop.

### Phase 2: Proposal (no edits)

Propose:

- file(s) to create and change, and where the bar is mounted;
- the data file: location, format, schema and field names;
- implementation approach (Astro component with plain script vs island), with a one-line reason;
- the exact impression event name and properties, and the destination property (new or reused), consistent with the click event;
- how the "once per page view" guard works for both impressions;
- how the threshold is determined against the article body;
- styling: height, spacing, colours, z-index, using existing design tokens;
- how you will verify: which pages, which events, which viewport widths.

Stop.

### Phase 3: Build, per-edit confirmation

One edit at a time. Show each edit before applying it. Do not batch edits.

### Phase 4: Verification

- Check at 380px width and on desktop.
- Confirm: appears when the article top reaches the viewport top, hides when scrolling back above it (test on a short article too, e.g. pgb-salarisverhoging-berekenen), hides at footer and returns when scrolling up, no layout shift, reduced motion works.
- Confirm the build fails when a required field in the data file is removed (then restore it).
- Confirm in the browser network tab or PostHog debug: sticky click sends `position: "sticky"` and the destination, inline click unchanged, each impression fires once per page view, sticky impression does not re-fire on reappearance.
- Report results. Do not commit until I say so.
