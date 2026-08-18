# Reusable content-pages pattern (as implemented in the blog)

Factual reference for the architecture behind `src/content/blog/`. This describes what exists in this repo today — it does not propose a structure for any other content type or project.

## 1. Minimal architecture

Four parts, each with one job:

```
Content Collection (schema)  →  Markdown entries  →  dynamic route  →  shared layout(s)
src/content/config.ts           src/content/blog/     [...slug].astro   BlogPostLayout.astro
                                 [slug]/index.md                        + BaseLayout.astro
```

- **Schema** (`src/content/config.ts`) defines and validates frontmatter shape via Zod.
- **Markdown entries** hold frontmatter + body content, one folder per entry.
- **Dynamic route** (`src/pages/blog/[...slug].astro`) reads the collection and generates one static page per entry.
- **Shared layout** renders the page shell and per-entry chrome; a second, outer layout (`BaseLayout`) owns the document `<head>` and site chrome.

## 2. Current file structure

```
src/
├── content/
│   ├── config.ts                       # collection schema (Zod)
│   └── blog/
│       ├── _templates/blog-post.md     # authoring template, not a real entry
│       └── 2026-08-werkgeverslasten/
│           ├── index.md                # frontmatter + Markdown body
│           └── hero.jpg                # co-located asset, referenced via relative path
├── lib/
│   └── blog.ts                         # query helpers (getPublishedPosts, threshold gate)
├── pages/
│   └── blog/
│       ├── index.astro                 # listing page
│       └── [...slug].astro             # dynamic route, one page per entry
├── components/
│   └── blog/
│       └── BlogPostLayout.astro        # per-entry layout (title, meta, backlink, content slot)
└── layouts/
    └── BaseLayout.astro                # outer document shell (head, SEO tags, Header/Footer)
```

Each entry lives in its own folder (`[slug]/index.md`) rather than as a flat `[slug].md` file, so that images (`hero.jpg`) can sit next to the content that references them and be imported with relative paths.

## 3. Content collection schema

`src/content/config.ts`:

```ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
    heroAlt: z.string().optional(),
    image: z.string().optional(),
    teaser: z.string().min(1).optional(),
  }),
});

export const collections = { blog };
```

- `type: "content"` marks this as a Markdown-backed collection — Astro parses frontmatter against the schema and exposes a `render()` method on each entry for the Markdown body.
- Zod validates types and required-ness at build time; a missing `title` or malformed `pubDate` fails the build rather than shipping a broken page.
- `draft` defaults to `true` (opt-in publish, not opt-out).
- Fields fall into two groups: **structural** (`title`, `description` — used by every entry, feed the route and `<head>`) and **presentational/optional** (`heroAlt`, `image`, `teaser` — used by specific templates, not required to render a page at all).

## 4. Markdown entry structure

`src/content/blog/2026-08-werkgeverslasten/index.md`:

```markdown
---
title: "Werkgeverslasten berekenen: waarom je pgb sneller opraakt"
description: "..."
pubDate: 2026-08-01
slug: werkgeverslasten-pgb-berekenen
draft: false
heroAlt: "Keukentafel met papieren, een rekenmachine en een notitieboek"
image: /og/werkgeverslasten.jpg
teaser: "..."
---

![alt text](./hero.jpg)

Body content in Markdown...
```

- Frontmatter fields correspond 1:1 to the Zod schema, except `slug` (see §5).
- The body is plain Markdown, rendered later via `post.render()` → `<Content />`.
- Relative image references (`./hero.jpg`) resolve against the entry's own folder, which is why the asset is co-located rather than kept in a shared `/public` directory.

## 5. Slug handling

- Astro content collections auto-derive a slug from the entry's file path (folder/file name) unless the frontmatter includes an explicit `slug` field, which overrides it. This repo uses the explicit override (`slug: werkgeverslasten-pgb-berekenen`) rather than relying on the folder name (`2026-08-werkgeverslasten`) — the two differ here, which is why the override is present.
- `slug` is **not** declared in the Zod schema. It's a reserved frontmatter key that Astro's content collections handle separately from the schema-validated data object; it surfaces as `entry.slug`, not `entry.data.slug`.
- The route consumes `entry.slug` directly (via `getPublishedPosts()` → `post.slug`) to build `params.slug` for `getStaticPaths`.

## 6. Dynamic route generation

`src/pages/blog/[...slug].astro`:

```astro
---
export const prerender = true;

import { type CollectionEntry } from "astro:content";
import BaseLayout from "../../layouts/BaseLayout.astro";
import BlogPostLayout from "../../components/blog/BlogPostLayout.astro";
import { getPublishedPosts } from "../../lib/blog";

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

type Props = { post: CollectionEntry<"blog"> };

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={...} description={post.data.description} ogType="article" ogImage={post.data.image}>
  <BlogPostLayout title={post.data.title} pubDate={post.data.pubDate}>
    <Content />
  </BlogPostLayout>
</BaseLayout>
```

