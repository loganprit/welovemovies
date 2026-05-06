import { listMovies } from "$lib/data/staticData";

export function entries() {
  return listMovies().map((movie) => ({ movieId: String(movie.movie_id) }));
}
