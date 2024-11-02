import { TheaterWithMovies } from "../types/api";
import knex from "../db/connection";
import reduceProperties from "../utils/reduce-properties";

// Helper function to reduce theater properties
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
  theater_id: ["movies", null, "theater_id"],
});

// Function to list all theaters with their movies
async function list(): Promise<TheaterWithMovies[]> {
  const theaters = await knex("theaters")
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .select("*");

  return reduceMovies(theaters) as TheaterWithMovies[];
}

export {
  list,
};
