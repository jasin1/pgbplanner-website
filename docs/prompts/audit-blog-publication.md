# Read-only audit: first blog publication

Repo: `pgbplanner-website` (Astro v5, Netlify).

We are publishing the first real blog article today. A blog content structure already exists. Do not design or build a new one.

## Phase 1 only

This session is read-only.

Do not edit, create, move or delete any tracked file. Do not commit or push. You may run inspection commands and a local build. Report your findings, then stop and wait for approval.

## Relevant locations

Article source (final, fact-checked, Dutch, must not be rewritten):
`docs/marketing/artikelen/werkgeverslasten-pgb-berekenen-definitief-v2.md`

Internal claim register, already in its permanent location, must never be published:
`docs/marketing/artikelen/claimlijst-werkgeverslasten.md`

Existing blog structure:
- `src/content/config.ts`
- `src/content/blog/_templates/blog-post.md`
- `src/content/blog/2026-02-rdah/index.md`
- `src/content/blog/2026-02-rdah/hero.jpg`

Target slug, fixed and not negotiable: `werkgeverslasten-pgb-berekenen`

---

## Audit questions

### 1. Content collection schema

From `src/content/config.ts`, report every frontmatter field for the blog collection: name, type, required or optional, default. State whether unknown fields are rejected, and whether the slug is derived or must be declared.

Compare the schema against `_templates/blog-post.md`, against `2026-02-rdah/index.md`, and against the frontmatter currently in the article source. Give a compact table showing, for the new article: missing fields, extra fields, fields needing a different value.

Treat the frontmatter in the article source as a guess written outside the repo. The template and schema win.

### 2. Naming, routing and images

List the full contents of `src/content/blog/`. Report the directory naming pattern, the entry filename, and how the public URL is built: from folder name, from a frontmatter slug, or both.

State the expected destination path and the expected public URL for the fixed slug above.

Report how `hero.jpg` is referenced in `2026-02-rdah/index.md` and how Astro processes it: relative path, image() schema helper, or public folder. This is the working reference for how to wire the new article's image, so be precise.

### 3. Article route and layout

Locate the route and layout that render blog entries. Report which files are involved, how entries are loaded, whether draft or future-date filtering exists, and where article typography and content styles live.

Note: the new article has `pubDate: 2026-08-01`, which is today. If date filtering exists, state exactly how the boundary is evaluated and whether a timezone difference could exclude it.

### 4. Metadata and Open Graph

Inspect the layout chain used by blog articles, including `BaseLayout.astro`. For each of the following, state whether it is page-specific, taken from frontmatter, hardcoded, a site-wide fallback, or absent:

title, meta description, canonical, `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`.

Also report whether `og:image` and `og:url` are emitted as absolute URLs, and whether the existing entry already feeds a local image into Open Graph.

### 5. Sitemap

Report which integration generates the sitemap, the output filenames, whether blog entries are included automatically, and what exactly to check in the local build output after publication.

### 6. Placeholder entry

Inspect `src/content/blog/2026-02-rdah`. Report its resulting URL, whether it builds, whether it appears in the sitemap, and whether any other code, doc or test references it.

Do not remove it. It is the only working example of an article with an image, so it stays until the new article builds correctly.

### 7. Existing redirect

The `/lees-meer` redirect was already implemented. Locate it and report the exact file and rule, whether it is a 301 to `/`, whether a physical `/lees-meer` page still exists, and whether anything in the build or Netlify config could override it.

Do not change it. Report the current status of `/vragenlijst` as a side note only.

### 8. Summary aside

The article contains `<aside class="samenvatting">` with Markdown inside it, with blank lines after the opening tag and before the closing tag.

From the current Astro and Markdown configuration, determine whether Markdown inside that raw HTML block is processed as intended, and where an article-level `.samenvatting` style would belong given the existing styling structure. Do not add it.

### 9. Source file integrity

Inspect the article source without editing it. Report: which frontmatter fields it has, whether the body contains any em-dash characters, the line numbers of the sources list at the bottom, whether any source description already contains a link, and anything in the Markdown that may not render as expected in this pipeline.

Do not correct the Dutch text. If you believe something is wrong, report it and leave it alone.

---

## Final report

End with:

1. Expected destination path and public URL.
2. Files that phase 2 would need to change, grouped per file, with what changes in each.
3. Files that must stay untouched.
4. Any contradiction, blocker or surprise.
5. Anything phase 2 cannot decide without more information.

Then stop.
