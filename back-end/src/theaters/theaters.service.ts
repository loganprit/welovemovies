import { TheaterWithMovies } from "../types/api";
import knex from "../db/connection";
import reduceProperties from "../utils/reduce-properties";

/**
 * Configuration for reducing theater and movie properties into nested structure
 */
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  theater_id: ["movies", null, "theater_id"]
});

/**
 * Retrieves all theaters with their associated movies
 * @returns Promise resolving to array of theaters with nested movies array
 */
async function list(): Promise<TheaterWithMovies[]> {
  const theaters = await knex("theaters as t")
    .join(
      "movies_theaters as mt",
      "t.theater_id",
      "mt.theater_id"
    )
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select(
      "t.*",
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at",
      "m.updated_at",
      "mt.is_showing",
      "mt.theater_id"
    );

  const reducedTheaters = reduceMovies(theaters);
  return reducedTheaters as unknown as TheaterWithMovies[];
}

export {
  list,
};
