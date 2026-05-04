import { query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import type { QueryCtx } from "./_generated/server";

type MovieWithShowing = Doc<"movies"> & {
  is_showing: boolean;
  theater_id: number;
};

type TheaterWithMovies = Doc<"theaters"> & {
  movies: MovieWithShowing[];
};

async function readMoviesForTheater(
  ctx: QueryCtx,
  theaterId: number,
): Promise<MovieWithShowing[]> {
  const joins = await ctx.db
    .query("movies_theaters")
    .withIndex("by_theater_id", (q) => q.eq("theater_id", theaterId))
    .collect();

  const movies = await Promise.all(
    joins.map(async (join) => {
      const movie = await ctx.db
        .query("movies")
        .withIndex("by_movie_id", (q) => q.eq("movie_id", join.movie_id))
        .unique();

      if (!movie) return undefined;
      return {
        ...movie,
        is_showing: join.is_showing,
        theater_id: join.theater_id,
      };
    }),
  );

  return movies
    .filter((movie): movie is MovieWithShowing => Boolean(movie))
    .sort((left, right) => left.movie_id - right.movie_id);
}

export const list = query({
  args: {},
  handler: async (ctx): Promise<TheaterWithMovies[]> => {
    const theaters = await ctx.db.query("theaters").collect();
    const theatersWithMovies = await Promise.all(
      theaters
        .sort((left, right) => left.theater_id - right.theater_id)
        .map(async (theater) => ({
          ...theater,
          movies: await readMoviesForTheater(ctx, theater.theater_id),
        })),
    );

    return theatersWithMovies;
  },
});
