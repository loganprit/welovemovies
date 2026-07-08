# WeLoveMovies

WeLoveMovies is a static SvelteKit demo app for browsing movies, reading reviews, and finding theaters. The app serves its seed data from the frontend bundle, so it does not need a warmed backend service or hosted database for the demo experience.

## Features

- Browse movies that are currently showing.
- View all movies in the catalog.
- Open movie detail pages with theater availability and critic reviews.
- Browse all theaters and the movies they are showing.
- Adjust and delete reviews locally during the browser session.
- Toggle between light and dark themes.

## Tech Stack

- **SvelteKit + Svelte 5**: Static SPA-style frontend with file-based routes.
- **Vite**: Frontend development server and production build tooling.
- **TypeScript**: Type safety across frontend data and UI code.
- **Tailwind CSS**: Responsive frontend styling.
- **Bundled static data**: Generated from the legacy seeds into `front-end/src/lib/data/static-data.json`.
- **Bun**: Package manager and script runner.
- **Vitest**: Static data and legacy Convex function tests.

## Project Structure

- `front-end/`: SvelteKit frontend.
  - `src/routes/`: Public routes for `/`, `/movies`, `/movies/[movieId]`, and `/theaters`.
  - `src/lib/data/`: Bundled demo data and read helpers used by the app.
  - `src/lib/components/`: Shared Svelte UI components.
  - `src/lib/stores/`: Frontend stores, including theme state.
  - `src/lib/types/`: Shared frontend domain types.
  - `src/convex/`: Legacy Convex functions/tests kept for reference during cleanup.
  - `static/`: Static assets copied directly into the built frontend.
- `back-end/`: Legacy Express/TypeScript backend kept as rollback/reference and seed source.

## Development Setup

Use Bun `1.2.0` or newer. Node.js `20.19.0` or newer is still compatible with the SvelteKit/Vite toolchain.

1. Install dependencies:

   ```bash
   bun install
   ```

2. Regenerate bundled seed data after changing legacy seeds:

   ```bash
   bun run seed:export
   ```

3. Start the frontend:

   ```bash
   bun run start
   ```

No `PUBLIC_CONVEX_URL`, `PUBLIC_API_URL`, or backend environment variable is required for the demo.

## Scripts

Root workspace:

- `bun run start`: Start the SvelteKit dev server.
- `bun run build`: Build the static frontend.
- `bun run type-check`: Run SvelteKit and Svelte type checks.
- `bun run test`: Run Vitest tests.
- `bun run seed:export`: Generate `front-end/src/lib/data/static-data.json` from legacy seeds.

Frontend workspace:

- `bun run --filter welovemovies-front-end dev`: Start the SvelteKit dev server.
- `bun run --filter welovemovies-front-end build`: Build the static SvelteKit frontend.
- `bun run --filter welovemovies-front-end preview`: Preview the production frontend build.
- `bun run --filter welovemovies-front-end type-check`: Run `svelte-check`.
- `bun run --filter welovemovies-front-end test`: Run Vitest tests.
- `bun run --filter welovemovies-front-end seed:export`: Generate bundled static demo data.
- `bun run --filter welovemovies-front-end format`: Format frontend source files.

## Data Contract

The frontend reads from `front-end/src/lib/data/staticData.ts`, which preserves legacy numeric fields such as `movie_id`, `review_id`, and `theater_id` for route and component compatibility.

## Screenshots

<table>
<tr>
<td width="50%">

![Dark Mode](/images/now_showing_dark.jpeg)
_A preview of dark mode on the Now Showing page._

</td>
<td width="50%">

![Now Showing](/images/now_showing.jpeg)
_List of movies currently showing in theaters._

</td>
</tr>
<tr>
<td width="50%">

![All Theaters](/images/all_theaters.jpeg)
_Overview of all theaters and their movies available in the dataset._

</td>
<td width="50%">

![Specific Movie Details](/images/specific_movie.jpeg)
_Detailed view of a movie including reviews and showtimes._

</td>
</tr>
</table>

![All Movies](/images/all_movies.jpeg)
_Overview of all movies available in the dataset._

View the front-end README [here](/front-end/README.md).
View the back-end README [here](/back-end/README.md).
