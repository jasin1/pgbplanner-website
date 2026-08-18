# Build the blog product CTA component

## Context

Repo: pgbplanner-website (Astro, Netlify).

Read first:
- docs/marketing/blog-product-cta-spec.md (leading for this task)

## Phase 1 — read-only audit

Do not change any files yet. Report on:

1. How the CTA in article 2 (pgb tekort zorgkantoor) is currently
   implemented: inline markup inside the article file, a shared component,
   or something else. Give the file path and the exact markup.
2. Whether @astrojs/mdx is already installed and configured in
   astro.config.mjs.
3. How blog articles are currently collected and rendered: content
   collections config, the article layout, the file extensions in use.
4. Where existing shared components live and what styling approach is used
   (Tailwind classes, scoped styles, design tokens).
5. Whether switching a single article from .md to .mdx would break the
   content collection schema, the slug, or the existing URL.

Stop after this report and wait for approval.

## Phase 2 — proposal

Based on the audit, propose:

- the component file path and prop signature;
- the minimal change needed to enable .mdx alongside existing .md;
- anything in the audit that contradicts the spec.

One proposal, not a menu. Wait for approval per edit.

## Phase 3 — build

Requirements for the component:

- Props: heading, body, buttonText, href, article, position. All required.
- Visually distinct from the article body, so a reader can see where
  editorial text ends and the offer begins.
- Consistent with the existing site styling. Do not introduce a new
  styling approach.
- No automatic injection into any layout. The component is placed by hand
  in the article file, at the point the brief specifies.
- No tracking library calls. Add a stable data attribute or a UTM-capable
  href so clicks can be attributed per article later. Ask before choosing
  the approach.

Requirements for the .mdx enablement:

- Existing .md articles must keep working unchanged.
- Article URLs must not change.

Do not write CTA copy. The copy comes from the approved article brief.

## Out of scope

- A second CTA at the bottom of articles.
- A newsletter signup.
- A Vooruitblik landing page.
- Retrofitting article 1. That is a separate task.