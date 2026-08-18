# Read-only audit: feat/blog branch (pgbplanner-website)

**Goal of the overall task:** finish the existing blog branch so the marketing site has a production-ready publication surface before August. This prompt covers the audit phase only.

**Mode: strictly read-only.** Do NOT merge, rebase, commit, push, checkout-switch with destructive effects, modify, create, or delete any files. Only inspection commands (`git status`, `git log`, `git diff`, `git fetch`, `find`, `grep`, `cat`, `ls`). Stop after producing the audit report.

---

## Known context

- Repo: `pgbplanner-website` — Astro 5, deployed via Netlify.
- The blog lives on the long-running WIP branch `feat/blog`, started in April 2026.
- The branch may also contain old homepage and navigation changes that do NOT belong to the blog.
- `main` has changed multiple times since, including a homepage copy rewrite (source of truth: `docs/marketing/homepage-copy-master.md`). A merge must NOT bring back old versions of the homepage, header, footer, CTAs, or mobile menu.
- On July 6 the local branch was 4 commits ahead of `origin/feat/blog` (last known pushed commit around `f4cfaae`), with additional uncommitted/untracked changes. Local state may differ from origin.
- A prior read-only audit exists: `docs/audit/website-readonly-audit-2026-07-06.md`. Read it first as background if present.
- The blog was largely built and existed in staging: individual article pages could technically already be published. What was missing: the production-ready publication surface (index page, homepage section, navigation, visibility rules, polish).

## Target end state (for reference — not to build now)

- Publishing a new article = adding one Markdown file with valid frontmatter (author writes in Obsidian). No per-article changes to routes or components.
- Working `/blog` index page, individual article pages, sorted by publication date, only published articles visible.
- Drafts must never appear or be indexable in production.
- Homepage shows at most 3 published articles; no empty blog section when there are none.
- The "Blog" navigation link appears only once 4+ articles are published.
- Blog pages use the existing `BaseLayout.astro` so canonical, Open Graph, and global metadata are not reinvented. Published articles must end up in the sitemap.
- Use existing layouts and patterns. No new libraries, no CMS, no unnecessary abstractions.

---

## Audit steps

1. **Local state.** Show current branch, `git status`, and all local/untracked changes. Note anything uncommitted that could be lost.
2. **Sync check.** `git fetch origin` (fetch only). Report whether the local `feat/blog` still differs from `origin/feat/blog` — specifically whether the 4 commits from July 6 were ever pushed.
3. **Branch comparison.** Compare `origin/main` vs `origin/feat/blog` (and local `feat/blog` if it differs):
   - merge-base
   - commits only on `feat/blog`
   - full list of files that differ
4. **Blog inventory.** Map every existing blog piece on the branch:
   - content collection / `src/content` config
   - Markdown content files and their frontmatter schema (fields, draft flag, dates)
   - blog index page
   - dynamic article route
   - layouts and components used (confirm relationship to `BaseLayout.astro`)
   - homepage integration (article section)
   - header / navigation changes
   - sitemap and SEO metadata handling
5. **Works vs missing.** Against the target end state above, list what demonstrably already works and what is missing.
6. **Non-blog changes.** Identify every change on `feat/blog` that is not blog-related or is likely outdated relative to `main`. Specifically verify whether the homepage rewrite from `homepage-copy-master.md` is in `main`, and flag every file where a merge of `feat/blog` would overwrite it.
7. **Regression risk.** Explicitly check whether a merge would bring back old versions of Header, Footer, homepage sections, CTAs, or the mobile menu.
8. **Recommendation.** Close with a minimal implementation plan:
   - exact proposed scope
   - exact files likely to be touched
   - files that must explicitly remain untouched
   - recommended safe branch strategy — compare at least: (a) updating `feat/blog` with `main` merged in, vs (b) creating a fresh branch off current `main` and porting only the blog files over. State which you recommend and why.
   - risks or decisions that must be presented to me before any implementation starts

Do not run a build if doing so requires switching or modifying the branch. Stop after the audit report. Save the report to `docs/audit/blog-branch-audit-<date>.md` only if writing a docs file is acceptable in read-only mode as agreed; otherwise output the report in the conversation.
