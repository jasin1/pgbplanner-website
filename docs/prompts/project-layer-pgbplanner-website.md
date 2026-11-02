# Prompt: ai-toolkit project layer for pgbplanner-website

## Context

My user-level Claude Code config comes from my `ai-toolkit` repo (linked as `~/.claude/ai-toolkit`). Read these first:

- `~/.claude/ai-toolkit/docs/risiconiveaus.md`: the rules (leading)
- `~/.claude/ai-toolkit/templates/project/`: the template for a project layer
- `~/.claude/agents/advisor.md`: where the advisor expects `advisor-context.md`
- As a worked example: the project layer of `pgbplanner-app` (its `.claude/settings.json`, the section "Risico's in dit project" at the end of its `CLAUDE.md`, and its `advisor-context.md`). Same approach, but this repo is simpler: a marketing site, no database, no billing.

This task: add the project layer for `pgbplanner-website` (Astro/MDX marketing site, deployed by Netlify from `main`).

Risk level: 1 (config and docs, no effect on the live site). Editing `.claude/settings*.json` asks for my click. Work on `main`, commit only this task's files, do not push.

Start with `python3 ~/.claude/ai-toolkit/tools/run_init.py project-layer` and keep `plan.md`, `decisions.md`, `review.md` and `report.md` in that run folder.

## Phase 1: Audit (read-only, no stop)

1. Read `CLAUDE.md`, `.claude/settings.local.json`, `.claude/settings.json` (if any), `package.json` scripts, `.gitignore`, `netlify.toml`.
2. Find where the risks live, with real paths:
   - level 2: blog articles and the `draft` flag, page copy users see, SEO-relevant files (meta, sitemap, redirects, robots), anything that changes what is live
   - level 3: forms or scripts that collect email addresses or personal data (e.g. Kit/ConvertKit), analytics and tracking (PostHog), cookie/consent handling, the privacy statement and terms
3. Determine a fast check command for the stop hook (e.g. `astro check`, or a build if that is fast enough). Run it once to see that it works and how long it takes. If it fails on existing code, report it; don't fix code in this task.
4. Find the source docs for the advisor context: `docs/Kompas/` (a local symlink to the app repo's Kompas, current version only, not `archive/`), the editorial guide, the blog CTA spec, and any positioning or SEO principle docs in this repo.

## Phase 2: Proposal (STOP for me)

Write to `plan.md` and give me a short summary in Dutch:

1. `.claude/settings.json`: `env.AI_TOOLKIT_CHECK` plus project-specific ask/deny rules the user level doesn't already cover (e.g. curl to Kit or PostHog APIs, any script that sends email or touches subscribers).
2. Cleanup of `.claude/settings.local.json`: keep useful rules, remove one-off, broad or duplicate ones. Never print secret values.
3. A new section at the end of `CLAUDE.md` (based on the template): check command, level 2 and level 3 areas with real paths, extra ask actions, where `advisor-context.md` lives. Include the known pattern: articles are committed as `draft: true`; publishing (flipping to `draft: false`) is level 2; to read a draft locally, set `draft: false` temporarily without committing and set it back.
4. The full draft text of `advisor-context.md` (English, max 1 to 2 pages): what the site is for, the voice and writing rules, max 5 principles (positioning, SEO, content), hard rules, and what always goes to me. Use **durable wording**: no numbers or facts that change often (user counts, current campaigns, dates). The card must stay true for months.
5. Whether `.claude/settings.local.json` and `_local/` are gitignored.

Writing rules to include in the advisor context (verbatim facts from me): Dutch copy in first person singular ("ik", never "wij"), direct and concise, no em-dashes, no fear-based language, "zorgverlener" in new or changed copy (do not rename existing occurrences unless a task asks for it).

Stop and wait for my approval of the proposal and the advisor-context text in one go.

## Phase 3: Build

After my approval: write the files, validate the JSON, run the check once, let the `reviewer` subagent review against `plan.md`, then commit on `main` (only `.claude/settings.json`, `CLAUDE.md`, `advisor-context.md`, `.gitignore` if changed). No attribution lines. Do not push.

## Phase 4: Final report

Write `report.md` and give me, in Dutch and short: what was added and cleaned up, your own decisions (one line each), the reviewer's verdict, anything not according to plan, and that a new session is needed to load the new settings.
