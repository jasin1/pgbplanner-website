We have completed and approved all work on feat/blog.

The latest approved commit on feat/blog is:

635b6f3 fix: regenerate launch images from approved masters

The previous approved homepage launch commit is:

c7d2705 feat: update launch homepage visuals and Vooruitblik section

All required work has been reviewed, technically verified, built successfully, visually approved on localhost, committed, and pushed to origin/feat/blog.

Now merge feat/blog into main and push main to origin.

IMPORTANT

- Do not modify any files.
- Do not stage or commit the untracked prompt docs.
- Do not stage or commit screenshots/.
- Do not delete or clean untracked files.
- Do not use git stash.
- Do not amend any commits.
- Do not rebase.
- Do not reset.
- Do not squash.
- Do not force-push.
- Do not deploy manually.
- Do not make any new implementation changes.
- Preserve the existing commit history.

STEP 1 — PREFLIGHT

Before changing branches or merging:

1. Confirm the current branch is feat/blog.

2. Run:

git status --short

3. Verify there are no tracked modifications and no staged files.

The only expected working-tree entries are untracked files under:

docs/prompts/
screenshots/

If there are tracked modifications, staged files, or unexpected untracked files outside those locations, STOP and report the discrepancy.

4. Confirm feat/blog is synchronized with origin/feat/blog.

Run:

git fetch origin
git status
git rev-parse HEAD
git rev-parse origin/feat/blog

Verify local feat/blog HEAD equals origin/feat/blog and that HEAD is commit 635b6f3.

If not, STOP and report.

5. Inspect main before merging.

Run:

git rev-parse main
git rev-parse origin/main
git log --oneline --decorate -10 main
git log --oneline --decorate -10 feat/blog

6. Verify local main is synchronized with origin/main.

If local main differs from origin/main, STOP and report. Do not merge.

7. Show the commits that exist on feat/blog but not on main:

git log --oneline main..feat/blog

Review the output.

Confirm that the commits to be introduced are the expected approved feat/blog work.

If unexpected commits are present, STOP and report before merging.

STEP 2 — CHECKOUT MAIN

Switch to main:

git checkout main

Run:

git status --short

Confirm:

- current branch is main;
- no tracked modifications or staged files exist;
- the expected untracked docs/prompts/ and screenshots/ files remain untouched.

If anything differs, STOP and report.

STEP 3 — MERGE FEAT/BLOG INTO MAIN

Merge using:

git merge --no-ff feat/blog

Do not squash.

Do not rebase.

Do not manually resolve conflicts without stopping first.

If any merge conflict occurs, STOP immediately and report the conflicting files. Do not modify files to resolve conflicts.

STEP 4 — VERIFY MERGE BEFORE PUSHING

Do not push yet.

Run:

git status
git log --oneline --decorate -10
git diff HEAD^1..HEAD --stat
git diff HEAD^1..HEAD --name-status

Verify:

1. The merge completed successfully.
2. The current branch is main.
3. There are no tracked modifications or staged files after the merge.
4. The expected untracked prompt docs and screenshots/ remain untouched.
5. The merge introduced the expected feat/blog changes and no unrelated files.

Then run:

npm run build

The build must succeed.

The known pre-existing getStaticPaths() warning for the dynamic blog route is acceptable.

If the build fails, another unexpected warning/error appears, or the merged scope differs from expectations, STOP and report.

Do not push main.

STEP 5 — PUSH MAIN

Only after all Step 4 verification passes:

git push origin main

Do not force-push.

STEP 6 — VERIFY PUSH

Run:

git rev-parse HEAD
git rev-parse origin/main
git status --short
git log --oneline --decorate -10

Verify local main HEAD equals origin/main.

STEP 7 — FINAL REPORT

Report:

1. Pre-merge feat/blog commit hash.
2. Pre-merge main commit hash.
3. Commits introduced by feat/blog into main.
4. Merge result.
5. Merge commit hash.
6. Build result after merge and before push.
7. Push result.
8. Confirmation that local main and origin/main point to the same commit.
9. Final git status --short.
10. Remaining untracked files.
11. Any warnings or concerns.
12. Explicit confirmation that no files were modified, no untracked files were staged/deleted, and no amend, rebase, reset, squash, force-push, manual deploy, or conflict resolution was performed.

Do not perform a manual deployment.

Do not perform the live visual review yet.

Stop after the final report.