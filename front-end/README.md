# WeLoveMovies Frontend

The WeLoveMovies frontend is a SvelteKit application built as a static SPA-style site. It reads bundled demo data from `src/lib/data/static-data.json`, so the deployed app does not need a backend URL, Convex URL, or hosted database.

## Routes

- `/`: Now Showing.
- `/movies`: All Movies.
- `/movies/[movieId]`: Movie detail, theaters, reviews, and local review controls.
- `/theaters`: All Theaters.

## Source Layout

- `src/routes/`: SvelteKit file-based routes.
- `src/lib/data/`: Static dataset, data access helpers, and tests.
- `src/lib/components/`: Movie, theater, review, header, image, error, and skeleton components.
- `src/lib/stores/theme.ts`: Light/dark theme state.
- `src/lib/types/api.ts`: Shared frontend domain types.
- `src/lib/assets/`: Imported assets used by components.
- `src/convex/`: Legacy Convex functions/tests kept for reference during cleanup.
- `static/`: Static files served from the site root.

## Data

Run this after changing legacy seed data:

```bash
bun run seed:export
```

That regenerates `src/lib/data/static-data.json` with movies, critics, theaters, reviews, and movie/theater joins. Review updates and deletes are local browser-session changes only.

## Scripts

Run these from the repository root unless you are already in `front-end/`.

- `bun run --filter welovemovies-front-end dev`: Start the SvelteKit dev server.
- `bun run --filter welovemovies-front-end build`: Build the static frontend.
- `bun run --filter welovemovies-front-end preview`: Preview the production build.
- `bun run --filter welovemovies-front-end type-check`: Run `svelte-kit sync` and `svelte-check`.
- `bun run --filter welovemovies-front-end test`: Run Vitest tests.
- `bun run --filter welovemovies-front-end seed:export`: Generate bundled static data.
- `bun run --filter welovemovies-front-end format`: Format frontend source files.

## Development Notes

- The app is configured with `@sveltejs/adapter-static` and an `index.html` fallback for direct route refreshes.
- Static data helpers preserve legacy numeric IDs for URL and component compatibility.
- No public environment variables are required for the demo deployment.
- Svelte components use Svelte 5 runes and should stay compatible with `svelte-check`.

View the main README [here](../README.md).
View the back-end README [here](/back-end/README.md).
