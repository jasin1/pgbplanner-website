We need to correct the Dashboard and Vooruitblik responsive homepage assets because the wrong source images were used during the previous generation run.

The root cause is already known:

I accidentally placed the wrong source screenshots in the review folder before the previous generation run.

The generated Dashboard and Vooruitblik responsive assets were therefore generated correctly from the files they were given, but those source files were not the intended approved masters.

The correct approved source masters are now available in:

screenshots/launch-images-review/Dashboard-master.png
screenshots/launch-images-review/Vooruitblik-master.png

These two files are the authoritative source of truth for this correction.

Do not investigate or speculate about another root cause unless the files or repository state contradict this explicit context.

Stay on the current feat/blog branch.

The previous homepage work was already committed and pushed as commit c7d2705.

Do not amend that commit.
Do not commit.
Do not push.
Do not merge.
Do not deploy.
Do not reset, rebase, or force-push.

The goal is to regenerate the complete responsive Dashboard and Vooruitblik image sets from the correct approved masters, verify them, replace the current production assets, update intrinsic image dimensions if required, run the build, and stop for visual review.

IMPORTANT SOURCE RULES

Use only:

screenshots/launch-images-review/Dashboard-master.png
screenshots/launch-images-review/Vooruitblik-master.png

as source images.

Do not use:

screenshots/launch-images-review/app.pgbplanner.nl_dashboard.png
screenshots/launch-images-review/app.pgbplanner.nl_vooruitblik.png

or any existing generated/public responsive asset as a source.

Do not modify, rename, move, overwrite, or delete the two master files.

Do not crop the masters.

Do not add padding, canvas space, borders, backgrounds, or artificial whitespace.

Do not use contain/cover behavior that changes the framing.

Do not distort or stretch the images.

Preserve each master's complete framing and aspect ratio.

STEP 1 — VERIFY INPUTS AND CURRENT STATE

Before modifying anything:

1. Confirm current branch is feat/blog.
2. Confirm commit c7d2705 exists and is already in branch history.
3. Inspect git status --short.
4. Verify both master files exist.
5. Record SHA-256 checksums of both master files before processing.
6. Inspect both masters with Sharp and report:
   - width
   - height
   - format
   - aspect ratio
7. Inspect the current generation method/scripts/commands used earlier in this session.
8. Confirm the correction can be performed by directly resizing each correct master proportionally to target widths while allowing Sharp to calculate height automatically.
9. Confirm the existing rollback archive is present:

archive/launch-pre-replacement-images/dashboard/

Do not modify the archive.

If the repository state materially contradicts the expected state, STOP and report before changing files.

STEP 2 — REGENERATE REVIEW ASSETS

Regenerate the complete responsive image sets from the correct masters.

Dashboard source:

screenshots/launch-images-review/Dashboard-master.png

Output directory:

screenshots/launch-images-review/generated/dashboard/

Vooruitblik source:

screenshots/launch-images-review/Vooruitblik-master.png

Output directory:

screenshots/launch-images-review/generated/vooruitblik/

Generate widths:

400
800
1200
1600

Generate formats:

jpg
webp
avif

Requirements:

- Resize directly from the corresponding master.
- Preserve aspect ratio.
- Specify width only during resize.
- Let Sharp calculate height automatically.
- Do not use fit: contain.
- Do not use fit: cover.
- Do not use extend().
- Do not use extract().
- Do not composite onto another canvas.
- Do not create an intermediate normalized canvas.
- Do not upscale a source beyond its native dimensions unless the master itself is narrower than a required target width; if that occurs, STOP and report before generating.
- Use the same existing encoding quality/settings from the previous approved generation process if they can be determined reliably from the current session/repository.
- If the previous encoding settings cannot be determined reliably, STOP and report before generating rather than inventing new settings.

Overwrite the existing generated review assets only after input verification succeeds.

STEP 3 — VERIFY GENERATED REVIEW ASSETS

Before touching public production assets:

For all 24 generated review files:

1. Confirm the file exists.
2. Verify width, height, and format with Sharp.
3. Confirm each image preserves its corresponding master's aspect ratio within normal integer rounding.
4. Confirm dimensions follow direct proportional resizing from the correct master.
5. Confirm no artificial canvas space was added.
6. Confirm no meaningful source content was cropped.
7. Confirm the 1600w Dashboard asset has the same framing as Dashboard-master.png.
8. Confirm the 1600w Vooruitblik asset has the same framing as Vooruitblik-master.png.

