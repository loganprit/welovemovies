# Agent Guide

## Memory Protocol

Memory is accessed only through the `memory` skill CLI. Do not use file-based memory stores.

Before responding to any request:

```bash
uv run --project ~/.codex/skills/memory-cli python ~/.codex/skills/memory-cli/memory_cli.py search-tags --tags critical
uv run --project ~/.codex/skills/memory-cli python ~/.codex/skills/memory-cli/memory_cli.py retrieve --query "<task topic>" --n 5
```

Critical memories override other information when they conflict. Do not update or delete memories without explicit permission.

## Project Shape

WeLoveMovies is now a SvelteKit plus Convex application.

- `front-end/`: SvelteKit static SPA frontend using Svelte 5, Vite, TypeScript, Tailwind CSS, and `@sveltejs/adapter-static`.
- `front-end/src/convex/`: Convex schema, queries, mutations, generated API types, and tests.
- `back-end/`: Legacy Express, Knex, Objection, and TypeScript REST API kept for rollback/reference and seed export.
- The frontend talks to Convex through `PUBLIC_CONVEX_URL`; do not reintroduce `PUBLIC_API_URL`, `REACT_APP_API_URL`, or the old REST fetch wrapper.
- Keep legacy numeric fields like `movie_id`, `review_id`, and `theater_id` in Convex-facing shapes for route and component compatibility.

## Frontend Guidance

- Use Svelte 5 patterns and keep code passing `svelte-check`.
- Public routes are `/`, `/movies`, `/movies/[movieId]`, and `/theaters`.
- Shared frontend domain types live in `front-end/src/lib/types/api.ts`.
- Convex behavior lives in `front-end/src/convex/`.
- Static root assets belong in `front-end/static/`; imported component assets belong in `front-end/src/lib/assets/`.
- Direct URL refreshes must continue to work with the adapter-static fallback.

## Commands

- Install: `bun install`
- Frontend dev: `bun run start`
- Frontend build: `bun run build`
- Frontend type-check: `bun run type-check`
- Convex tests: `bun run test`
- Convex dev: `bun run convex:dev`
- Seed export/import: `bun run seed:export`, then `bun run seed:import`

## Verification

For frontend changes, run at least:

```bash
bun run type-check
bun run build
```

For Convex changes, run at least:

```bash
bun run test
```

For route or UI changes, verify in Browser against `/`, `/movies`, `/movies/[movieId]`, and `/theaters`.
