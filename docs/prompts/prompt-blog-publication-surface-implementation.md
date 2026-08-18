# Implementation spec: finish blog publication surface (pgbplanner-website)

**Prerequisite:** the read-only audit (`docs/prompts/prompt-blog-branch-readonly-audit.md`, report of 2026-07-22) established that `feat/blog` is fully merged into `main`, the draft protection works, and current `main` is healthy. This spec covers the remaining gap to the target end state.

**Process rules:**
- Create a fresh, short-lived feature branch off current `main`: `feat/blog-publication-surface`.
- Confirm each production-file edit with me individually. Do not use "allow all".
- Temporary dummy article creation, verification, and cleanup may be handled as one separately approved test step.
- Package installation may update `package.json` and the existing lockfile only; show the expected files before running it.
- Scope is exactly the four workstreams below. Anything outside them requires my explicit approval first — including refactors you happen to notice along the way.

### Pre-implementation gate

Before the first source-file edit:

1. Show the current branch and `git status --short`.
2. Fetch origin and verify that the new branch is created from the current `origin/main`.
3. Do not stash, delete, move, or add any pre-existing unrelated untracked files.
4. Inspect the relevant implementation files and report:
   - the exact proposed homepage section position;
   - the exact production files you expect to modify or create;
   - whether `BaseLayout.astro` already supports all required article metadata;
   - exactly which routes need `export const prerender = true`;
   - whether `robots.txt` exists and the exact proposed change;
   - any assumptions or risks.
5. Wait for my approval before making the first source-file edit.

---

## Hard constraints

1. **Never change the Rdah draft to published.** `src/content/blog/2026-02-rdah/index.md` stays `draft: true` and its content stays untouched. It will be fully rewritten in a later content task; flipping the flag is never sufficient and is out of scope here.
2. **Do not touch:** `SignupSection.astro` contact-form logic/validation/reCAPTCHA, `src/pages/api/contact.ts`, existing homepage copy (source of truth: `docs/marketing/homepage-copy-master.md`), mobile-menu logic, Footer. The homepage edit is additive only: one new section, nothing else moves.
3. No new libraries beyond `@astrojs/sitemap` (approved below). No CMS, no pagination, no categories, no search, no analytics work.
4. Reuse existing layouts, card patterns, and design tokens. The blog surface must look like the rest of the site: calm, minimal, no stock photos.

---

## Workstream 1: homepage "recent articles" section

- New section on `src/pages/index.astro` showing the **3 most recent published articles** (non-draft, sorted by `pubDate` desc).
- **Zero published articles → the section renders nothing at all.** No empty state, no heading, no placeholder. The homepage must look exactly as it does today until the first article is published.
- Each card: article title, publication date (NL format, consistent with `BlogPostLayout.astro`), description from frontmatter, linking to the article page.
- No "view all articles" link in this section for now — the `/blog` index becomes reachable via the nav link once the threshold below is met. (Flag it to me if you think this is wrong after seeing the layout.)
- Placement: propose a position in the homepage flow and confirm with me before building (likely between existing content sections, above the signup/CTA area — do not push the primary CTA down significantly).

**Dutch UI copy — verbatim, do not translate or edit:**

```
Section heading: "Laatste artikelen"
```

Card content comes from frontmatter (title, description, date) — no other hardcoded copy in this section.

## Workstream 2: conditional "Blog" nav link

- In `src/components/Header.astro`: add a "Blog" nav item that renders **only when there are 4 or more published (non-draft) articles**.
- The count must be computed from the content collection at build/render time — no manual toggle, no config flag. The link appears automatically when article 4 is published.
- Label, verbatim: `Blog`. Links to `/blog`.
- Must work identically in the mobile menu without modifying mobile-menu logic beyond adding the conditional item to the same nav data structure.
- The visibility ladder, for reference: 0 articles → no homepage block, no nav link. 1–3 → homepage block, no nav link. 4+ → both.

## Workstream 3: sitemap

- Add `@astrojs/sitemap` (dependency approval: **granted for this one package**) and configure it in `astro.config.mjs` with the production `site` URL.
- **Critical verification:** the site runs `output: 'server'` with a Netlify adapter. `@astrojs/sitemap` only includes prerendered routes. Verify that `/blog`, the article pages, and ideally the main static pages are prerendered (`export const prerender = true`) so they land in the sitemap. If the blog routes are not currently prerendered, prerendering them is in scope; report what you find before changing rendering modes on any non-blog page.
- Draft articles must never appear in the sitemap. Verify this in the build output.
- Confirm the sitemap URL is emitted (e.g. `/sitemap-index.xml`) and add a `Sitemap:` line to `robots.txt` if one exists (create a minimal one if it does not — that is in scope).
- Use the repository's existing package manager and install only `@astrojs/sitemap`. Do not use an automated `astro add` command if it would make unreviewed configuration changes.
- If `robots.txt` does not exist, propose its exact minimal contents before creating it. Do not add any `Disallow` rules.

## Workstream 4: production polish

- Remove `// @ts-nocheck` from `src/pages/blog/[...slug].astro` and fix the underlying types properly.
- Verify per-article SEO metadata flows through `BaseLayout.astro`: title, description, canonical, Open Graph. Articles must not need any per-article SEO work beyond frontmatter.
- If `BaseLayout.astro` does not already support all required article metadata, do not modify it immediately. Report: the exact metadata gap; the minimal proposed prop/API change; which existing pages could be affected. Wait for my explicit approval before editing this global layout.
- Verify the `_templates/blog-post.md` template matches the actual frontmatter schema (title, description, pubDate, draft, heroAlt) so the Obsidian workflow is copy-template-and-write.

---

## Definition of done (verify each, report results)

1. `npm run build` succeeds with zero errors.
2. With 0 published articles (current state):
   - the homepage is visually unchanged;
   - no Blog nav link is rendered;
   - `/blog` shows the existing empty message;
   - `/blog` itself may appear in the sitemap if it is prerendered;
   - no individual `/blog/<article-slug>` URL appears in the sitemap;
   - the Rdah draft URL does not render draft content. A 404 or redirect to `/blog` is acceptable.
3. Test with a temporary dummy published article (create it, verify, then **delete it before the final commit** — it must never be merged): article page renders with correct metadata, homepage section appears with the card, sitemap contains the article URL.
4. Simulated 4-article state (temporarily, same cleanup rule): Blog nav link appears on desktop and mobile.
5. Rdah file untouched: `git diff` on `src/content/blog/2026-02-rdah/` is empty.
6. No changes to the untouchable files listed under Hard constraints (show `git diff --stat` against `main` at the end).
7. Clean, reviewable commits; branch ready for merge to `main` after my review.

Report the full `git diff --stat` and the verification results, then stop before merging. I merge after review.
