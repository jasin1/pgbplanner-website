# Task: add the existing product CTA to article 1

## Context

`ProductCta.astro` already exists and is used by article 3. MDX is already
enabled and article 3 ships as `.mdx` in production, so the pipeline is
proven. Article 1 has no product CTA yet and is still `.md` with raw HTML
in the body.

Article 2 is deliberately out of scope. Do not modify it and do not use its
hand-written CTA markup as the pattern.

Read before phase 2:
- docs/marketing/blog-product-cta-spec.md
- docs/marketing/editorial-guide.md
- article 3, only as the implementation reference for ProductCta.astro

## Goal

One inline ProductCta in article 1, without changing its public URL and
without touching its editorial prose.

Article 1: src/content/blog/2026-08-werkgeverslasten/index.mdx

Placement: immediately after the section "Waar dit in september op uitkomt",
before the heading `## Vier dingen die je hierna kunt beslissen` that follows
it. That section is where the article turns from explaining what
werkgeverslasten are into the problem that they only become visible once
the year is already well underway, which is the question the CTA answers.
Not before `## Tot slot`: that would put the CTA too far down a long
article.

Destination: the PGB Planner homepage, per the CTA specification. Not
registration.

Copy, Dutch, use verbatim and do not translate or adjust:

<!-- DUTCH COPY, VERBATIM -->
heading:    Zie wat werkgeverslasten betekenen voor de rest van je jaar
body:       Werkgeverslasten werken elke maand door, ook in de maanden die
            nog komen. In PGB Planner reken je vooruit met je eigen
            zorgverleners, uren en tarieven, en zie je waar je op uitkomt
            aan het einde van het jaar.
buttonText: Bekijk PGB Planner
            No arrow character: the component renders the arrow SVG.
<!-- END DUTCH COPY -->

## Phase 1: read-only compatibility check. Make no changes.

Report only material findings, then stop and wait for approval.

1. Inspect article 1 for MDX incompatibilities: void elements not
   self-closed, curly braces in prose, HTML comments, character entities,
   unclosed or improperly nested tags. The file contains at least one
   raw `<aside class="samenvatting">`. List every required edit with its
   line number. If the file is clean, say so explicitly.
2. Confirm where this article's slug comes from, and that renaming
   index.md to index.mdx leaves the public URL unchanged.
3. Quote the exact import and prop pattern article 3 uses for
   ProductCta.astro.
4. Report whether any remaining code in the blog pipeline still matches
   entries by `.md` in a way that would exclude this article after the
   rename.

## Phase 2: implementation

Confirm each edit individually before making it. Do not use "allow all
edits".

- Rename index.md to index.mdx.
- Apply only the syntax changes required for MDX compatibility.
- Import ProductCta.astro using the same pattern as article 3.
- Insert the CTA immediately after "Waar dit in september op uitkomt",
  before `## Vier dingen die je hierna kunt beslissen`.
- Set the `article` and `position` props consistently with article 3.
- Do not rewrite any existing prose.

Then run the production build and report the result.

## Phase 3: documentation

Only after the build succeeds.

The standing rule is that a session which deviates from a governing spec
updates that spec in the same session, including the reason, for approval
before writing.

1. docs/marketing/blog-product-cta-spec.md, sections 3, 6, 9, 11 and 12.
   These still describe decisions that have since been made:
   - `.mdx` is no longer an open question.
   - The default is now a CTA on every article, but it never appears
     automatically: the author places it deliberately, with copy written
     for that article. Omitting it remains a legitimate outcome where PGB
     Planner does not credibly solve the follow-on problem, and that
     choice is recorded rather than assumed.
   - The button copy in section 11 is an example, not prescribed wording.
   Correct only what is factually outdated. Do not redesign or expand the
   spec.
2. Root CLAUDE.md: add the standing rule above if it is not already
   present.

Propose these edits for approval before writing them.

## Out of scope

Article 2. Sticky or floating CTA. Second CTA at the end of the article.
Any change to the ProductCta component or its styling. Editorial rewrite
of article 1. New analytics implementation. Any other blog cleanup or
refactor.