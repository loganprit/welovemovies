import { v } from "convex/values";
import { query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import type { QueryCtx } from "./_generated/server";

type ReviewWithCritic = Doc<"reviews"> & {
  critic: Doc<"critics"> | null;
};

type TheaterWithShowing = Doc<"theaters"> & {
  is_showing: boolean;
  movie_id: number;
};

async function readMovieByLegacyId(ctx: QueryCtx, movieId: number) {
  return await ctx.db
    .query("movies")
    .withIndex("by_movie_id", (q) => q.eq("movie_id", movieId))
    .unique();
}

async function readReviewsForMovie(
  ctx: QueryCtx,
  movieId: number,
): Promise<ReviewWithCritic[]> {
  const reviews = await ctx.db
    .query("reviews")
    .withIndex("by_movie_id", (q) => q.eq("movie_id", movieId))
    .collect();

  const reviewsWithCritics = await Promise.all(
    reviews.map(async (review) => {
      const critic = await ctx.db
        .query("critics")
        .withIndex("by_critic_id", (q) => q.eq("critic_id", review.critic_id))
        .unique();

      return { ...review, critic };
    }),
  );

  return reviewsWithCritics.sort(
    (left, right) => left.review_id - right.review_id,
  );
}

async function readTheatersForMovie(
  ctx: QueryCtx,
  movieId: number,
): Promise<TheaterWithShowing[]> {
  const joins = await ctx.db
    .query("movies_theaters")
    .withIndex("by_movie_id", (q) => q.eq("movie_id", movieId))
    .collect();

  const theaters = await Promise.all(
    joins.map(async (join) => {
      const theater = await ctx.db
        .query("theaters")
        .withIndex("by_theater_id", (q) => q.eq("theater_id", join.theater_id))
        .unique();

      if (!theater) return undefined;
      return {
        ...theater,
        is_showing: join.is_showing,
        movie_id: join.movie_id,
      };
    }),
  );

  return theaters
    .filter((theater): theater is TheaterWithShowing => Boolean(theater))
    .sort((left, right) => left.theater_id - right.theater_id);
}

export const list = query({
  args: {
    isShowing: v.optional(v.boolean()),
  },
  handler: async (ctx, args): Promise<Doc<"movies">[]> => {
    if (!args.isShowing) {
      const movies = await ctx.db.query("movies").collect();
      return movies.sort((left, right) => left.movie_id - right.movie_id);
    }

    const showingJoins = await ctx.db
      .query("movies_theaters")
      .withIndex("by_is_showing", (q) => q.eq("is_showing", true))
      .collect();
    const movieIds = [
      ...new Set(showingJoins.map((join) => join.movie_id)),
    ].sort((left, right) => left - right);
    const movies = await Promise.all(
      movieIds.map((movieId) => readMovieByLegacyId(ctx, movieId)),
    );

    return movies.filter((movie): movie is Doc<"movies"> => Boolean(movie));
  },
});

export const readReviews = query({
  args: {
    movieId: v.number(),
  },
  handler: async (ctx, args): Promise<ReviewWithCritic[]> => {
    return readReviewsForMovie(ctx, args.movieId);
  },
});

export const readTheaters = query({
  args: {
    movieId: v.number(),
  },
  handler: async (ctx, args): Promise<TheaterWithShowing[]> => {
    return readTheatersForMovie(ctx, args.movieId);
  },
});

export const read = query({
  args: {
    movieId: v.number(),
  },
  handler: async (ctx, args) => {
    const movie = await readMovieByLegacyId(ctx, args.movieId);
    if (!movie) return undefined;

    const [reviews, theaters] = await Promise.all([
      readReviewsForMovie(ctx, args.movieId),
      readTheatersForMovie(ctx, args.movieId),
    ]);

    return {
      ...movie,
      reviews,
      theaters,
    };
  },
});
