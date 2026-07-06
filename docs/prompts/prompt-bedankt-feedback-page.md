Task: create a new public thank-you page at /bedankt-feedback in the PGB Planner website repo.

Context
- This is the marketing website repo, not the app repo.
- Follow CLAUDE.md exactly.
- Keep everything in Dutch.
- Do not add dependencies.
- Use existing design tokens and utility classes only.
- This page is for users who completed a short Tally feedback form from an email, so they may or may not be logged in.
- Therefore this must be a fully public website page, not an app page.

Goal
Create a simple public page at:
- src/pages/bedankt-feedback.astro

Requirements
1. Use BaseLayout.
2. No extra navigation or complex sections on the page itself.
3. Keep the page visually calm, warm, and trustworthy.
4. Use the existing website styling system and tokens from main.css.
5. Keep the implementation lightweight and consistent with the existing pages /bedankt and /bedankt-vragenlijst.
6. Add this new page to docs/sitemap.md.

Content
Title:
Dankjewel voor je feedback

Body text:
Je helpt hiermee om PGB Planner stap voor stap beter en duidelijker te maken.

Optional small extra line:
Ik ga hier direct mee aan de slag.

Optional CTA:
A subtle link or button back to the homepage:
Terug naar pgbplanner.nl

Metadata
- Set a suitable page title and description in BaseLayout props.

Implementation notes
- First inspect existing pages:
  - src/pages/bedankt.astro
  - src/pages/bedankt-vragenlijst.astro
  - src/layouts/BaseLayout.astro
  - src/styles/main.css
- Reuse existing patterns where possible.
- Do not invent a new visual system.
- Do not touch unrelated files.

Definition of done
- New route works at /bedankt-feedback
- Page looks consistent with the existing site
- Sitemap doc updated
- Show me which files were changed