import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../shared/ErrorAlert";
import { listMovies } from "../utils/api";
import { Movie } from "../types/models";
import { ApiError } from "../types/api-types";

/**
 * MoviesList Component
 * Displays a grid of movie posters with titles that link to individual movie pages
 * Fetches movie data on mount and handles loading/error states
 */
function MoviesList(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    setError(null);
    const abortController = new AbortController();

    listMovies(abortController.signal)
      .then((fetchedMovies: Movie[]) => {
        setMovies(fetchedMovies);
      })
      .catch((err: ApiError) => {
        setError(err);
      });

    return () => abortController.abort();
  }, []);

  const list = movies.map((movie: Movie) => (
    <article 
      key={movie.movie_id} 
      className="col-sm-12 col-md-6 col-lg-3 my-2"
    >
      <img
        alt={`${movie.title} Poster`}
        className="rounded"
        src={movie.image_url}
        style={{ width: "100%" }}
      />
      <Link
        to={`/movies/${movie.movie_id}`}
        className="stretched-link text-dark"
      >
        <h3 className="font-poppins-heading text-center mt-2">
          {movie.title}
        </h3>
      </Link>
    </article>
  ));

  return (
    <main className="container">
      <ErrorAlert error={error} />
      <h2 className="font-poppins">Now Showing</h2>
      <hr />
      <section className="row">{list}</section>
    </main>
  );
}

export default MoviesList;
