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
 * Generates movie-theater relationship records
 */
const generateMoviesTheatersJoins = (
  movieIds: MovieId[],
  theaterIds: TheaterId[]
): MovieTheater[] => {
  return movieIds
    .map((movie) => 
      theaterIds.map((theater) => ({
        is_showing: true,
        theater_id: Number(theater.theater_id),
        movie_id: Number(movie.movie_id),
      }))
    )
    .flat()
    .filter((join): join is MovieTheater => 
      typeof join.theater_id === "number" && 
      join.theater_id > 0 &&
      typeof join.movie_id === "number" && 
      join.movie_id > 0
    );
};

/**
 * Seed function to populate the movies_theaters table
 */
export async function seed(knex: Knex): Promise<void> {
  const movieIds = await knex("movies").select("movie_id");
  const theaterIds = await knex("theaters").select("theater_id");

  const joins = generateMoviesTheatersJoins(movieIds, theaterIds);
  await knex("movies_theaters").insert(joins);
}
