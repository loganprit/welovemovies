import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../shared/ErrorAlert";
import { listMovies } from "../utils/api";
import { Movie } from "../types/models";
import { ApiError } from "../types/api-types";
import { useTheme } from "../context/ThemeContext";

/**
 * MoviesList Component
 * Displays a grid of movie posters with titles that link to individual movie pages
 * Fetches movie data on mount and handles loading/error states
 */
function MoviesList(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const { theme } = useTheme();

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
      className={`relative p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="group h-full">
        <img
          alt={`${movie.title} Poster`}
          className="w-full rounded shadow-lg transition-transform duration-200 group-hover:scale-105"
          src={movie.image_url}
        />
        <Link
          to={`/movies/${movie.movie_id}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${movie.title}`}
        >
          <span className="sr-only">View details</span>
        </Link>
        <h3 className={`font-poppins-heading text-center mt-4 text-xl ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {movie.title}
        </h3>
      </div>
    </article>
  ));

  return (
    <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
      <ErrorAlert error={error} />
      <div className="container mx-auto px-6 py-8">
        <div className="mt-8">
          <h2 className={`font-poppins-heading text-4xl mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Now Showing
          </h2>
          <hr className={`mb-8 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`} />
        </div>
        <section className="flex flex-wrap -mx-4">
          {list}
        </section>
      </div>
    </main>
  );
}

export default MoviesList;
