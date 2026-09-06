---
name: autonomous-start
description: Choose and carry a small verified welovemovies task when the user delegates task selection; `--full` additionally authorizes merge and cleanup.
---

# Autonomous Start

Use this skill when Logan delegates task selection for WeLoveMovies. If Logan
names a specific task, follow it instead of choosing one.

Keep work lightweight, repo-local, and tied to the current SvelteKit app. The
user-facing app lives in `front-end/` and serves bundled static data. Treat
`front-end/src/convex/` and `back-end/` as legacy reference/rollback code unless
the task explicitly targets them. Do not create roadmap documents.

If the request includes `--full`, treat that as explicit permission to continue
past merge-ready through merge and cleanup. Without `--full`, stop once the
change is merge-ready unless Logan explicitly asks to keep going.

## Choose The Slice

Inspect the current state before choosing work:

1. Check the branch and local changes:

   ```bash
   git status --short --branch
   git log --oneline -5
   ```

2. Read `AGENTS.md`, `README.md`, `package.json`, and `front-end/package.json`.

3. Inspect the relevant area under `front-end/src/routes/`,
   `front-end/src/lib/`, or `front-end/static/`.

Pick work in this order:

1. The explicit task Logan named.
2. A small fix needed by current local changes or failed validation.
3. A stale documentation/content mismatch visible from `README.md`,
   `AGENTS.md`, the package manifests, or the bundled data helpers.
4. A tightly scoped UI, accessibility, performance, or maintenance improvement
   that can be verified with the repository's Bun scripts.

Do not invent broad redesigns, large refactors, or backlog systems. If multiple
good slices are possible, choose the smallest user-visible or validation-relevant
one and state why.

## Start The Workflow

Once the slice is chosen:

1. For tracked changes, create an isolated git worktree on a `codex/` branch
   unless Logan tells you to work in the current checkout.
2. Preserve unrelated local changes. Never revert existing edits unless Logan
   explicitly asks.
3. If the slice is multi-step or spans multiple subsystems, use the normal plan
   workflow before implementation.

## Finish The Slice

Before claiming completion or opening a PR:

1. Run the relevant Bun checks: `bun run type-check`, `bun run build`, and
   `bun run test` as the changed area requires.
2. For route or shared-shell changes, check the reachable URL reported by
   `bun run start` across `/`, `/movies`, `/movies/[movieId]`, and `/theaters`;
   for local component changes, check the affected routes.
3. If tracked files changed, summarize the branch state and whether the work is
   ready to commit, push, or open as a PR.
4. When waiting for Codex review, check both review/comment signals and PR
   description reactions before deciding whether to keep waiting.
5. Treat the PR as merge-ready only when required checks pass, it is not a draft,
   an independent review of the current commit is explicitly completed and
   approved, and actionable review feedback is resolved.
6. If `--full` was requested and the PR is merge-ready, merge it, sync the base
   checkout, remove the feature worktree, delete local and remote feature
   branches when appropriate, and run `git fetch --prune origin`.
7. Stop any leftover subagents and leave a concise handoff.
