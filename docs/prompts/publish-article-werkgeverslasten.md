# Publish article 1: werkgeverslasten

Repo: `pgbplanner-website`. Phase 2, following the read-only audit of `docs/prompts/audit-blog-publication.md`.

Confirm each edit individually. Do not use "allow all edits this session". Before you touch anything, present a change plan per file and wait for approval.

## Decisions already made

These follow from the audit. Do not revisit them.

- Destination: `src/content/blog/2026-08-werkgeverslasten/index.md`. The date-prefixed folder matches the one existing entry; the frontmatter `slug` fixes the URL.
- Public URL: `https://www.pgbplanner.nl/blog/werkgeverslasten-pgb-berekenen/`
- `src/content/blog/2026-02-rdah/` stays exactly as it is. It is `draft: true`, so it is already excluded from build and sitemap. Nothing to clean up.
- `public/_redirects` stays as it is. The `/lees-meer` 301 is correct.
- No changes to `src/content/config.ts`, the layouts, the routes, or the sitemap config. The audit showed a new non-draft entry is picked up automatically.
- The "Blog" nav link stays hidden. The threshold of four published posts is intentional; the blog index is scheduled for late August.

## Source

`docs/marketing/artikelen/werkgeverslasten-pgb-berekenen-definitief-v2.md`

This file is the source of truth and must not be edited. Copy from it.

## Step 1. Place the article, verbatim

Create `src/content/blog/2026-08-werkgeverslasten/index.md`.

Frontmatter, exactly these fields:

```
title: "Werkgeverslasten berekenen: waarom je pgb sneller opraakt"
description: "Je zorgverlener werkt hetzelfde aantal uren en het uurloon is niet veranderd, maar je budget loopt harder terug. Dit is waarom, en zo reken je het opnieuw uit."
pubDate: 2026-08-01
slug: werkgeverslasten-pgb-berekenen
draft: false
heroAlt: "Keukentafel met papieren, een rekenmachine en een notitieboek"
image: /og/werkgeverslasten.jpg
```

`draft: false` is required. The schema defaults it to true, which would keep the article invisible.

Body: copy the source body byte for byte, with exactly one deletion. Remove the in-body `# Werkgeverslasten berekenen: ...` H1 on line 8 and the blank line that follows it. The layout already renders an H1 from the frontmatter title; leaving this in produces two stacked H1s. Everything from the first paragraph onward is untouched.

Two checks, both reported:

1. Before deleting, print line 8 of the source file verbatim. Confirm the word is "waarom" and not "waarno". If the source really contains a typo there, stop and tell me.
2. After copying, diff the new file's body against the source body excluding the removed heading. The diff must show only that deletion. Report the result.

Do not translate, rewrite, reflow or correct any Dutch sentence. Do not convert any character into an em-dash or a typographic quote. If you believe something is wrong, report it and leave it alone.

## Step 2. Add the hero image

`hero.jpg` will be placed in the article folder. Reference it inline in the body directly under the first paragraph block, following the pattern in `2026-02-rdah/index.md`:

`![Keukentafel met papieren, een rekenmachine en een notitieboek](./hero.jpg)`

Tell me the exact line where you intend to put it before inserting it.

A second copy at 1200x630 goes to `public/og/werkgeverslasten.jpg` for Open Graph. That path is what the `image` frontmatter field points at. Create the `public/og/` directory if it does not exist. Confirm both files are present before building.

## Step 3. Links in the sources list

The `Bronnen` paragraph near the end of the file is plain text. Add links. Link text stays the readable source description, so "Staatscourant 2026, nr. 19766" and not "klik hier", so the source stays findable if a link ever breaks.

- Staatscourant 2026, nr. 19766 → `https://zoek.officielebekendmakingen.nl/stcrt-2026-19766`
- Staatscourant 2026, nr. 25254 → `https://zoek.officielebekendmakingen.nl/stcrt-2026-25254`
- Uitspraak Centrale Raad van Beroep → `https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:CRVB:2023:481`
- Kamerstukken 36 744 → `https://www.eerstekamer.nl/wetsvoorstel/36744_wet_aanpassing_regeling`
- Per Saldo Wlz → `https://www.pgb.nl/compensatie-werkgeverslasten-pgb-wlz/`
- Per Saldo Zvw → `https://www.pgb.nl/compensatie-werkgeverslasten-pgb-zvw/`
- SVB page on the 2026 arbeidsovereenkomst change → URL not yet known. Do not guess or construct one. Leave that source as plain text and flag it.

In the running body, add exactly two links and no more: one on the mention of the Centrale Raad van Beroep ruling, one on the Wlz compensation scheme. Every inline link is an invitation to leave, and the article is long.

Check whether `.article-content a` in `src/styles/main.css` already handles external link styling and target behaviour. If `target="_blank"` is used anywhere, pair it with `rel="noopener"`. If the existing article styling has no such pattern, do not invent one; plain Markdown links are acceptable and open in the same tab.

After this step, show me only the changed lines. No full file dump.

## Step 4. Style the summary aside

The article contains `<aside class="samenvatting">` with the "In het kort" block. The audit confirmed the Markdown inside it renders correctly, so this is styling only.

Add a rule in the "Blog / Article typography" section of `src/styles/main.css`, scoped as `.article-content .samenvatting`. Use existing design tokens, do not introduce new colour values.

Light neutral background, comfortable padding, modest border radius, clear vertical margin above and below. No italics, no quotation marks, no left border accent. It is a summary, not a quote or a callout.

Do not create a component.

## Step 5. Build and verify

Run `npm run build` and confirm:

- `dist/blog/werkgeverslasten-pgb-berekenen/index.html` exists
- `dist/sitemap-0.xml` contains `https://www.pgbplanner.nl/blog/werkgeverslasten-pgb-berekenen/`
- The page has its own `title` and `meta description`, not the site fallback
- `canonical` and `og:url` match and are absolute
- `og:image` resolves to `https://www.pgbplanner.nl/og/werkgeverslasten.jpg` and that file exists in `dist/`
- `og:type` is `article` and `twitter:card` is `summary_large_image`
- `2026-02-rdah` still produces no route and no sitemap entry
- The hero image renders and the aside renders with its Markdown processed
- No em-dash characters anywhere in the rendered article. Grep explicitly.

Report each as pass or fail. Do not deploy.

## Out of scope

Do not build: the blog index page, article page visual design, new components, internal links to other articles, structured data, reading time, author boxes, related posts, RSS changes, or any change to the nav threshold.

Allowed: readability of this one page using existing styles only.

## Note for later, not now

`CLAUDE.md` still lists `src/pages/lees-meer.astro` in its project structure table. That file no longer exists. Report it; do not fix it in this session.
