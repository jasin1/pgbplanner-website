# Blog surface: one threshold, three behaviours

Repo: `pgbplanner-website`. Follows the read-only audit of the homepage "Laatste artikelen" section.

Confirm each edit individually. Present a change plan first and wait for approval.

## The decision

There is one threshold for navigation: **4 published (non-draft) articles.**

Navigation behaviour:
- Below 4: no "Blog" link in the main navigation (already the case, no change), and no "Terug" link on the article page
- At 4 or more: both appear

Homepage behaviour, which is a separate question of layout, not of navigation:
- Exactly 1 published article: the single featured layout
- 2 or more published articles: the existing card grid

Reason for the navigation threshold: the `/blog` index page has not been designed yet and currently holds one item. Every route that leads a reader there before it is ready costs more than it gains.

Reason for the homepage split: a three-column grid holding one card looks broken, which is what the featured layout solves. From two articles onward the grid works, and hiding the second article would be actively harmful, since with no nav link and no index page the homepage section is the only place a visitor can see that more than one article exists.

## 1. Single source of truth for the threshold

The audit found four separate `getCollection("blog", ...)` call sites with no shared helper, and the count is about to be needed in a third place.

Create a small helper, for example `src/lib/blog.ts`, exporting:

- `BLOG_INDEX_THRESHOLD = 4` with a short comment explaining what it gates
- a function returning the published (non-draft) posts, sorted newest first
- a function or derived boolean for whether the threshold is met

Refactor `Header.astro`, `LatestArticlesSection.astro`, `blog/index.astro` and `blog/[...slug].astro` to use it. Behaviour must stay identical; this is a consolidation, not a change. Report anything where the existing call sites differ in a way the helper cannot express, rather than smoothing it over.

## 2. Add a `teaser` field to the blog schema

`description` currently does double duty: it is the meta description for search results and it fills the homepage cards. Those are two different jobs. A meta description has to win a click against nine competitors in a search result. A teaser on the homepage speaks to someone who is already on the site and knows who we are.

In `src/content/config.ts`, add:

- `teaser`: optional string, minimum length 1 when present

Rules:

- Where a teaser is shown, use `post.data.teaser` if present, otherwise fall back to `post.data.description`. Never show both.
- This applies to both homepage layouts: the featured block and the existing card grid. Otherwise `description` keeps doing double duty in one of the two states.
- Do not make it required. An article that does not need one should not force a decision.
- `description` keeps its current role and stays required. Do not change it.

Add the field to `src/content/blog/_templates/blog-post.md` with a short Dutch comment explaining when to use it, so it appears in front of the author for every following article.

Then add a teaser to the published article `src/content/blog/2026-08-werkgeverslasten/index.md`. The exact text will be supplied; ask for it and do not invent one or copy the description.

## 3. Homepage layouts by published-post count

In `src/components/blog/LatestArticlesSection.astro`, branch on the number of published posts, not on the navigation threshold. The two are deliberately different numbers.

### Exactly 1 published article: single featured block

Content and order, desktop: image on the left, text on the right, roughly equal halves, vertically centred.

Content and order, mobile: label, then title, then image, then teaser, then button. This differs from the desktop order and is deliberate; the title has to arrive before the image on a narrow screen.

Elements:

- A small "Blog" label above the title, in the existing green accent
- The article title
- The teaser (see step 2)
- A button reading **"Lees het artikel"**. Not "Lees meer", which duplicates the wording of the old redirected `/lees-meer` page and says nothing about the destination
- No publication date in this layout. With one article a visible date works against you
- The image comes from `post.data.image`, a stable public path. Do not use the Markdown-body hero image, which is hashed into `_astro/` at build time and has no predictable URL
- Alt text comes from `post.data.heroAlt`

### Layout conventions

The block must follow the conventions the homepage already uses. Before building it, inspect the surrounding homepage sections and report the container width, horizontal padding, vertical section padding, gap values and heading scale they use. Reuse those, not new values.

The existing homepage section built from the same two-column pattern (image one side, text the other) is the reference for spacing and proportions. Match it.

Do not use fixed widths or fixed heights. The block must grow with its content. A Figma reference exists and shows the intended proportions, but its exported pixel values describe one viewport only and must not be copied.

### 2 or more published articles: card grid

The existing card grid, unchanged, including the publication date. The section continues to show the three newest posts.

### One fix in the existing grid

The desktop rule is currently `repeat(3, 1fr)`. Change it to `repeat(auto-fit, minmax(280px, 1fr))` so the two-card state fills the available width instead of leaving an empty third column. From three articles onward the grid is full either way, so this only affects the two-article case.

Everything stays inside the component, which already owns its own query and styles. Do not pass props from `index.astro`.

## 4. Hide the "Terug" link below the threshold

On the article page (`src/pages/blog/[...slug].astro` or `BlogPostLayout.astro`, whichever owns it), render the "Terug" link only when the threshold is met.

Below the threshold, remove it entirely rather than disabling or hiding it visually. A reader arriving from social media sees that link before reading anything, and it currently leads to an undesigned index page.

Do not add a replacement link, breadcrumb or alternative navigation. The header logo already returns to the homepage.

## 5. Resolve the documentation contradiction

`docs/marketing/homepage-copy-master.md:344` currently states that Blog becomes visible in the navbar as soon as the first real article is published. That contradicts the implemented behaviour and the decision above.

Replace that line with the actual rules and their reason:

- Bij precies 1 gepubliceerd artikel toont de homepage één uitgelicht artikel.
- Vanaf 2 gepubliceerde artikelen toont de homepage de kaartweergave, zodat geen gepubliceerd artikel verborgen blijft.
- De Blog-link in de navigatie en de Terug-link op artikelpagina's verschijnen pas vanaf 4 gepubliceerde artikelen, tegelijk met het moment waarop de /blog-overzichtspagina als volwaardige bestemming wordt ontworpen.

Keep it in Dutch, consistent with the rest of the file.

Note for context, not for the file: the three prompt files that also mention "4" were written after reading the code, so they describe the implementation rather than confirm the intent. The line in `homepage-copy-master.md` was the only independent statement. It is being changed because the reasoning above favours 4, not because it was outvoted.

## 6. Verify

Run `npm run build` and confirm:

- With 1 published article: no "Blog" nav link, no "Terug" link on the article, homepage shows the featured block with the image
- The featured block uses the teaser, not the description
- The homepage branches on post count and the navigation branches on the threshold; confirm these are two separate conditions in the code and not one reused value
- The block reflows correctly at mobile, around 800px wide, and full desktop width, with no fixed width or height anywhere in its CSS
- The article page is otherwise unchanged, including its metadata and sitemap entry
- No other page's behaviour changed as a result of the helper refactor
- Temporarily setting a second and third article to non-draft is not required; if you can reason about the branches without it, do so and say so

Do not deploy.

## Out of scope

Designing the `/blog` index page. Any change to the article page beyond removing the "Terug" link. New components beyond the featured block itself.
