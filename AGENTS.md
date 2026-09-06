# Agent Guide

## Project Shape

WeLoveMovies is a Bun-managed SvelteKit static frontend.

- `front-end/`: SvelteKit static SPA frontend using Svelte 5, Vite, TypeScript, Tailwind CSS, and `@sveltejs/adapter-static`.
- `front-end/src/lib/data/`: Bundled demo data and read helpers used by the app.
- `front-end/src/convex/`: Legacy Convex functions and tests kept for reference during cleanup.
- `back-end/`: Legacy Express, Knex, Objection, and TypeScript REST API kept for rollback/reference and seed export.
- The frontend reads bundled static data; do not reintroduce `PUBLIC_CONVEX_URL`, `PUBLIC_API_URL`, `REACT_APP_API_URL`, or the old REST fetch wrapper.
- Keep legacy numeric fields like `movie_id`, `review_id`, and `theater_id` in frontend data shapes for route and component compatibility.

## Frontend Guidance

- Use Svelte 5 patterns and keep code passing `svelte-check`.
- Public routes are `/`, `/movies`, `/movies/[movieId]`, and `/theaters`.
- Shared frontend domain types live in `front-end/src/lib/types/api.ts`.
- Static root assets belong in `front-end/static/`; imported component assets belong in `front-end/src/lib/assets/`.
- Direct URL refreshes must continue to work with the adapter-static fallback.

## Commands

- Install: `bun install`
- Start the frontend: `bun run start`
- Build: `bun run build`
- Type-check: `bun run type-check`
- Tests: `bun run test`
- Regenerate bundled seed data: `bun run seed:export`

## Verification

For frontend changes, run at least:

```bash
bun run type-check
bun run build
```

For route or shared-shell changes, verify the reachable dev server against `/`,
`/movies`, `/movies/[movieId]`, and `/theaters`. For local component changes,
verify the affected routes.
