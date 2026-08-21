# Task: redirect the .netlify.app host to the canonical domain

## Context

The production site is served from www.pgbplanner.nl. It is also reachable
at pgbplanner.netlify.app, which serves the same pages from a second host.

Two problems follow from that:
- PostHog records those visits as separate pageviews on a different host
- every blog article exists as an indexable duplicate on a second domain,
  which matters because organic search is the main acquisition channel

This project uses the Astro Netlify adapter, which emits a _redirects file
during the build. Any redirect must be part of the repo, not configured by
hand in the Netlify UI, so that it lives in version control and does not
conflict with what the adapter generates.

## Phase 1: read-only audit. Make no changes.

1. Report the current Netlify configuration in this repo: netlify.toml,
   any static _redirects or _headers file, and the adapter options in
   astro.config.
2. Report what the adapter currently emits into _redirects at build time,
   based on the build output already present in dist/ if it exists.
3. Report whether any redirect from the .netlify.app host already exists.
4. Report how canonical URLs are generated, in BaseLayout.astro and
   anywhere else. State plainly whether they are absolute and always point
   at www.pgbplanner.nl, or whether they derive from the request host and
   therefore differ per domain.
5. Report the same for og:url, the sitemap, and robots.txt: fixed domain or
   host-dependent.
6. Report whether Astro's `site` option is set in astro.config, and to what.

Report and stop.

## Phase 2: proposal

One proposal, covering:

- a 301 redirect from the pgbplanner.netlify.app host to the same path on
  www.pgbplanner.nl, preserving the path and query string
- whether it can coexist with what the adapter emits, and where in the
  build order it lands
- if canonicals or og:url turn out to be host-dependent, the fix for that
  as well, since a self-referencing canonical on the duplicate host is a
  real duplicate-content problem rather than only analytics noise

Deploy previews and branch deploys must keep working. Only the production
.netlify.app host is redirected.

Wait for approval.

## Phase 3

Confirm each edit individually. Do not use "allow all edits".

Then run the production build and report whether the emitted _redirects
contains what was intended.

Tell me exactly how to verify it myself after deploy.

## Out of scope

Any change to PostHog configuration or tracking. Any change to article
content. Any other SEO work: meta descriptions, structured data, internal
linking. Custom domain or DNS changes in Netlify.