# Task: localhost pageviews are being sent to the wrong PostHog project

## Context

PostHog is used with two deliberately separate EU Cloud projects:
- 246828, website (pgbplanner.nl)
- 150066, app (app.pgbplanner.nl)

The split is intentional. Only the app project runs identify(). Website
data must never land in the app project, because that would let anonymous
website visits be linked to identified users, which the privacy statement
prohibits.

Observed symptom: pageviews for http://localhost:4321/ and
http://localhost:4321/blog/... appear in project 150066. Those come from
running this website repo in development.

## Phase 1: read-only audit. Make no changes.

1. Find every place PostHog is initialised in this repo, with file paths.
2. For each, report which project token is used and where it comes from:
   hardcoded, .env, .env.local, a Netlify environment variable, or a
   fallback default in the code.
3. Report whether any fallback or default token exists that gets used when
   the expected variable is missing or empty. If such a fallback points at
   the app project, say so explicitly.
4. Report whether PostHog initialises at all in development, and whether
   any guard exists on hostname or import.meta.env.DEV.
5. Check .env.example and any documentation in this repo for which variable
   names are expected, and whether they match what the code actually reads.
6. State plainly which of these explains the observed behaviour. If the
   cause cannot be found in this repo, say that instead of guessing.

Do not read or modify the app repo.

Report and stop.

## Phase 2: proposal

One proposal, not a menu. It must cover both:

- the correct token per environment, and how a missing variable fails
  loudly instead of silently falling back to the wrong project
- whether PostHog should initialise at all on localhost

My preference is that it does not initialise in development, so no
development traffic reaches either project. Tell me if that makes anything
harder to debug.

Wait for approval.

## Phase 3

Confirm each edit individually. Do not use "allow all edits".

After the change, tell me exactly how I can verify it myself, both locally
and on the live site.

## Verification

Confirmed 21 augustus 2026.

**Path 1, npm run dev sends nothing.** Run `npm run dev`, open
`http://localhost:4321/`, DevTools Network tab filtered on `posthog`.
Expect zero requests to `eu.i.posthog.com`. The `posthog-js` bundle itself
still loads, since `analytics.ts` imports it at module level; that is a
script load, not a call to PostHog's ingestion endpoint, and is expected.

**Path 2, a production build still initialises normally.** `astro preview`
does not support the Netlify adapter, so this cannot be checked locally
with `npm run build && npm run preview`. Verify on the deployed site
instead: after deploy, open the live site, DevTools Network tab filtered
on `posthog`, and confirm a request fires on page load. Then check the
PostHog dashboard's website project (246828) Live Events for that
pageview, and confirm nothing appears in 150066 (app) for the same
session.

## Out of scope

Any change to the app repo. Any change to event names, properties or
tracking logic. Any new analytics. The netlify.app duplicate-host issue,
which is a separate task.