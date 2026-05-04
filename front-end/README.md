# WeLoveMovies Frontend

The WeLoveMovies frontend is a SvelteKit application built as a static SPA-style site. It talks directly to Convex through `convex-svelte` and `PUBLIC_CONVEX_URL`.

## Routes

- `/`: Now Showing.
- `/movies`: All Movies.
- `/movies/[movieId]`: Movie detail, theaters, reviews, review update, and review delete controls.
- `/theaters`: All Theaters.

## Source Layout

- `src/routes/`: SvelteKit file-based routes.
- `src/convex/`: Convex schema, functions, generated API types, and function tests.
- `src/lib/components/`: Movie, theater, review, header, image, error, and skeleton components.
- `src/lib/stores/theme.ts`: Light/dark theme state.
- `src/lib/types/api.ts`: Shared frontend domain and API types.
- `src/lib/assets/`: Imported assets used by components.
- `static/`: Static files served from the site root.

## Environment

Use SvelteKit's public environment variable convention:

```bash
PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

Only variables prefixed with `PUBLIC_` are available in browser code. `bun run convex:dev` writes a local development URL to `.env.local`.

## Scripts

Run these from the repository root unless you are already in `front-end/`.

- `bun run --filter welovemovies-front-end dev`: Start the SvelteKit dev server.
- `bun run --filter welovemovies-front-end build`: Build the static frontend.
- `bun run --filter welovemovies-front-end preview`: Preview the production build.
- `bun run --filter welovemovies-front-end type-check`: Run `svelte-kit sync` and `svelte-check`.
- `bun run --filter welovemovies-front-end test`: Run Convex function tests.
- `bun run --filter welovemovies-front-end seed:export`: Generate Convex JSONL seed files.
- `bun run --filter welovemovies-front-end seed:import`: Import generated seed files into Convex.
- `bun run --filter welovemovies-front-end format`: Format frontend source files.

## Development Notes

- The app is configured with `@sveltejs/adapter-static` and an `index.html` fallback for direct route refreshes.
- Convex functions preserve legacy numeric IDs for route compatibility.
- Keep public route behavior aligned with the Convex functions before changing `src/convex/`.
- Svelte components use Svelte 5 runes and should stay compatible with `svelte-check`.

View the main README [here](../README.md).
View the back-end README [here](/back-end/README.md).
