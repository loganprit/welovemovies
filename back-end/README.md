# WeLoveMovies Backend

The WeLoveMovies backend is the existing Node.js, Express, TypeScript, Knex, and Objection API that powers the movie browsing frontend. It remains independent from the SvelteKit frontend and should continue returning the current `{ data, error }` response shape.

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

Tests use an in-memory SQLite database through the workspace test script.

## Scripts

Run these from the repository root unless you are already in `back-end/`.

- `npm run start --workspace=back-end`: Build and start the compiled Express server.
- `npm run start:dev --workspace=back-end`: Start the backend with `ts-node-dev`.
- `npm run build --workspace=back-end`: Compile TypeScript into `dist/`.
- `npm run type-check --workspace=back-end`: Type-check without emitting files.
- `npm test --workspace=back-end`: Run Jest/Supertest against in-memory SQLite.
- `npm run migrate --workspace=back-end`: Run development migrations.
- `npm run seed --workspace=back-end`: Seed the development database.
- `npm run db:reset:dev --workspace=back-end`: Roll back, migrate, and seed development data.

## Frontend Contract

The SvelteKit frontend calls this API through `PUBLIC_API_URL`. Preserve these response envelopes unless both sides are updated together:

```ts
type ApiResponse<T> = {
  data: T;
  error?: string;
};
```

View the main README [here](../README.md).
View the front-end README [here](/front-end/README.md).
