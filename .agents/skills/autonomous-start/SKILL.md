---
name: autonomous-start
description: Use when portfolio work should be chosen automatically, including prompts like "what's next?", "pick something to work on", "work on this while I'm away", or "have it merge-ready". If the request includes `--full`, continue through merge and cleanup instead of stopping at merge-ready.
---

# Autonomous Start

Use this skill when Logan delegates task selection for this personal portfolio.
If Logan names a specific task, follow that task instead of choosing one.

This repository is a Next.js App Router portfolio. Keep work lightweight,
repo-local, and tied to the current project state. Do not depend on roadmap
documents or create roadmap documents.

If the request includes `--full`, treat that as explicit permission to continue
past merge-ready through merge and cleanup. Without `--full`, stop once the
change is merge-ready unless Logan explicitly asks to keep going.

## Choose The Slice

Before choosing work, inspect the current state:

1. Check branch and local changes:

   ```bash
   git status --short --branch
   git log --oneline -5
   ```

2. Read the local project guidance:

   - `AGENTS.md`
   - `README.md`
   - `package.json`

3. Inspect relevant source areas based on the likely task:

   - `src/app/` for routing, layout, API, service worker, and global styles
   - `src/components/` for reusable UI and theme components
   - `src/data/` for portfolio content
   - `src/hooks/` for client-side behavior
   - `src/lib/` for shared utilities, animation config, and theme scripts
   - `public/` for static assets

Pick work in this order:

1. The explicit task Logan named.
2. A small fix needed by current local changes or failed validation.
3. A stale documentation/content mismatch visible from `README.md`,
   `AGENTS.md`, `package.json`, or `src/data/`.
4. A tightly scoped UI, accessibility, performance, or maintenance improvement
   that can be verified with the local `verify` skill.

Do not invent broad redesigns, large refactors, or backlog systems. If multiple
good slices are possible, choose the smallest user-visible or validation-relevant
one and state why.

## Start The Workflow

Once the slice is chosen:

1. If the work changes tracked files, create an isolated git worktree on a
   `codex/` branch unless Logan tells you to work in the current checkout.
2. If the work only changes ignored local agent files, it is acceptable to work
   in the current checkout after confirming the files are ignored.
3. Preserve unrelated local changes. Never revert existing edits unless Logan
   explicitly asks.
4. If the slice has more than three meaningful steps, create todos so progress
   stays visible.
5. If the slice is multi-step or spans multiple subsystems, use the normal plan
   workflow before implementation.
6. For frontend or content changes, use the local `portfolio-guidelines` skill
   while designing or reviewing the change.

## Finish The Slice

Before claiming completion or opening a PR:

1. Run the local `verify` skill.
2. Manually check any user-facing behavior touched by the change.
3. If tracked files changed, summarize the branch state and whether the work is
   ready to commit, push, or open as a PR.
4. When waiting for Codex review, check both review/comment signals and PR
   description reactions before deciding whether to keep waiting:

   ```bash
   gh pr view <number> --repo <owner>/<repo> \
     --json reviews,comments,reviewDecision,statusCheckRollup,isDraft,state,url

   gh api repos/<owner>/<repo>/issues/<number>/reactions \
     --jq '.[] | select(.user.login == "chatgpt-codex-connector[bot]" and .content == "+1")'
   ```

   A `+1` reaction from `chatgpt-codex-connector[bot]` on the PR description
   means Codex reviewed the PR and found no suggestions. Treat that as a clean
   Codex review signal. Do not keep polling or re-trigger `@codex review` just
   because `reviewDecision` still says `REVIEW_REQUIRED` or there is no Codex
   review object.
5. Treat the PR as merge-ready when all required checks pass, it is not a draft,
   there are no unresolved actionable review comments, and either Codex left
   actionable feedback that has been addressed or the Codex bot left the PR
   description `+1` reaction.
6. If `--full` was requested and the PR is merge-ready, merge it, sync the base
   checkout, remove the feature worktree, delete local and remote feature
   branches when appropriate, and run `git fetch --prune origin`.
7. Stop any leftover subagents and leave a concise summary of what changed,
   what was verified, and any remaining handoff.
