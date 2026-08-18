# Claude Code Task — Mobile menu production polish

## Context

PGB Planner's launch homepage is live in production.

The approved launch work has been merged into `main` and pushed successfully.

Current production merge commit:

`c1f45a6`

A final manual review on a real mobile device revealed two small visual issues in the responsive navigation menu:

1. The vertical spacing between the `Inloggen` button and the `Probeer 21 dagen gratis` button is too small.
2. The open mobile menu does not cover the full viewport. Part of the homepage remains visible below the menu overlay.

This is a narrow production polish task.

Do not perform a broader redesign, refactor, responsive audit, accessibility audit, or navigation rewrite.

## Goal

Make exactly these two improvements:

1. Add clear vertical separation between the two mobile menu action buttons.
2. Make the open mobile menu cover the full visible mobile viewport cleanly.

Preserve the existing approved mobile menu design, content, order, typography, colors, button styles, navigation behavior, and desktop navigation.

## Required workflow

### Step 1 — Preflight and investigation

Before modifying anything:

1. Confirm the current branch.
2. Confirm local `main` is synchronized with `origin/main`.
3. Show `git status --short`.
4. Do not modify, delete, stage, or commit the existing untracked files under:
   - `docs/prompts/`
   - `screenshots/`
5. Locate the exact component(s) and CSS responsible for:
   - the mobile menu overlay;
   - the two mobile menu action buttons;
   - page scroll behavior while the menu is open.
6. Read the relevant implementation before making changes.

Keep investigation narrow.

Do not inspect unrelated homepage sections or perform a broad codebase audit.

### Step 2 — Create a fix branch

Create and switch to:

`fix/mobile-menu-production-polish`

Do not modify `main` directly.

### Step 3 — Implement the smallest correct fix

Make only the changes necessary to achieve the following behavior.

#### A. Full-screen mobile menu

When the mobile menu is open:

- it must cover the complete visible viewport;
- no homepage content should remain visible below or around the menu;
- use robust mobile viewport behavior appropriate for current mobile browsers;
- the menu must remain above all homepage content;
- the existing logo, close button, navigation links, login button, and trial CTA must remain visible and usable;
- preserve the existing visual design and menu structure;
- do not redesign the menu.

Prefer the smallest CSS/layout correction that solves the issue.

If the current implementation already has page-scroll locking, preserve it.

If it does not, only add scroll locking if it is necessary to prevent the background page from scrolling while the full-screen menu is open.

Do not introduce a new dependency.

#### B. Button spacing

Increase the vertical separation between:

- `Inloggen`
- `Probeer 21 dagen gratis`

Target approximately `16px` of clear vertical spacing.

Use the existing spacing system or CSS conventions if an equivalent spacing token/value already exists.

Do not change:

- button dimensions unless technically necessary;
- button colors;
- typography;
- border styles;
- button labels;
- CTA order.

### Step 4 — Verify scope before build

Show:

- `git diff --stat`
- `git diff --name-status`
- `git diff --check`
- the relevant diff for the modified component/CSS files.

Confirm:

- only files required for this mobile-menu fix changed;
- desktop navigation behavior was not intentionally changed;
- no unrelated homepage content changed;
- existing untracked prompt docs and `screenshots/` remain untouched.

If unrelated tracked changes exist, STOP and report.

### Step 5 — Build

Run:

`npm run build`

The known pre-existing blog `getStaticPaths()` warning is acceptable.

If a new error or warning appears, STOP and report.

### Step 6 — Local mobile verification

Start the local development server using the project's normal command.

Verify the homepage at a mobile viewport representative of the supplied real-device screenshot.

Check only:

1. Open mobile menu covers the full visible viewport.
2. No homepage content is visible below or around the open menu.
3. Background page does not visibly interfere with the open menu.
4. `Inloggen` and `Probeer 21 dagen gratis` have clear vertical separation of approximately 16px.
5. Logo and close button remain correctly positioned.
6. All navigation links remain visible and usable.
7. Both action buttons remain visible and usable.
8. Closing and reopening the menu still works.
9. Desktop navigation still renders normally at desktop width.

Do not perform a broader visual audit.

If the requested behavior is not correct, make only the smallest necessary correction, rebuild, and repeat this verification.

### Step 7 — Final report and STOP

Show:

- current branch;
- files modified;
- exact CSS/layout changes made;
- whether scroll locking was changed and why;
- build result;
- mobile verification result;
- desktop navigation sanity-check result;
- `git diff --stat`;
- `git status --short`;
- warnings or concerns.

Do not commit.
Do not push.
Do not merge.
Do not deploy.

Stop and wait for approval.