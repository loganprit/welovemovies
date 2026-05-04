# Claude Guide

Follow `AGENTS.md` first. This file exists so Claude-style agents get the same project context quickly.

## Current Stack

- Frontend: SvelteKit, Svelte 5, Vite, TypeScript, Tailwind CSS, `@sveltejs/adapter-static`.
- Backend: Convex schema, queries, mutations, and database.
- Legacy backend: `back-end/` Express/Knex code retained as rollback/reference and seed source.
- Package manager: Bun workspace.

## Important Conventions

- Use `PUBLIC_CONVEX_URL` for frontend Convex configuration.
- Preserve public routes: `/`, `/movies`, `/movies/[movieId]`, `/theaters`.
- Preserve legacy numeric IDs in Convex documents for URL/component compatibility.
- Do not bring back CRA, React Router, `react-app-rewired`, or `REACT_APP_API_URL`.

## Useful Commands

```bash
bun install
bun run start
bun run type-check
bun run test
bun run build
bun run seed:export
bun run seed:import
```

Use Browser verification for UI/routing work, especially direct refreshes for dynamic routes like `/movies/1`.
