# Read-only website audit — pgbplanner-website

## Mode: READ-ONLY. Do not change anything.

You are auditing the `pgbplanner-website` repository (the marketing/landing site, Astro-based — separate from the app repo). This site was partly hand-built in Astro before Claude Code was introduced, so documentation is less mature than the app side.

**Hard constraints for this session:**
- Do **not** modify, create, delete, or rename any file.
- Do **not** run any command that writes, installs, builds, or commits.
- You may only **read** files and search the codebase.
- Deliver your findings as a written report in your response. Do **not** write it to disk unless I explicitly ask afterward.
- Where a value matters (meta text, footer text, CTA targets), **quote it verbatim** and give the **exact file path**. Do not paraphrase.

## Context: why this audit

We are about to convert the homepage copy from pre-launch/waitlist framing ("binnenkort", "in ontwikkeling", "blijf op de hoogte") to live product / trial-first framing (primary CTA "Probeer 21 dagen gratis", pointing to app.pgbplanner.nl). Before implementing, we need an accurate map of the current state so implementation is fast and nothing gets missed.

## Answer these two questions FIRST (highest priority)

**Q1 — Do the homepage meta tags already exist, and what do they currently say?**
- Locate the homepage `<title>`, `<meta name="description">`, and Open Graph tags (og:title, og:description, og:image, twitter card if present).
- Report exactly where they are defined (per-page frontmatter, a shared Layout component, a dedicated SEO/Head component, or a config file).
- Quote the **current values verbatim**. We specifically need to know whether they still contain pre-launch language.

**Q2 — What is the current footer, and what supporting pages exist?**
- Show the current footer structure and quote its text (tagline, copyright year, KvK if present).
- List which linked pages/routes actually exist: privacy policy, algemene voorwaarden, cookies, contact, login. For each, say whether the page/route exists or the link is dead/missing.

## Then the broader audit

3. **Project structure** — Astro version, how pages/routes are organized, key directories, and how the dev server is run.

4. **Homepage composition** — Which file(s) render the homepage. How is it split into sections/components? Map each existing section to these known sections and report which file holds each: hero, "waarom naast SVB", probleem/Excel, vertrouwensblok, voor wie, zo werkt het, CTA's, FAQ. **Where does the actual copy text live** — inline in `.astro` files, in a content collection, in a data/JSON file, or in a config? This determines how we implement the new copy.

5. **Navbar / header** — How is it built, is it a shared component across pages, what links and CTAs does it currently contain, and where does "Blijf op de hoogte" live?

6. **CTA implementation** — Where does the current primary CTA point? How does the newsletter/waitlist signup currently work (Kit/ConvertKit, Tally, other)? What would need to change to make the primary CTA a trial link to app.pgbplanner.nl?

7. **Blog** — Structure of the blog overview page and the article template. How is the blog header set (does it reuse the shared site header, or its own)? Is the blog currently linked from the nav, and is it currently visible/published or gated?

8. **Shared components / blast radius** — Which layout and components are shared between the homepage and the blog (header, footer, SEO/Head, buttons)? We need to know what a header or CTA change would ripple into.

9. **Docs inventory** — List existing docs, including `CLAUDE.md`. Summarize briefly what is documented and what is notably missing.

10. **Remaining pre-launch language** — Search the whole site for waitlist/pre-launch phrasing ("binnenkort", "in ontwikkeling", "blijf op de hoogte", "betafase", "wachtlijst", "meld je aan", "wordt", and similar). List **every** location with file path, so we know the full scope of the pre-launch-to-live swap.

## Output format

A single markdown report, organized by the sections above (Q1, Q2, then 3–10). File paths for everything, verbatim quotes where it matters. End with a short list titled **"Open questions for Jasin"** if anything is ambiguous. No code changes.
