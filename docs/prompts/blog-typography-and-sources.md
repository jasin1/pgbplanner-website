# Blog typography and sources formatting

Repo: `pgbplanner-website`. Follow-up to `docs/prompts/publish-article-werkgeverslasten.md`.

All changes are global blog styling, not one-off fixes for this article. Nothing is deployed yet, so this happens before publication.

Confirm each edit individually. Present a change plan first and wait for approval.

## 1. Remove the two inline body links

In `src/content/blog/2026-08-werkgeverslasten/index.md`, remove both inline links added in the previous session: the one on "Centrale Raad van Beroep" and the one in the Wlz section.

Restore those phrases to plain text exactly as they appear in the source file `docs/marketing/artikelen/werkgeverslasten-pgb-berekenen-definitief-v2.md`. No word changes.

Reason: the sources list at the bottom carries the evidence. Inline links pull readers out of a long article.

The links in the Bronnen list stay.

## Scope note for steps 2 and 3

The current type scale is correct on mobile and must not change there. It only reads wrong on wider screens, where the same headings sit in a much wider column.

Apply both step 2 and step 3 inside a `min-width` media query only, matching whichever breakpoint `main.css` already uses for its desktop layout. Do not introduce a new breakpoint value. Below that breakpoint, everything stays exactly as it renders now.

Report which existing breakpoint you used and why.

Steps 1, 4 and 5 apply at all screen sizes.

## 2. Body type scale (desktop only)

In `src/styles/main.css`, "Blog / Article typography" section.

- `.article-content` body text: 18px, line-height around 1.7.
- Keep the existing measure. Do not widen the column; longer lines at a larger size would undo the gain.
- Check that lists, the aside, and the byline inherit the new size sensibly. Report anything that now looks out of proportion rather than fixing it silently.

## 3. Heading scale (desktop only)

Headings in articles are currently rendered at landing-page scale, which is too heavy against body text on wide screens.

Keep the semantics unchanged: `h2` stays `h2`. Only the rendered size changes, scoped to `.article-content` so the rest of the site is unaffected.

- `h2` in article content: around 27 to 28px, bold, same colour as now.
- `h3` if present: around 21px.
- More space above a heading than below it, so each heading visually belongs to the section it introduces. Roughly 2.5rem above, 0.75rem below.

Show me the rendered result before moving on.

## 4. Fix paragraph spacing inside the summary aside

Paragraphs inside `.article-content .samenvatting` currently run together with no vertical gap, because the aside rule flattens paragraph margins.

Restore normal spacing between paragraphs inside the aside, slightly tighter than body paragraphs. The bold "In het kort" line keeps a clear gap below it.

This applies at all screen sizes.

## 5. Sources list as a reusable pattern

The Bronnen block currently renders as one dense paragraph. It should be scannable.

Target structure, per source: the link text on its own line, and the descriptive detail on the following line in smaller, muted type.

Example of the intended shape, not the final content:

```
<ul class="bronnen">
  <li>
    <a href="...">Staatscourant 2026, nr. 19766</a>
    <span>Wijziging van de Regeling langdurige zorg in verband met de Regeling dienstverlening aan huis, 29 mei 2026, inclusief toelichting.</span>
  </li>
</ul>
```

Create exactly seven source entries, in this existing order: Staatscourant 19766, Staatscourant 25254, Centrale Raad van Beroep, Kamerstukken 36 744, SVB, Per Saldo Wlz, Per Saldo Zvw. Preserve the existing punctuation and wording within each source description.

For the Kamerstukken entry, the descriptive text "Wetsvoorstel Wet aanpassing Regeling dienstverlening aan huis" precedes the link text in the current paragraph. Keep both in that entry: the link on the link line, the description on the description line. Do not reword either.

Requirements:

- Restructure the existing Bronnen content in the published article into this shape. The Dutch wording stays exactly as it is; only the layout changes. Do not rewrite, shorten or reorder the descriptions, and do not change which source has a link and which does not. The SVB source stays without a link.
- Add a `.bronnen` rule in the "Blog / Article typography" section of `main.css`. No bullets, clear separation between entries, link line at normal size, description line smaller and in a muted colour from the existing tokens. No new colour values.
- Add the same structure to `src/content/blog/_templates/blog-post.md` as a commented example, so every following article uses it without rebuilding the pattern. Keep the template comment in Dutch, consistent with the rest of that file.

The closing italic disclaimer below the sources stays a plain paragraph, unchanged.

## 6. Verify

Run `npm run build` and confirm:

- The article still renders and is present in `dist/sitemap-0.xml`
- No inline links remain in the article body; the Bronnen links all still work
- All seven source entries are present, in order, with six links and the SVB entry as plain text
- The type scale below the breakpoint is byte-identical to how it renders now
- No em-dash characters anywhere in the rendered article
- The rest of the site is visually unchanged, since all rules are scoped to `.article-content` and `.bronnen`

Do not deploy.

## Out of scope

The blog index page, article page redesign, new components, structured data. Everything else stays as agreed.
