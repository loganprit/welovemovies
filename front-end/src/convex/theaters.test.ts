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

describe("theaters Convex functions", () => {
  test("lists theaters with nested movies", async () => {
    const t = convexTest(schema, modules);
    await seed(t);

    const theaters = await t.query(api.theaters.list, {});

    expect(theaters).toMatchObject([
      {
        theater_id: 1,
        name: "Regal City Center",
        movies: [
          { movie_id: 1, title: "Spirited Away", is_showing: true },
          { movie_id: 2, title: "Interstellar", is_showing: false },
        ],
      },
      {
        theater_id: 2,
        name: "Hollywood Theatre",
        movies: [
          { movie_id: 1, title: "Spirited Away", is_showing: true },
          { movie_id: 3, title: "Rear Window", is_showing: true },
        ],
      },
    ]);
  });
});
