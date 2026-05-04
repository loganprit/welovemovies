# Claude Guide

Follow `AGENTS.md` first. This file exists so Claude-style agents get the same project context quickly.

## Current Stack

- Frontend: SvelteKit, Svelte 5, Vite, TypeScript, Tailwind CSS, `@sveltejs/adapter-static`.
- Backend: Express, TypeScript, Knex, Objection, PostgreSQL in production, SQLite for tests.
- Package manager: npm workspaces.

## Important Conventions

- Use `PUBLIC_API_URL` for frontend API configuration.
- Keep the frontend/backend split deployment model.
- Preserve public routes: `/`, `/movies`, `/movies/[movieId]`, `/theaters`.
- Preserve backend `{ data, error }` response envelopes.
- Do not bring back CRA, React Router, `react-app-rewired`, or `REACT_APP_API_URL`.

## Useful Commands

```bash
npm install
npm run start --workspace=front-end
npm run build --workspace=front-end
npm run type-check --workspace=front-end
npm run type-check --workspace=back-end
npm test --workspace=back-end
```

Use Browser verification for UI/routing work, especially direct refreshes for dynamic routes like `/movies/1`.
