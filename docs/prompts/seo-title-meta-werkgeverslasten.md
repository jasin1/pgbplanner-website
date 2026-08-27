# Task: rewrite SEO title and meta description for article 1

Repository: pgbplanner-website (Astro)

## Context

The article at `/blog/werkgeverslasten-pgb-berekenen/` ranks at average
position 6.5 in Google Search Console but only converts 2.5% of impressions
into clicks. Diagnosis:

1. The rendered `<title>` is 71 characters including the site-name suffix,
   so Google truncates it.
2. The meta description does not contain the word "werkgeverslasten", so
   Google cannot bold the search term in the snippet.
3. The title promises an explanation where the audience is searching for a
   figure and a year.

This is a metadata-only change. The article body is not touched.

## Scope

In scope:
- frontmatter title and description of article 1
- removal of the site-name suffix from the rendered title of blog articles

Out of scope:
- article body text
- the "Deze tekst is bijgewerkt op 1 augustus 2026" line at the bottom
- the homepage title and meta description
- any other article
- adding a separate SEO-title frontmatter field

## Phase 1 — read-only audit. Stop after this phase.

Do not edit anything. Report:

1. The path and full frontmatter of article 1.
2. The exact frontmatter field names used for the title and the meta
   description.
3. Where the ` • PGB Planner` suffix is applied. Which layout or component
   builds the `<title>`, and is the same code path used by the homepage and
   other non-blog pages?
4. Every place the title field is consumed: `<title>`, `og:title`,
   `twitter:title`, the page H1, share links (mail, Facebook, WhatsApp),
   article cards on the homepage and blog index, JSON-LD if present.
5. Whether `og:description` and `twitter:description` are derived from the
   same description field or set separately.
6. Whether removing the suffix for blog articles only can be done without
   changing the title of any non-blog page.

Then stop and wait.

## Phase 2 — proposal. Stop after this phase.

Propose the concrete edits: file, field, current value, new value. List every
page whose rendered output changes as a side effect. Flag anything that
breaks if the suffix is removed. Do not implement yet.

Then stop and wait.

## Phase 3 — implementation

Ask for confirmation before each individual edit. Apply the new values from
the verbatim block below. Then run the build and confirm it passes.

## Phase 4 — verification

Report the final rendered `<title>`, `<meta name="description">`,
`og:title` and `og:description` for article 1, and the rendered `<title>`
of the homepage and one other blog article, so I can confirm nothing else
shifted.

## Verbatim Dutch copy — do not translate, do not edit, do not reformat

Use these strings exactly as written, including capitalisation and
punctuation.

Title:
Werkgeverslasten pgb 2026: zo reken je die 20 procent door

Description:
Sinds 2026 betaal je ongeveer 20 procent werkgeverslasten voor zorgverleners met een arbeidsovereenkomst. Zo reken je het uit en zo werkt de compensatie.

End of verbatim block.

## Post-execution note (2026-08-27)

Two assumptions in this prompt did not match the repository, and were
corrected during Phase 1:

1. The prompt assumed the ` • PGB Planner` suffix was applied in
   `BaseLayout.astro`. It is not. The suffix was appended per page, only in
   `src/pages/blog/[...slug].astro` (both the `title` and `titleTag` props)
   and separately hardcoded in `src/pages/blog/index.astro`. The homepage and
   other non-blog pages never carried it.
2. The prompt listed "adding a separate SEO-title frontmatter field" as out
   of scope, on the assumption none existed. `titleTag` already existed in
   `src/content/config.ts` and was already in production use on
   `pgb-tekort-berekenen`.

Decisions made as a result:

- The new SEO title for this article was set via the existing `titleTag`
  field, not `title`, matching the pgb-tekort-berekenen precedent.
- `title` (the editorial title) is unchanged, and continues to drive the H1,
  `og:title`, `twitter:title`, share links, and article cards. The
  divergence between the keyword-led `<title>` (from `titleTag`) and the
  editorial `og:title` (from `title`) on articles with a `titleTag` is
  intended: search gets the keyword-led title, social gets the editorial
  one.
- The suffix-removal edit in `[...slug].astro` applies to every published
  article's `<title>`/`og:title`/`twitter:title`, not only this one. That
  repo-wide effect was accepted deliberately rather than scoping the fix to
  a single article.

  The suffix was removed because it consumed roughly 14 of the ~60 characters
  Google displays, on a brand name that has no recognition yet, which caused
  titles to be truncated on the part that earns the click. The domain already
  appears above every search result. This trade of brand visibility for click
  space is deliberate and reversible, and is scheduled for review in November
  2026 against the volume of branded search queries.
- `src/pages/blog/index.astro` was left unchanged; the suffix stays on the
  blog listing page.