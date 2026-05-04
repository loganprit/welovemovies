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

WeLoveMovies is now a split SvelteKit plus Express application.

- `front-end/`: SvelteKit static SPA frontend using Svelte 5, Vite, TypeScript, Tailwind CSS, and `@sveltejs/adapter-static`.
- `back-end/`: Existing Express, Knex, Objection, and TypeScript REST API.
- The frontend talks to the backend through `PUBLIC_API_URL`; do not reintroduce `REACT_APP_API_URL`.
- The backend response contract is `{ data, error }`.
- Keep the backend deployment and routes unchanged unless the task explicitly asks for backend behavior changes.

## Frontend Guidance

- Use Svelte 5 patterns and keep code passing `svelte-check`.
- Public routes are `/`, `/movies`, `/movies/[movieId]`, and `/theaters`.
- Shared frontend domain types live in `front-end/src/lib/types/api.ts`.
- API behavior lives in `front-end/src/lib/api.ts`.
- Static root assets belong in `front-end/static/`; imported component assets belong in `front-end/src/lib/assets/`.
- Direct URL refreshes must continue to work with the adapter-static fallback.

## Commands

- Install: `npm install`
- Frontend dev: `npm run start --workspace=front-end`
- Frontend build: `npm run build --workspace=front-end`
- Frontend type-check: `npm run type-check --workspace=front-end`
- Backend type-check: `npm run type-check --workspace=back-end`
- Backend tests: `npm test --workspace=back-end`
- Full build: `npm run build`

## Verification

For frontend changes, run at least:

```bash
npm run type-check --workspace=front-end
npm run build --workspace=front-end
```

For backend changes, run at least:

```bash
npm run type-check --workspace=back-end
npm test --workspace=back-end
```

For route or UI changes, verify in Browser against `/`, `/movies`, `/movies/[movieId]`, and `/theaters`.
