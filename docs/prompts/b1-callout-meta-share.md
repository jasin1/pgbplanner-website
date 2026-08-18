# B1: callout primitive, blog meta bar, share buttons

Phased execution. Per-edit confirmation. Do not "allow all edits".
Do not run a build until the final step.

Repo: pgbplanner-website (Astro v5).

## Scope

IN scope, nothing else:
1. `.callout` primitive + `--calc` modifier; migrate existing summary and
   calculation blocks onto it.
2. `docs/marketing/blog-content-blocks.md` — minimal convention document.
3. Blog meta bar (top of article) and share row (bottom of article).
4. Muted grey colour token `#6F7782`.
5. Arrow SVG in the product CTA button, replacing the text arrow.

OUT of scope. Do not touch, propose, or prepare for any of these:
- PostHog or any analytics work;
- GA4;
- creating a ProductCta component;
- migrating articles to `.mdx`;
- adding a CTA to article 1;
- changing the CTA destination URL;
- `docs/marketing/blog-product-cta-spec.md`;
- the hero image.

If any of these seem necessary to complete the work, stop and report instead
of proceeding.

## Phase 1 — read and confirm (no edits)

Read `docs/marketing/editorial-guide.md` first.

Verify and report before touching anything:

a) `src/assets/icons/` contains: arrow-right.svg, calendar.svg, clock.svg,
   facebook.svg, link.svg, mail.svg, whatsapp.svg, linkedin.svg. Report each
   file's viewBox, dimensions, and whether it uses `currentColor` or hardcoded
   fill/stroke values. LinkedIn is present but will NOT be used.

b) Where `--c-text-muted` is defined and everywhere it is used across the site.
   We need to know whether changing its value affects anything outside the blog
   before deciding between updating it or adding a new token.

c) The current markup of the blog post header (date, any existing meta) in
   BlogPostLayout.astro, and what renders at the bottom of an article.

d) Confirm `astro.config.mjs` still has no markdown/remark/rehype
   configuration.

Stop after this report. Wait for instructions.

## Phase 2 — proposal (no edits)

Propose the approach for each item below. Stop and wait for approval.

### 2.1 Callout primitive

A single base class for editorial blocks that sit visually apart from running
body text. Base provides background, border, radius, padding, margin — all
from existing design tokens.

A modifier is added ONLY when the content type requires a functionally
meaningful presentation or behaviour difference from the base callout — not to
create decorative variety. `--calc` qualifies because numbers benefit from
tabular alignment; a different background colour would not.

- `.callout` — base. The article 1 summary block is exactly this, no modifier.
  It stays on `<aside>` (it is genuinely tangential).
- `.callout--calc` — calculation blocks. Adds `font-variant-numeric:
  tabular-nums`. Uses `<div>`, NOT `<aside>` — the calculation is central to
  the article, not an aside.

The two calculation blocks in article 2 are currently hand-written
`<pre class="calculation-block">` in the markdown source. Replace each with:

```html
<div class="callout callout--calc">
  <p>...line one...<br>...line two...</p>
</div>
```

The multi-line calculation text becomes normal paragraph text with `<br>`
between lines. `white-space: pre` and `overflow-x` must be gone — they are the
cause of the horizontal scrolling that makes these blocks unusable on mobile.
Verify the text wraps naturally at 390px width.

`.product-cta` and `.bronnen` stay outside this system. Do not fold them in.
`blockquote` styling is currently unused; leave it alone.

### 2.2 blog-content-blocks.md

Deliberately minimal — a convention, not a second design system document.
Five or six short rules covering: what `.callout` is; the single criterion for
when a modifier is justified, stated as in 2.1 above and including the
contrasting example; semantics chosen independently of styling; values come
from design tokens, so no colours or sizes in this document; `.product-cta` is
explicitly outside this system; do not invent a new block style when `.callout`
suffices.

Then add a line to `CLAUDE.md` pointing to it for any blog or content work,
alongside the existing editorial guide instruction.

### 2.3 Meta bar and share row

Top of article, one row: calendar icon + date, clock icon + reading time, then
right-aligned "Deel artikel:" followed by the share icons.

Bottom of article: the share icons only, left-aligned, with the same label.
No date, no reading time.

Share channels, in this order: mail, link (copy), facebook, whatsapp.
No LinkedIn. No X.

- mail, facebook, whatsapp are plain `<a>` share links. No platform SDKs, no
  third-party scripts, no trackers.
- WhatsApp: use `https://wa.me/?text=` — it resolves correctly on both desktop
  and mobile, unlike the older `api.whatsapp.com` form.
- link (copy) is a `<button>`, not an anchor. On click it copies the canonical
  article URL and shows a brief confirmation. Keep the confirmation minimal and
  accessible (aria-live), not a toast library.

Add `data-` attributes to every share control and to the product CTA button
identifying article slug, position (top/bottom/cta), and channel. These are for
analytics that will be wired up in a later session. Do not add any event
handlers for them now.

Icons: inline the SVGs so they can be coloured via CSS. Normalise them to a
consistent size and set them to `currentColor`. The brand marks (facebook,
whatsapp) are filled shapes while mail/link/clock/calendar are line icons —
match the optical weight as closely as reasonable, but do not redraw the brand
marks.

Every share control needs an accessible name. Icon-only buttons without one are
unusable with a screenreader.

### 2.4 Reading time

Do NOT add a remark plugin or touch the markdown pipeline in this session.

Add an optional frontmatter field for reading time to the content schema. The
layout renders the clock icon and value when present, and omits the whole
element when absent. Jasin fills it in manually for the two existing articles.
This will be replaced by a computed value in a later session.

### 2.5 Muted grey

`#6F7782` for the meta bar text and icons. Based on your Phase 1 findings,
either update `--c-text-muted` or add a new token — recommend one and say why.
The blog post date currently renders too light and must use this colour.

## Phase 3 — implement

Per-edit confirmation throughout. After all edits, run the build and report
any errors or warnings.

Do not verify visually — Jasin does the browser check himself, including the
390px mobile view.