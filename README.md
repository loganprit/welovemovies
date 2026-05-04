# WeLoveMovies

WeLoveMovies is a movie browsing app for discovering films, reading reviews, and finding theaters. The project uses a split deployment model: a static SvelteKit frontend talks to an existing Express/Knex REST API through a public API URL.

Visit the live application [here](https://welovemovies-front-end-ribo.onrender.com/).

## Features

- Browse movies that are currently showing.
- View all movies in the catalog.
- Open movie detail pages with theater availability and critic reviews.
- Browse all theaters and the movies they are showing.
- Update and delete reviews through the existing API.
- Toggle between light and dark themes.

## Tech Stack

- **SvelteKit + Svelte 5**: Static SPA-style frontend with file-based routes.
- **Vite**: Frontend development server and production build tooling.
- **TypeScript**: Shared type safety across the frontend and backend.
- **Tailwind CSS**: Responsive frontend styling.
- **Node.js + Express**: REST API server.
- **Knex + Objection**: Database access and models.
- **PostgreSQL**: Production database.
- **SQLite**: In-memory test database.
- **Jest + Supertest**: Backend API tests.

## Project Structure

- `front-end/`: SvelteKit frontend.
  - `src/routes/`: Public routes for `/`, `/movies`, `/movies/[movieId]`, and `/theaters`.
  - `src/lib/api.ts`: API client using `PUBLIC_API_URL`.
  - `src/lib/components/`: Shared Svelte UI components.
  - `src/lib/stores/`: Frontend stores, including theme state.
  - `src/lib/types/`: Shared frontend API and domain types.
  - `static/`: Static assets copied directly into the built frontend.
- `back-end/`: Express/TypeScript backend.
  - `src/db/`: Knex migrations, seeds, and connection setup.
  - `src/movies/`: Movie routes, services, and queries.
  - `src/reviews/`: Review routes, services, and queries.
  - `src/theaters/`: Theater routes, services, and queries.
  - `src/types/`: Backend TypeScript types.

## Development Setup

Use Node.js `20.19.0` or newer for the SvelteKit/Vite frontend.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the backend:

   ```bash
   cp back-end/.env.sample back-end/.env
   ```

   Set `DATABASE_URL` in `back-end/.env`.

3. Configure the frontend API URL when needed:

   ```bash
   PUBLIC_API_URL=http://localhost:5001
   ```

   SvelteKit exposes only variables prefixed with `PUBLIC_` to browser code. If `PUBLIC_API_URL` is omitted, the frontend falls back to `http://localhost:5001`.

4. Prepare the development database:

   ```bash
   npm run db:reset:dev --workspace=back-end
   ```

5. Start both workspaces:

   ```bash
   npm start
   ```

## Scripts

Root workspace:

- `npm start`: Start frontend and backend together.
- `npm run build`: Build all workspaces.
- `npm run type-check --workspace=front-end`: Run SvelteKit and Svelte type checks.
- `npm run type-check --workspace=back-end`: Run backend TypeScript checks.
- `npm test --workspace=back-end`: Run backend Jest tests.

Frontend workspace:

- `npm run start --workspace=front-end`: Start the SvelteKit dev server.
- `npm run build --workspace=front-end`: Build the static SvelteKit frontend.
- `npm run preview --workspace=front-end`: Preview the production frontend build.
- `npm run type-check --workspace=front-end`: Run `svelte-check`.
- `npm run format --workspace=front-end`: Format frontend source files.

Backend workspace:

- `npm run start --workspace=back-end`: Build and start the Express server.
- `npm run start:dev --workspace=back-end`: Start the backend in watch mode.
- `npm run migrate --workspace=back-end`: Run development migrations.
- `npm run seed --workspace=back-end`: Seed the development database.
- `npm run db:reset:dev --workspace=back-end`: Roll back, migrate, and seed the development database.
- `npm test --workspace=back-end`: Run backend tests against an in-memory SQLite database.

## API Contract

The frontend expects the existing backend response shape:

```ts
type ApiResponse<T> = {
  data: T;
  error?: string;
};
```

Keep backend routes and response contracts stable unless the frontend API client is updated at the same time.

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
