# WeLoveMovies Frontend

The WeLoveMovies frontend is a SvelteKit application built as a static SPA-style site. It deploys separately from the API and talks to the existing Express backend through `PUBLIC_API_URL`.

## Routes

- `/`: Now Showing.
- `/movies`: All Movies.
- `/movies/[movieId]`: Movie detail, theaters, reviews, review update, and review delete controls.
- `/theaters`: All Theaters.

## Source Layout

- `src/routes/`: SvelteKit file-based routes.
- `src/lib/api.ts`: Fetch client for the backend `{ data, error }` API contract.
- `src/lib/components/`: Movie, theater, review, header, image, error, and skeleton components.
- `src/lib/stores/theme.ts`: Light/dark theme state.
- `src/lib/types/api.ts`: Shared frontend domain and API types.
- `src/lib/assets/`: Imported assets used by components.
- `static/`: Static files served from the site root.

## Environment

Use SvelteKit's public environment variable convention:

```bash
PUBLIC_API_URL=http://localhost:5001
```

Only variables prefixed with `PUBLIC_` are available in browser code. The local fallback is `http://localhost:5001`.

## Scripts

Run these from the repository root unless you are already in `front-end/`.

- `npm run start --workspace=front-end`: Start the SvelteKit dev server.
- `npm run dev --workspace=front-end`: Alias for the dev server.
- `npm run build --workspace=front-end`: Build the static frontend.
- `npm run preview --workspace=front-end`: Preview the production build.
- `npm run type-check --workspace=front-end`: Run `svelte-kit sync` and `svelte-check`.
- `npm run format --workspace=front-end`: Format frontend source files.

## Development Notes

- The app is configured with `@sveltejs/adapter-static` and an `index.html` fallback for direct route refreshes.
- The frontend intentionally does not proxy API requests through SvelteKit server routes; it calls the public API URL directly.
- Keep public route behavior aligned with the backend contract before changing `src/lib/api.ts`.
- Svelte components use Svelte 5 runes and should stay compatible with `svelte-check`.

View the main README [here](../README.md).
View the back-end README [here](/back-end/README.md).