Create temporary visual comparison/contact-sheet files if useful for review, but keep them inside screenshots/ and do not stage them.

If any verification fails, STOP.
Do not replace production assets.

STEP 4 — REPLACE PRODUCTION ASSETS

Only after all generated review assets pass verification:

Replace:

public/Dashboard-400w.jpg
public/Dashboard-400w.webp
public/Dashboard-400w.avif

public/Dashboard-800w.jpg
public/Dashboard-800w.webp
public/Dashboard-800w.avif

public/Dashboard-1200w.jpg
public/Dashboard-1200w.webp
public/Dashboard-1200w.avif

public/Dashboard-1600w.jpg
public/Dashboard-1600w.webp
public/Dashboard-1600w.avif

and:

public/Vooruitblik-400w.jpg
public/Vooruitblik-400w.webp
public/Vooruitblik-400w.avif

public/Vooruitblik-800w.jpg
public/Vooruitblik-800w.webp
public/Vooruitblik-800w.avif

public/Vooruitblik-1200w.jpg
public/Vooruitblik-1200w.webp
public/Vooruitblik-1200w.avif

public/Vooruitblik-1600w.jpg
public/Vooruitblik-1600w.webp
public/Vooruitblik-1600w.avif

Use the verified generated review assets as the source for production replacement.

Do not regenerate public assets separately.

After replacement:

- verify each production file is byte-identical via SHA-256 to its corresponding generated review asset;
- verify all production dimensions/formats again with Sharp.

STEP 5 — UPDATE HOMEPAGE INTRINSIC DIMENSIONS IF REQUIRED

Inspect:

src/pages/index.astro

The existing hero Dashboard image and preview Vooruitblik image may currently have width/height attributes based on the previous incorrect source aspect ratio.

Calculate the correct intrinsic dimensions from the new 1600w assets.

If the actual corrected 1600w dimensions differ from the current HTML width/height attributes:

- update only the relevant width and height attributes;
- keep srcset unchanged;
- keep sizes unchanged unless the new aspect ratio creates a demonstrable technical reason to change it;
- keep loading, fetchpriority, decoding, classes, markup structure, copy, CTA styling, spacing, and all unrelated homepage code unchanged.

Do not make CSS changes to compensate for image framing.

STEP 6 — VERIFY HOMEPAGE AND BUILD

Run:

npm run build

Then verify:

1. Build succeeds.
2. Only the known pre-existing blog-route warning may remain.
3. Hero references only the Dashboard responsive asset set.
4. Preview section references only the Vooruitblik responsive asset set.
5. Intrinsic width/height attributes match the corrected 1600w assets.
6. No CSS workaround was introduced.
7. No unrelated source files changed.
8. The rollback archive remains byte-for-byte untouched.
9. The two master files remain byte-identical to their SHA-256 checksums recorded at the start.
10. git diff --stat contains only the expected correction files.
11. git status --short contains no unexpected changes introduced by this task.

STEP 7 — LOCAL VISUAL REVIEW

Inspect localhost at desktop width.

Report specifically:

- whether the Dashboard UI now appears materially larger and easier to read than the previous incorrect generated version;
- whether the Dashboard framing matches Dashboard-master.png;
- whether the Vooruitblik UI now appears materially larger and easier to read than the previous incorrect generated version;
- whether the Vooruitblik framing matches Vooruitblik-master.png;
- whether either image contains newly introduced whitespace, clipping, distortion, or cropping;
- whether the result is suitable for visual review.

Do not make additional aesthetic adjustments after this point.

STOP for my visual review.

FINAL REPORT

Provide:

1. Current branch.
2. Master files used.
3. Master SHA-256 checksums before and after.
4. Master dimensions and aspect ratios.
5. Encoding settings used and where they came from.
6. Corrected responsive dimensions for Dashboard.
7. Corrected responsive dimensions for Vooruitblik.
8. Generated review assets replaced.
9. Production assets replaced.
10. Homepage intrinsic dimensions changed, if any.
11. Production/generated checksum verification results.
12. Archive integrity verification.
13. Build result.
14. Local visual review findings.
15. git diff --stat.
16. git status --short.
17. Warnings or concerns.
18. Explicit confirmation that nothing was committed, pushed, amended, merged, or deployed.

Do not commit or push anything.
Stop after verification and report so I can visually review localhost.