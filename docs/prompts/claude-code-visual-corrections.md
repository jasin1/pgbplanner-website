Apply these corrections to the current implementation, then proceed. This covers visual/copy refinements identified during screenshot review — no content-phase copy is being reopened.

## 1. Hero — two-tone heading, no copy change

Split the existing H1 text (unchanged): "Weet het hele jaar" in `primary` (blue), "of je uitkomt met je PGB-budget." in `secondary`/green — matching the old hero's two-tone treatment. Text content itself does not change.

## 2. Vertrouwensblok — revert visual treatment, keep copy

Remove the green background card styling. Rebuild using the same wide, centered, no-background section layout as the old "Daarom bouw ik PGB Planner" section (centered heading, centered body text, generous whitespace, no background fill). The approved copy text itself stays exactly as implemented — this is a container/layout change only.

## 3. Inloggen — reuse existing secondary button style

Style the "Inloggen" link as a button using the exact same existing button classes/styling as the "Geef jouw input" button in the hero. Do not create a new outline button variant — reuse the existing secondary button component/classes as-is. Href remains `https://app.pgbplanner.nl/login`.

## 4. Restore the mid-page CTA section (before Preview) with new copy

The old "Blijf op de hoogte van PGB Planner" card section was removed earlier in this session and is not yet committed. To recover its markup and styling:

- First try: `git show HEAD:src/pages/index.astro` to read the last committed version of the file, which should still contain the old section.
- Fallback only if not found there: `git show main:src/pages/index.astro`.
- This is a **read-only** git operation. Do NOT checkout, switch branches, reset, or cherry-pick. Do NOT overwrite the current working file — only extract the relevant section's markup/styling by reading the output and manually re-inserting it into the current `index.astro` at the same position (immediately before Preview).

Reuse the existing card component structure (rounded card, logo placement, shadow, layout) exactly as it was. Replace only the text content and CTA with:

- **Kop:** Wil je weten of je uitkomt met je budget?
- **Body:** Je voegt je budget en zorgverleners toe, en ziet binnen een paar minuten of je op koers ligt. 21 dagen gratis, geen betaalgegevens, geen verplichtingen.
- **Knop:** Probeer 21 dagen gratis → `https://app.pgbplanner.nl/registreer`

No signup form in this section. Do not modify `SignupSection.astro`; it remains unchanged from the previous implementation.

## 5. URL confirmation (no change, stated for clarity)

- Inloggen → `https://app.pgbplanner.nl/login`
- Primary CTA (all instances) → `https://app.pgbplanner.nl/registreer`

## Scope discipline

Do not touch any other copy, layout, component, or styling beyond these five points. After implementation, run the build and review the diff specifically for unintended changes outside these five items.
