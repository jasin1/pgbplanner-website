This is a PRE-IMPLEMENTATION INSPECTION task.

You are already on branch:

feat/contact-form-rework

Do not create or switch branches. Stay on this branch.

Do not create, modify, delete, rename, move, stage, commit, or format any files yet.

Important:
The working tree already contains several unrelated untracked files, including files under docs/marketing/ and docs/prompts/. These existed before this task. Do not touch, stage, delete, rename, or include them in this work.

Repository:
The Astro v5 marketing website for pgbplanner.nl — NOT the React application repository.

Context

A read-only audit of the existing homepage form has already been completed.

Confirmed existing behavior:

- The form is in src/components/SignupSection.astro.
- It is rendered once from src/pages/index.astro.
- It currently posts directly to Kit form 8738389, named “Launch Waitlist”.
- It is custom Astro/HTML markup, not Kit’s visual embed markup.
- The current reCAPTCHA v2 implementation is real and working:
  - the browser obtains a reCAPTCHA token;
  - /api/verify-recaptcha verifies it server-side with Google;
  - submission fails closed when verification fails.
- Kit currently has:
  - no confirmation email enabled;
  - no double opt-in;
  - no connected automations;
  - a redirect to /bedankt.
- n8n will be built manually by the owner. Claude Code must not build or configure anything in n8n, Resend, or Kit.

Read before reporting:

- docs/prompts/contact-form-audit.md
- docs/prompts/contact-form-webhook.md
- src/components/SignupSection.astro
- src/pages/api/verify-recaptcha.ts
- src/pages/index.astro
- src/pages/bedankt.astro
- the files responsible for:
  - desktop navigation;
  - mobile navigation;
  - footer navigation;
  - homepage hero CTA buttons;
- relevant global styles and design tokens;
- CLAUDE.md and any repository instructions relevant to implementation and environment variables.

The old specification in docs/prompts/contact-form-webhook.md is only a partial source.

Its page content, field requirements, validation copy, and general UX are useful.

Its architecture is no longer authoritative where it says:

- remove reCAPTCHA;
- replace reCAPTCHA with honeypot and elapsedSeconds;
- expose a PUBLIC_CONTACT_WEBHOOK_URL;
- submit directly from the browser to n8n.

Corrected architecture — authoritative

1. Keep Google reCAPTCHA v2.

2. Do not replace it with a honeypot, elapsedSeconds, a client-side rate limiter, cookies, or localStorage.

3. The browser must not post directly to n8n.

4. The browser submits JSON to a same-origin Astro API endpoint, expected to be:

   /api/contact

5. The Astro API endpoint must:

   - accept POST requests only;
   - parse the JSON request safely;
   - perform minimal server-side validation;
   - verify the reCAPTCHA token with Google using the existing server-only RECAPTCHA_SECRET_KEY;
   - fail closed if the token is missing, invalid, verification fails, or Google cannot be reached;
   - only after successful validation and reCAPTCHA verification, forward a sanitized payload to n8n;
   - use a server-only environment variable named CONTACT_WEBHOOK_URL;
   - never expose the n8n webhook URL to browser code;
   - never forward the reCAPTCHA token to n8n;
   - return a minimal JSON success or error response to the browser;
   - avoid logging personal form contents, webhook URLs, secrets, or the full Google verification response.

6. n8n, Resend, and Kit routing are entirely out of scope.

7. Do not add new dependencies, abstractions, libraries, proxy layers, database storage, analytics events, or reusable form frameworks.

8. Reuse the existing reCAPTCHA implementation where sensible, but do not preserve obsolete architecture merely to avoid a small safe change.

9. Remove obsolete code only when it becomes genuinely unused by this rework.

10. Do not delete /bedankt. The new form will no longer redirect there, but the page must remain in place.

Planned page changes

Navigation

- Add a text link “Contact” pointing to #contact.
- Desktop: position it between FAQ and the login / primary CTA area.
- Add the same Contact link to the mobile menu.
- Add it to the footer only if the footer currently repeats comparable homepage navigation links.
- Follow existing link styles and tokens.

Hero

- Add a secondary outline CTA:
  “Blijf op de hoogte”
- It anchors to #contact.
- Keep the existing primary CTA visually dominant.
- Follow existing button styles and design tokens.
- On mobile, stack both CTAs vertically with the primary CTA first.

Contact section

- Give the existing bottom form section id="contact".
- Preserve the surrounding section structure, heading, intro copy, email address, social links, and general visual design unless a small copy change is explicitly required below.
- Do not redesign the section.

Form fields, in this order

1. Naam
   - text
   - required

2. Email
   - email
   - required

3. Welke PGB heb je? (optioneel)
   - select
   - optional
   - preserve the current available options exactly as found in the existing form

4. Bericht (optioneel)
   - textarea
   - approximately four rows
   - placeholder:
     “Stel gerust je vraag”

5. Updates checkbox
   - unchecked by default
   - label:
     “Houd me op de hoogte van nieuwe ontwikkelingen en artikelen”

6. Existing Google reCAPTCHA v2 widget

Do not use the word “newsletter” anywhere in:

- UI text;
- code identifiers;
- comments;
- documentation added or changed by this task.

Client payload to /api/contact

The browser is expected to submit:

