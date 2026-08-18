Implement launch checklist item 6 in the PGB Planner marketing website repository.

Repository context:
- Current branch must be `feat/blog`.
- The homepage launch copy work is already implemented on this branch.
- Two approved screenshot masters were used to generate and visually review responsive image assets.
- The generated review assets are currently untracked and stored outside `public/`.
- Existing production images must remain available for quick rollback.
- This is a production website change. Keep the implementation minimal and scoped.
- Do not redesign sections, introduce new components, refactor unrelated code, or make additional copy changes.

Approved responsive image assets:

Dashboard:
`screenshots/launch-images-review/generated/dashboard/`

Vooruitblik:
`screenshots/launch-images-review/generated/vooruitblik/`

Each directory contains exactly:
- 400w.jpg / .webp / .avif
- 800w.jpg / .webp / .avif
- 1200w.jpg / .webp / .avif
- 1600w.jpg / .webp / .avif

All generated images have already passed technical verification and visual review.

Approved copy:

Preview section heading:
`Zie vooraf of je uitkomt`

Preview section paragraph:
`Met Vooruitblik zie je wat je huidige planning betekent voor de rest van het jaar. Probeer andere uren, tarieven of werkgeverslasten uit en zie direct of je uitkomt met je budget, zonder iets aan je bestaande planning te veranderen.`

Navigation label:
`Bekijk de app`

Navigation target:
`#preview`

The git history has already been inspected. A navigation item pointing to `#preview` previously existed and was removed in commit `f4cfaae`. The current `<section id="preview">` still exists. Adding `Bekijk de app` to the nav is therefore restoring previous anchor behavior with an updated label.

Execute the following carefully.

## 1. Preflight inspection

Before modifying anything:

- Run `git status`.
- Confirm the current branch is `feat/blog`.
- Inspect the current relevant implementations in:
  - `src/pages/index.astro`
  - `src/components/Header.astro`
- Inspect the existing production Dashboard image files in `public/`.
- Confirm the approved generated review assets exist and contain all 24 expected files.
- Report the exact tracked files and production image files you expect to modify or add.

Do not modify anything until the preflight inspection is complete.

## 2. Archive current production Dashboard images for rollback

Create a dedicated archive directory inside the repository for the current production Dashboard assets.

Use:

`archive/launch-pre-replacement-images/dashboard/`

Copy — do not move — all currently referenced production Dashboard image files into that archive directory before replacing any production asset.

Requirements:
- Preserve original filenames and file contents.
- Include every currently referenced Dashboard production image used by the homepage.
- Do not archive unrelated or unused files unless needed for rollback of the current homepage implementation.
- Verify the archived copies are byte-identical to the originals using checksums before continuing.
- If checksum verification fails, STOP.

Do not delete the archived files later in this task.

## 3. Install the approved Dashboard responsive image set

Copy the 12 approved Dashboard review assets into `public/` using clear production filenames:

- `Dashboard-400w.jpg`
- `Dashboard-400w.webp`
- `Dashboard-400w.avif`
- `Dashboard-800w.jpg`
- `Dashboard-800w.webp`
- `Dashboard-800w.avif`
- `Dashboard-1200w.jpg`
- `Dashboard-1200w.webp`
- `Dashboard-1200w.avif`
- `Dashboard-1600w.jpg`
- `Dashboard-1600w.webp`
- `Dashboard-1600w.avif`

These files intentionally replace the existing responsive Dashboard production files.

Do not replace, delete, or modify the existing `Dashboard-big.*` files in this task. They are no longer intended to be referenced after the homepage implementation is updated, but must remain untouched for now.

## 4. Install the approved Vooruitblik responsive image set

Copy the 12 approved Vooruitblik review assets into `public/` using:

- `Vooruitblik-400w.jpg`
- `Vooruitblik-400w.webp`
- `Vooruitblik-400w.avif`
- `Vooruitblik-800w.jpg`
- `Vooruitblik-800w.webp`
- `Vooruitblik-800w.avif`
- `Vooruitblik-1200w.jpg`
- `Vooruitblik-1200w.webp`
- `Vooruitblik-1200w.avif`
- `Vooruitblik-1600w.jpg`
- `Vooruitblik-1600w.webp`
- `Vooruitblik-1600w.avif`

Do not modify the review assets or master PNG files.

## 5. Update the hero image

In `src/pages/index.astro`:

- Keep the existing responsive `<picture>` implementation pattern.
- Use the new Dashboard responsive production assets.
- Preserve AVIF → WebP → JPEG fallback order.
- Preserve the 400 / 800 / 1200 / 1600 `srcset` widths.
- Preserve appropriate `sizes` behavior for the existing layout.
- Add explicit intrinsic dimensions to the `<img>`:
  - `width="1600"`
  - `height="821"`
