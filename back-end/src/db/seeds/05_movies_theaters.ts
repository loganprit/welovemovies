import { Knex } from "knex";
import { Movie, Theater } from "../../types/api";

type MovieId = Pick<Movie, "movie_id">;
type TheaterId = Pick<Theater, "theater_id">;

interface MovieTheater {
  movie_id: number;
  theater_id: number;
  is_showing: boolean;
}

/**
 * Generates join table records for movies and theaters
 * @param movieIds - Array of movie IDs from the database
 * @param theaterIds - Array of theater IDs from the database
 * @returns Array of movie-theater relationships ready for insertion
 */
const generateMoviesTheatersJoins = (
  movieIds: MovieId[],
  theaterIds: TheaterId[]
): MovieTheater[] => {
  return movieIds
    .map((movieRow) => {
      return theaterIds.map((theaterRow) => {
        return {
          is_showing: true,
          theater_id: Number(theaterRow.theater_id),
          movie_id: Number(movieRow.movie_id),
        };
      });
    })
    .reduce((a, b) => a.concat(b), [])
    .filter((join): join is MovieTheater => 
      typeof join.theater_id === "number" && 
      join.theater_id > 0 &&
      typeof join.movie_id === "number" && 
      join.movie_id > 0
    );
};

/**
 * Seed function to populate the movies_theaters join table with initial data
 * @param knex - The Knex instance
 * @returns Promise that resolves when seeding is complete
 */
export async function seed(knex: Knex): Promise<void> {
  const movieIds = await knex("movies").select("movie_id");
  const theaterIds = await knex("theaters").select("theater_id");

  const joins = generateMoviesTheatersJoins(movieIds, theaterIds);
  await knex("movies_theaters").insert(joins);
}