- `[...slug].astro` is a rest-parameter route file: the filename pattern is what makes one file generate N pages.
- `getStaticPaths()` runs at build time, returns one `{ params, props }` pair per entry. `params.slug` determines the output URL (`/blog/[slug]/`); `props` carries the full entry through to the component body.
- `prerender = true` forces static generation for this route even though the project runs in SSR mode (`output: 'server'`) — without it, the route would render on-demand per request instead of being built once.
- `post.render()` returns a `Content` component that renders the Markdown body; this is what makes the body available as `<Content />` rather than raw text.
- The query logic (which entries qualify, in what order) is factored out into `lib/blog.ts` (`getPublishedPosts`) rather than inlined in the route — the route only orchestrates, it doesn't filter or sort.

## 7. Shared layout responsibilities

Two layout layers, cleanly separated:

**`BaseLayout.astro`** (outer, shared by every page on the site, not just blog):
- Full HTML document shell (`<html>`, `<head>`, `<body>`)
- SEO/meta tags: title, description, canonical URL, Open Graph, Twitter card
- Font loading, GA4 script
- Site chrome: `Header`, `Footer` (with `hideHeader` escape hatch)
- Accepts page-level content as props (`title`, `description`, `ogImage`, `ogType`, `noindex`) — it has no knowledge of "blog" as a concept

**`BlogPostLayout.astro`** (inner, blog-entry-specific):
- Renders the entry's own chrome: title heading, formatted date, optional backlink
- Wraps the rendered Markdown in `<article class="article-content">` and exposes a `<slot />` for it
- Contains blog-specific logic (`showBacklink` from `isBlogIndexThresholdMet()`) — this is the layer where content-type-specific rules belong, not `BaseLayout`

The route composes both: `BaseLayout` wraps `BlogPostLayout` wraps `<Content />`. This means the outer shell (site-wide SEO/chrome) and the inner shell (entry-specific chrome) can vary independently.

## 8. Metadata flow

```
Markdown frontmatter
   → validated by Zod schema (content/config.ts)
   → entry.data (typed object) + entry.slug (reserved key)
   → passed as props through getStaticPaths()
   → read in [...slug].astro
   → split two ways:
      - page-level metadata (title, description, image) → BaseLayout props → <head> tags
      - content-level metadata (title, pubDate) → BlogPostLayout props → visible page chrome
   → post.render() → Content component → rendered Markdown body
```

Metadata is never re-declared — it originates once in frontmatter, gets typed/validated once by the schema, and flows down through props. Nothing reaches into the layout to re-fetch or duplicate collection data.

## 9. What is generic vs. PGB-specific

**Generic — the reusable principle:**
- Content Collection + Zod schema as the single source of truth for entry shape and validation
- One-folder-per-entry with co-located assets, referenced by relative path
- A rest-param dynamic route (`[...slug].astro`) driving `getStaticPaths()` off collection queries
- Splitting layout into an outer, content-agnostic shell (site chrome + SEO) and an inner, content-type-specific shell (entry chrome)
- Query/filter logic factored into a `lib/` helper rather than inlined in the route, so the route stays a thin orchestrator
- Metadata flowing one direction only: frontmatter → schema → props → render, no duplication

**PGB/blog-specific — do not copy automatically into an unrelated content type:**
- `pubDate`, `draft`, and date-based sorting in `getPublishedPosts()` — only relevant if the new content type has a publish date and draft workflow
- `BLOG_INDEX_THRESHOLD` / `isBlogIndexThresholdMet()` — a homepage-link/nav-gating rule specific to when the blog index becomes worth linking to; unrelated to routing or rendering mechanics
- The `/blog/index.astro` listing page and its layout — only needed if a listing view is actually required
- `teaser`, `heroAlt` fields and their specific presentational use — tied to how the blog surfaces entries elsewhere (e.g. homepage teaser cards), not part of the routing/layout pattern itself
- Dutch copy, tone, design tokens, fonts, Header/Footer contents — site-wide concerns, not part of this architectural pattern at all
- The `slug` frontmatter override — only necessary because this repo's folder names (`2026-08-werkgeverslasten`) intentionally differ from the desired URL slug; not a required part of the pattern if folder name and slug are the same

## 10. Verification checklist

When confirming this pattern still works as documented in this repo (or after modifying it):

- [ ] `npm run build` succeeds with no schema validation errors
- [ ] Each published entry resolves to a page at its expected URL
- [ ] `<head>` tags (title, description, canonical, OG image) reflect the individual entry's data, not a fallback
- [ ] Markdown body renders correctly, including relative image references
- [ ] Draft entries (`draft: true`) do not produce a route
- [ ] Removing/renaming a field from the schema surfaces as a build-time type error, not a silent runtime gap