- Add:
  - `loading="eager"`
  - `fetchpriority="high"`
  - `decoding="async"`
- Use this alt text:
  `Dashboard van PGB Planner met budgetstatus, uitgaven en vooruitblik`

Do not alter the hero layout or surrounding copy except for the explicitly approved changes below.

## 6. Remove the second hero button

Remove the hero button/link labeled:

`Geef jouw input`

The hero must retain the primary:

`Probeer 21 dagen gratis`

CTA.

Do not change its destination or wording.

## 7. Add the approved price line under the hero CTA

Add the already-approved price line beneath the primary hero CTA.

Use exactly the price copy already agreed in the current repository/session context.

Before editing:
- inspect the current hero markup and any existing implementation artifact or approved copy source that contains the agreed price line;
- use that exact approved text;
- do not invent, paraphrase, or expand the pricing copy.

If the exact approved price line cannot be determined from the repository or available context, STOP and report that issue instead of guessing.

Keep this as a small supporting text line. Do not redesign the hero.

## 8. Update the existing preview section

Keep:

`<section id="preview">`

Change the section heading from:

`Een eerste blik op PGB Planner`

to exactly:

`Zie vooraf of je uitkomt`

Add this exact paragraph directly below the heading:

`Met Vooruitblik zie je wat je huidige planning betekent voor de rest van het jaar. Probeer andere uren, tarieven of werkgeverslasten uit en zie direct of je uitkomt met je budget, zonder iets aan je bestaande planning te veranderen.`

Keep the section structure and styling minimal. Reuse existing typography/spacing classes where possible.

Do not create new cards, CTAs, feature lists, or additional content.

## 9. Replace the preview image with Vooruitblik

Replace the current `Dashboard-big.*` image usage in the preview section with a responsive `<picture>` using the new Vooruitblik assets.

Requirements:
- AVIF → WebP → JPEG fallback order.
- 400 / 800 / 1200 / 1600 width variants.
- Appropriate `srcset`.
- Use the same `sizes` behavior as the hero image unless inspection shows the preview container requires a more accurate existing-layout value.
- Add:
  - `width="1600"`
  - `height="821"`
  - `loading="lazy"`
  - `decoding="async"`
- Do not add `fetchpriority="high"` to this image.
- Use this alt text:
  `Vooruitblik in PGB Planner met medewerkers, geplande kosten en verwacht resterend budget`

Do not alter the surrounding layout beyond what is necessary for the approved heading, paragraph, and image replacement.

## 10. Restore the preview navigation anchor with the approved label

In `src/components/Header.astro`:

Add:

`Bekijk de app`

to the existing navigation array, targeting:

`#preview`

Follow the existing `nav` array shape and `getSectionLink()` behavior exactly.

Place the item in this order:

`Over` → `Hoe het werkt` → `Bekijk de app` → `FAQ`

Ensure the existing desktop and mobile navigation both receive the item through the shared nav implementation.

Do not add the link to the Footer in this task.

Do not change the existing login or trial CTA buttons.

## 11. Verify production image assets

After copying:

- Verify all 24 new production responsive files exist.
- Verify dimensions, formats, and file sizes with Sharp.
- Verify the 12 Dashboard production files are byte-identical to the approved Dashboard review files.
- Verify the 12 Vooruitblik production files are byte-identical to the approved Vooruitblik review files.
- Verify the archived old Dashboard assets are still present and unchanged.
- Verify `Dashboard-big.*` remain untouched.

If any verification fails, STOP and report it.

## 12. Build and scope verification

Run the existing production build command.

Then verify:

- build succeeds;
- no broken asset references;
- hero references only the new responsive Dashboard set;
- preview section references only the new responsive Vooruitblik set;
- `Dashboard-big.*` are no longer referenced by `src/pages/index.astro`;
- `#preview` still exists exactly once as the target section id;
- `Bekijk de app` appears in the shared nav in the approved position;
- `Geef jouw input` is removed from the hero;
- primary hero CTA remains unchanged;
- approved price line is present exactly once;
- approved preview heading and paragraph are exact;
- image intrinsic dimensions and loading attributes are correct;
- desktop and mobile navigation continue to use the shared nav data;
- no unrelated tracked files were modified.

## 13. Final report

Show:

1. Full `git diff --stat`.
2. Full `git status --short`.
3. List of tracked files modified.
4. List of tracked files added.
5. List of production image files replaced.
6. List of production image files added.
7. List of archived rollback files created.
8. Build result.
9. Verification result for all requirements above.
10. Any warnings or concerns found.

Do not stage files.
Do not commit.
Do not push.
Do not merge.
Do not rebase.
Do not reset.
Do not deploy.

Stop after the report and wait for review.