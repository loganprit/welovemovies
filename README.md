# WeLoveMovies

WeLoveMovies is a movie browsing app for discovering films, reading reviews, and finding theaters. The project uses a static SvelteKit frontend backed by Convex queries and mutations.

Visit the live application [here](https://welovemovies-front-end-ribo.onrender.com/).

## Features

- Browse movies that are currently showing.
- View all movies in the catalog.
- Open movie detail pages with theater availability and critic reviews.
- Browse all theaters and the movies they are showing.
- Update and delete reviews through Convex mutations.
- Toggle between light and dark themes.

## Tech Stack

- **SvelteKit + Svelte 5**: Static SPA-style frontend with file-based routes.
- **Vite**: Frontend development server and production build tooling.
- **TypeScript**: Shared type safety across the frontend and backend.
- **Tailwind CSS**: Responsive frontend styling.
- **Convex**: Backend functions, realtime data, and database.
- **convex-svelte**: Svelte subscriptions and Convex client access.
- **Bun**: Package manager and script runner.
- **Vitest + convex-test**: Convex function tests.

## Project Structure

- `front-end/`: SvelteKit frontend.
  - `src/routes/`: Public routes for `/`, `/movies`, `/movies/[movieId]`, and `/theaters`.
  - `src/convex/`: Convex schema, functions, generated API types, and tests.
  - `src/lib/components/`: Shared Svelte UI components.
  - `src/lib/stores/`: Frontend stores, including theme state.
  - `src/lib/types/`: Shared frontend API and domain types.
  - `static/`: Static assets copied directly into the built frontend.
- `back-end/`: Legacy Express/TypeScript backend kept as rollback/reference and seed source.
  - `src/db/`: Knex migrations, seeds, and connection setup.
  - `src/movies/`: Movie routes, services, and queries.
  - `src/reviews/`: Review routes, services, and queries.
  - `src/theaters/`: Theater routes, services, and queries.
  - `src/types/`: Backend TypeScript types.

## Development Setup

Use Bun `1.2.0` or newer. Node.js `20.19.0` or newer is still compatible with the SvelteKit/Vite toolchain.

1. Install dependencies:

   ```bash
   bun install
   ```

2. Configure Convex:

   ```bash
   cp front-end/.env.example front-end/.env.local
   ```

   For local anonymous development, run:

   ```bash
   bun run convex:dev
   ```

   Convex writes `PUBLIC_CONVEX_URL` to `front-end/.env.local`.

3. Export and import seed data:

   ```bash
   bun run seed:export
   bun run seed:import
   ```

4. Start the frontend:

   ```bash
   bun run start
   ```

## Scripts

Root workspace:

- `bun run start`: Start the SvelteKit dev server.
- `bun run build`: Build the static frontend.
- `bun run type-check`: Run SvelteKit and Svelte type checks.
- `bun run test`: Run Convex function tests.
- `bun run seed:export`: Generate deterministic Convex JSONL seed files from legacy seeds.
- `bun run seed:import`: Import generated seed files into the active Convex dev deployment.
- `bun run convex:dev`: Start Convex dev sync.
- `bun run convex:deploy`: Deploy Convex and build the frontend with `PUBLIC_CONVEX_URL`.

Frontend workspace:

- `bun run --filter welovemovies-front-end dev`: Start the SvelteKit dev server.
- `bun run --filter welovemovies-front-end build`: Build the static SvelteKit frontend.
- `bun run --filter welovemovies-front-end preview`: Preview the production frontend build.
- `bun run --filter welovemovies-front-end type-check`: Run `svelte-check`.
- `bun run --filter welovemovies-front-end test`: Run Convex tests.
- `bun run --filter welovemovies-front-end format`: Format frontend source files.

Legacy backend workspace:

- The `back-end/` directory is no longer an active root workspace.
- Keep it for rollback/reference and for the frontend seed export script.

## API Contract

The frontend uses typed Convex functions from `front-end/src/convex/_generated/api.js`. Keep the public routes and legacy numeric fields such as `movie_id`, `review_id`, and `theater_id` stable for URL and component compatibility.

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
_Overview of all theaters and their movies available in the database._

</td>
<td width="50%">

![Specific Movie Details](/images/specific_movie.jpeg)
_Detailed view of a movie including reviews and showtimes._

</td>
</tr>
</table>

![All Movies](/images/all_movies.jpeg)
_Overview of all movies available in the database._

View the front-end README [here](/front-end/README.md).
View the back-end README [here](/back-end/README.md).