{
  "name": "…",
  "email": "…",
  "pgbType": "… or null",
  "message": "… or empty string",
  "subscribeToUpdates": true,
  "recaptchaToken": "…"
}

Sanitized payload forwarded by /api/contact to n8n

{
  "name": "…",
  "email": "…",
  "pgbType": "… or null",
  "message": "… or empty string",
  "subscribeToUpdates": true
}

The reCAPTCHA token must not be forwarded.

Consent rule

- A contact message is not consent for updates.
- subscribeToUpdates=false means the person must not be added to Kit by the downstream n8n workflow.
- The frontend and API must preserve the distinction between:
  - message only;
  - updates only;
  - message and updates.

Client-side validation

- Name is required.
- Email must be a valid email address.
- At least one of these must be true:
  - message contains non-whitespace text;
  - updates checkbox is checked.
- A reCAPTCHA response is required.
- Client-side validation exists for UX only.
- The API endpoint must independently validate the important rules.

Server-side validation

At minimum validate:

- name is a non-empty trimmed string;
- email is a valid and reasonably bounded string;
- pgbType is either one of the existing allowed values or null;
- message is a string and reasonably bounded;
- subscribeToUpdates is a boolean;
- message contains non-whitespace text OR subscribeToUpdates is true;
- recaptchaToken is a non-empty string.

Do not invent extensive validation or a new validation library.

Verbatim Dutch UI copy

Do not translate or rephrase these strings.

PGB label:
“Welke PGB heb je? (optioneel)”

Message label:
“Bericht (optioneel)”

Message placeholder:
“Stel gerust je vraag”

Checkbox:
“Houd me op de hoogte van nieuwe ontwikkelingen en artikelen”

Consent explanation:
“Je ontvangt alleen updates als je het vakje aanvinkt. Uitschrijven kan altijd.”

Name error:
“Vul je naam in”

Email error:
“Vul een geldig e-mailadres in”

Neither message nor updates:
“Schrijf een bericht of vink aan dat je op de hoogte wilt blijven”

Missing reCAPTCHA:
Preserve the existing Dutch message where possible. If the current message is unsuitable, report that before implementation rather than inventing a substantially different flow.

Submit button:
“Versturen”

Sending:
“Versturen…”

Failure:
“Versturen is niet gelukt. Probeer het opnieuw of mail naar info@pgbplanner.nl”

Success heading:
“Verstuurd!”

Success — message only:
“Bedankt voor je bericht. Ik reageer meestal binnen één werkdag.”

Success — updates only:
“Je staat op de lijst. Ik houd je op de hoogte.”

Success — message and updates:
“Bedankt voor je bericht. Ik reageer meestal binnen één werkdag en houd je op de hoogte.”

Required frontend behavior

- Prevent duplicate submissions with a synchronous guard.
- Disable the submit button while a request is in flight.
- Preserve all entered values after network or server failure.
- Show the failure message without wiping the form.
- On successful submission, replace the form with the matching success state.
- Do not redirect to /bedankt.
- Do not directly contact Kit from the browser.
- Do not directly contact n8n from the browser.
- Reset or remove reCAPTCHA state only where appropriate after the result is known.
- Keep accessibility and existing responsive behavior intact.

Environment variables

Expected existing variable:

- PUBLIC_RECAPTCHA_SITE_KEY
- RECAPTCHA_SECRET_KEY

Expected new server-only variable:

- CONTACT_WEBHOOK_URL

Inspect how environment variables are currently documented in this repository.

Do not expose CONTACT_WEBHOOK_URL through import.meta.env on the client.

If no .env.example exists, report that fact and whether creating one would be consistent with the repository, but do not create it during this inspection.

Existing reCAPTCHA route

Determine from actual repo usage whether src/pages/api/verify-recaptcha.ts should:

- be reused;
- have its logic extracted or moved into /api/contact;
- or be removed after /api/contact owns the complete flow.

The preferred end state is one production submission endpoint rather than:

browser → verify endpoint → browser → contact endpoint

However, base your recommendation on the actual code and report it before implementation.

Security and privacy constraints

- Never log submitted name, email, message, PGB type, reCAPTCHA token, secrets, or webhook URL.
- Do not log the full Google siteverify response.
- Do not return internal errors or webhook details to the browser.
- Treat non-2xx responses from n8n as a submission failure.
- Use a reasonable request timeout only if an existing project pattern already exists; do not invent infrastructure during this inspection.
- No persistence in the marketing website.

Before implementation, report and STOP

Return a concise inspection report containing:

1. Current branch name.

2. Current git status, clearly separating the unrelated pre-existing untracked files.

3. Exact files that would be modified.

4. Exact files that would be created.

5. Exact files that would be deleted, if any.

6. Why each file is necessary.

7. Exact navigation, mobile menu, footer, hero, form, and API files discovered.

8. Whether footer modification is actually required based on its current structure.

9. Whether src/pages/api/verify-recaptcha.ts should be:
   - reused;
   - replaced by /api/contact;
   - or removed after its logic moves;
   with evidence from current usage.

10. Any mismatch between this specification and the current repository.

11. Any existing code that will become dead or obsolete after implementation.

12. A concise implementation sequence.

13. The validation and response contract proposed for /api/contact.

14. Any blocker that requires an owner decision.

15. Confirmation that no files were changed, staged, committed, or deleted.

Do not provide patches yet.
Do not implement anything yet.
Stop after the report.