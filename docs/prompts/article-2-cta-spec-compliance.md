# Task: bring article 2's product CTA in line with the specification

## Context

Article 2 was published before ProductCta.astro existed. It has a
hand-written CTA in raw HTML that deviates from
docs/marketing/blog-product-cta-spec.md on three points:

- the destination is app.pgbplanner.nl/registreer instead of the homepage
- the button copy differs from what the component renders
- there is a second CTA at the end of the article

Article 2: src/content/blog/2026-08-pgb-tekort-berekenen/index.md

Articles 1 and 3 already use the component. This task makes article 2
consistent with them.

Read docs/marketing/blog-product-cta-spec.md before phase 2.

## Phase 1: read-only. Make no changes.

1. Quote the exact current markup of both CTA blocks, with line numbers.
2. Report the file's MDX compatibility if renamed to .mdx: void elements
   not self-closed, curly braces in prose, HTML comments, character
   entities, unclosed or improperly nested tags. List every required edit
   with its line number, or state that the file is clean.
3. Confirm where this article's slug comes from and that renaming to .mdx
   leaves the public URL unchanged.
4. Report whether the second CTA at the end sits inside the article body or
   in the layout, since that determines whether removing it affects other
   articles.

Report and stop.

## Phase 2: proposal

Propose migrating the article to .mdx, replacing the inline CTA with
ProductCta, and removing the second CTA at the end.

Destination is the homepage.

For the copy: propose keeping the existing heading and body text if they do
not break the spec, and say so explicitly. If something must change, show
me the exact wording you propose and wait for approval. Do not write new
copy on your own initiative.

Wait for approval.

## Phase 3

Confirm each edit individually. Do not use "allow all edits".

Set the article and position props consistently with articles 1 and 3.

Then run the production build and report the result.

The public URL must not change.

## Out of scope

Any change to articles 1 or 3. The hero image of article 2. The sticky CTA
bar, which is a separate task. Any change to the ProductCta component. Any
editorial rewrite beyond the CTA blocks themselves.