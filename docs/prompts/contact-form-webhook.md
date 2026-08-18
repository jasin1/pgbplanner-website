# Task: Rework website contact/newsletter form + add Contact nav link + hero secondary CTA

**Repository: marketing website (Astro v5, pgbplanner.nl) — NOT the app repo.**

## Context

The bottom-of-page form currently posts directly to Kit.com, adding every submitter to the mailing list. Two problems:

1. Visitors have no way to send a message or ask a question — there is no message field, and submissions go into Kit, not into an inbox.
2. Consent for receiving updates is implicit (submitting the form = subscribed), which we want to make explicit via a checkbox.

Note on wording: this is NOT a newsletter and must never be called one — not in UI copy, not in code identifiers, not in comments. The promise made to the visitor is occasional updates ("nieuwe ontwikkelingen en artikelen"), nothing with a fixed cadence. Use neutral naming like `subscribe` / `updates` in code.

We are decoupling the form from Kit entirely. The form will POST to an n8n webhook. All downstream routing (email notification via Resend, Kit subscription with tagging) happens in n8n and is **out of scope for this task** — it is built manually by the owner.

## Scope (3 changes, nothing else)

### 1. Navigation: add "Contact" link

Add a text link `Contact` to the main navigation, between `FAQ` and the login/CTA buttons. It anchors to the existing bottom form section (give that section `id="contact"` if it doesn't have a stable id). Same style as the other nav text links. Also add it to the mobile menu and the footer link list if the footer repeats nav items.

### 2. Hero: add secondary CTA button

Below/next to the existing primary button `Probeer 21 dagen gratis`, add a secondary (outline-style) button `Blijf op de hoogte` that anchors to the same `#contact` section. Primary button keeps visual dominance (filled); secondary is outline. Follow the existing design tokens of the site — do not invent new colors or spacing. On mobile the two buttons stack vertically, primary on top.

### 3. Form rework

Replace the current Kit-embedded form with a self-hosted form that POSTs JSON to an n8n webhook.

**Fields (in this order):**

| Field | Type | Required |
|---|---|---|
| Naam | text | yes |
| Email | email | yes |
| Welke PGB heb je? | select (existing options: WLZ, WMO, Jeugdwet, Anders) | no (optional) |
| Bericht | textarea, ~4 rows | no (optional) |
| Updates checkbox | checkbox, unchecked by default | no |
| Honeypot | hidden text field (see below) | — |

**Validation rules:**

- Email must be a valid email format.
- At least one of the following must be true: `Bericht` is non-empty, OR the updates checkbox is checked. If neither, block submit and show the inline error (see verbatim copy). Rationale: a submission with neither a message nor consent has no destination.
- Inline errors beneath fields, in Dutch (see verbatim copy).

**Spam protection (replaces reCAPTCHA):**

- Remove the Google reCAPTCHA widget and its script entirely.
- Add a honeypot: a visually hidden text input (e.g. name `website`, hidden via CSS `position:absolute; left:-9999px` + `tabindex="-1"` + `autocomplete="off"` + `aria-hidden="true"`). Its value is included in the payload; n8n discards submissions where it is non-empty.
- Record `formRenderedAt` (timestamp when the form mounted) and include elapsed seconds in the payload as `elapsedSeconds`. n8n discards submissions faster than a threshold. No client-side blocking logic beyond collecting these values.

**Submission:**

- POST JSON to the webhook URL from an environment variable: `PUBLIC_CONTACT_WEBHOOK_URL` (Astro public env var; set via Netlify env settings — add it to `.env.example` with a placeholder).
- Payload shape:

```json
{
  "name": "…",
  "email": "…",
  "pgbType": "WLZ | WMO | Jeugdwet | Anders | null",
  "message": "… or empty string",
  "subscribe": true,
  "website": "",
  "elapsedSeconds": 42
}
```

- Disable the submit button while the request is in flight (synchronous guard so double-clicks cannot double-submit).
- On HTTP success: replace the form with the success state (see verbatim copy). Do not reset to an empty form.
- On failure (network error or non-2xx): keep the filled form intact and show the error message above the submit button. Never wipe user input on failure.

**Keep:**

- The surrounding section layout, heading, intro text, email address, disclaimer line, and social links stay as they are, except the disclaimer line `*We sturen alleen updates…` which is replaced (see verbatim copy) because consent is now handled by the checkbox.

## Verbatim Dutch UI copy — do not translate, do not rephrase

- Checkbox label: `Houd me op de hoogte van nieuwe ontwikkelingen en artikelen`
- Bericht field label: `Bericht (optioneel)`
- Bericht placeholder: `Stel gerust je vraag`
- Welke PGB field: keep existing label and options unchanged, add `(optioneel)` to the label
- Replacement for the old disclaimer line: `Je ontvangt alleen updates als je het vakje aanvinkt. Uitschrijven kan altijd.`
- Validation error, email invalid: `Vul een geldig e-mailadres in`
- Validation error, name empty: `Vul je naam in`
- Validation error, neither message nor checkbox: `Schrijf een bericht of vink aan dat je op de hoogte wilt blijven`
- Submit button: `Versturen` (unchanged)
- Submit button while sending: `Versturen…`
- Success state heading: `Verstuurd!`
- Success state body: `Bedankt voor je bericht. Ik reageer meestal binnen één werkdag.` — shown only if a message was included; if only the checkbox was checked show instead: `Je staat op de lijst. Ik houd je op de hoogte.`
- Failure message: `Versturen is niet gelukt. Probeer het opnieuw of mail naar info@pgbplanner.nl`

## Out of scope — do not build

- Anything in n8n, Resend, or Kit (owner builds this manually).
- Server-side validation or serverless functions.
- Changes to any other page section, styling refactors, or new dependencies.
- Do not add a client-side rate limiter, cookie, or localStorage usage.

## Notes / assumptions

- CORS: the webhook lives on another domain. The n8n webhook will be configured to allow origin `https://www.pgbplanner.nl`. If preflight fails during testing, report it — do not work around it with a proxy.
- If the current form markup is a Kit embed script rather than native HTML, replace it with native form markup styled to match the existing fields shown on the live site.
- Confirm the exact files you will touch before writing changes, per repo guardrails.
