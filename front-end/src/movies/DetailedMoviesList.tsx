import React, { useEffect, useState } from "react";
import DetailedMovie from "./DetailedMovie";
import ErrorAlert from "../shared/ErrorAlert";
import { listMovies } from "../utils/api";
import { Movie } from "../types/models";
import { ApiError } from "../types/api-types";

/**
 * Component that displays a list of detailed movies
 * @returns JSX element displaying the list of detailed movies
 */
const DetailedMoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    setError(null);
    const abortController = new AbortController();

    const fetchMovies = async (): Promise<void> => {
      try {
        const movieData = await listMovies(abortController.signal);
        setMovies(movieData);
      } catch (err) {
        const apiError = err as ApiError;
        setError({
          name: "FetchError",
          message: apiError.message || "Failed to load movies",
          status: apiError.status
        });
      }
    };

    fetchMovies();

    return () => abortController.abort();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <ErrorAlert error={error} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-poppins-heading text-4xl text-gray-900 mb-4">All Movies</h2>
          <hr className="border-gray-200" />
        </div>
        <section className="divide-y divide-gray-200">
          {movies.map((movie) => (
            <DetailedMovie key={movie.movie_id} movie={movie} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default DetailedMoviesList;
