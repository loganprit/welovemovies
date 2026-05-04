# WeLoveMovies Backend

The WeLoveMovies backend is the legacy Node.js, Express, TypeScript, Knex, and Objection API. The active app now uses Convex as the backend of record, so this directory is kept for rollback/reference and as the seed data source for `front-end/scripts/export-convex-seeds.ts`.

## API Areas

- `/movies`: Movie listing and movie detail endpoints.
- `/movies/:movieId/reviews`: Reviews for a movie.
- `/movies/:movieId/theaters`: Theaters showing a movie.
- `/theaters`: Theater listing endpoints.
- `/reviews/:reviewId`: Review update and delete endpoints.

## Source Layout

- `src/app.ts`: Express app configuration and middleware.
- `src/server.ts`: Server entrypoint.
- `src/db/`: Knex connection, migrations, and seeds.
- `src/movies/`: Movie routes, controller, service, and queries.
- `src/reviews/`: Review routes, controller, service, and queries.
- `src/theaters/`: Theater routes, controller, service, and queries.
- `src/errors/`: Shared error handling.
- `src/types/`: Backend TypeScript types.

## Environment

Copy the sample environment file and set the database URL:

```bash
cp back-end/.env.sample back-end/.env
```

```bash
DATABASE_URL=postgres://...
NODE_ENV=development
```

Tests use an in-memory SQLite database when running the legacy backend directly.

## Scripts

The backend is no longer an active root workspace. To run it directly, work inside `back-end/`, install its local dependencies, and use the package scripts defined in `back-end/package.json`.

## Current Frontend Contract

The SvelteKit frontend now calls Convex functions through `PUBLIC_CONVEX_URL`. Preserve the legacy seed shape and numeric IDs because the Convex export script depends on this directory.

View the main README [here](../README.md).
View the front-end README [here](/front-end/README.md).
