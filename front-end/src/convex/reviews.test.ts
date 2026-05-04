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

describe("reviews Convex functions", () => {
  test("updates an existing review and returns critic details", async () => {
    const t = convexTest(schema, modules);
    await seed(t);

    const review = await t.mutation(api.reviews.update, {
      reviewId: 1,
      data: { content: "Updated content", score: 2 },
    });

    expect(review).toMatchObject({
      review_id: 1,
      content: "Updated content",
      score: 2,
      critic: {
        preferred_name: "Chana",
        surname: "Gibson",
      },
    });
  });

  test("deletes a review and removes it from movie details", async () => {
    const t = convexTest(schema, modules);
    await seed(t);

    await t.mutation(api.reviews.destroy, { reviewId: 1 });
    const movie = await t.query(api.movies.read, { movieId: 1 });

    expect(movie?.reviews?.map((review) => review.review_id)).toEqual([2]);
  });

  test("rejects updates for a missing review", async () => {
    const t = convexTest(schema, modules);
    await seed(t);

    await expect(
      t.mutation(api.reviews.update, { reviewId: 999, data: { score: 4 } }),
    ).rejects.toThrow("Review cannot be found");
  });
});
