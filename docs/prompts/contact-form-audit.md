# Task: Read-only audit of the current contact/signup form integration

**Repository: marketing website (Astro v5, pgbplanner.nl) — NOT the app repo.**

**This is a READ-ONLY task. Do not create, modify, or delete anything. Output is a written report only.**

## Context

The bottom-of-page form on the homepage ("Nog niet klaar om te starten?") was hand-built over a year ago and modified since. It visually renders custom fields (Naam, Email, "Welke PGB heb je?" dropdown, reCAPTCHA) but submits to Kit.com (formerly ConvertKit) under the hood, via an embed/JS integration. The owner no longer remembers the exact wiring. Before we rework this form (planned: decouple from direct Kit submission, add a message field and an explicit updates checkbox, route via an n8n webhook), we need an exact picture of what exists today.

## Questions to answer

### 1. Form wiring
- Which file(s) contain the form markup and its submission logic? List exact paths.
- How does submission reach Kit? Identify the mechanism: Kit embed `<script>` tag, a POST to a Kit form endpoint (e.g. `app.kit.com/forms/{id}/subscriptions` or the ConvertKit equivalent), a fetch/XHR in custom JS, or something else. Quote the relevant code.
- **Which Kit form ID does it submit to?** The owner has three Kit forms (Landingpage aanmeldingen, Launch Waitlist, vragenlijst) and needs to know which one is actually connected.
- Which fields are sent, and under which parameter/field names? Specifically: how are Naam and the PGB dropdown transmitted (custom fields? ignored?).
- Is there any client-side validation, and what does it check?

### 2. reCAPTCHA
- How is reCAPTCHA integrated? Which script, which site key, where does the token go on submit?
- Is the token verified anywhere (server-side, serverless function, or passed to Kit), or is it render-only theater that nothing actually checks?

### 3. Post-submission behavior
- What happens after a successful submit in the current code: inline success message, redirect, or Kit-controlled behavior?
- Does a `/bedankt` page exist in this repo? (Kit form settings redirect to `https://www.pgbplanner.nl/bedankt`.) If yes: path, and is it linked from anywhere else?

### 4. Other Kit traces
- Search the whole repo for any other Kit/ConvertKit references (scripts, API calls, env vars, config, other pages with forms). List everything found, so we know the full blast radius before changing anything.

### 5. Form infrastructure
- Are there existing env vars, serverless/edge functions, or Netlify form handling related to this form?
- Anything else unusual about this form a rework should know about (e.g. duplicated markup between desktop/mobile, inline styles that will break, analytics events attached to submit).

## Output format

A single report with:
1. A plain-language summary (5–10 sentences) of how the form works today, end to end.
2. Per question above: the answer with file paths and short code quotes as evidence.
3. A short list titled "Risks for the planned rework" — anything that would break or behave unexpectedly if the form stops posting directly to Kit (e.g. double opt-in confirmation emails, the /bedankt redirect, tags applied by the Kit form itself).

Do not propose solutions or write any implementation code. Audit only.
