import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";
import {
  criticFixtures,
  movieFixtures,
  movieTheaterFixtures,
  reviewFixtures,
  theaterFixtures,
} from "./testFixtures";

const modules = import.meta.glob("./**/*.*s");

async function seed(t: ReturnType<typeof convexTest>) {
  await t.run(async (ctx) => {
    for (const movie of movieFixtures) await ctx.db.insert("movies", movie);
    for (const critic of criticFixtures) await ctx.db.insert("critics", critic);
    for (const review of reviewFixtures) await ctx.db.insert("reviews", review);
    for (const theater of theaterFixtures)
      await ctx.db.insert("theaters", theater);
    for (const join of movieTheaterFixtures)
      await ctx.db.insert("movies_theaters", join);
  });
}

describe("movies Convex functions", () => {
  test("lists all movies in legacy movie_id order", async () => {
    const t = convexTest(schema, modules);
    await seed(t);

    const movies = await t.query(api.movies.list, {});

    expect(movies.map((movie) => movie.title)).toEqual([
      "Spirited Away",
      "Interstellar",
      "Rear Window",
    ]);
  });

  test("lists only movies with showing theater joins", async () => {
    const t = convexTest(schema, modules);
    await seed(t);

    const movies = await t.query(api.movies.list, { isShowing: true });

    expect(movies.map((movie) => movie.movie_id)).toEqual([1, 3]);
  });

  test("reads a movie with reviews and theaters", async () => {
    const t = convexTest(schema, modules);
    await seed(t);

    const movie = await t.query(api.movies.read, { movieId: 1 });

    expect(movie).toMatchObject({
      movie_id: 1,
      title: "Spirited Away",
      reviews: [
        {
          review_id: 1,
          critic: {
            preferred_name: "Chana",
            organization_name: "Film Frenzy",
          },
        },
        {
          review_id: 2,
          critic: {
            preferred_name: "Maria",
            organization_name: "The Spool",
          },
        },
      ],
      theaters: [
        {
          theater_id: 1,
          is_showing: true,
        },
        {
          theater_id: 2,
          is_showing: true,
        },
      ],
    });
  });

  test("returns null for a missing movie", async () => {
    const t = convexTest(schema, modules);
    await seed(t);

    const movie = await t.query(api.movies.read, { movieId: 999 });

    expect(movie).toBeNull();
  });
});
