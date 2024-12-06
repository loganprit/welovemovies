import React from "react";
import MovieDetails from "./MovieDetails";
import DetailedMovieSkeleton from "../../shared/components/MovieCard/DetailedSkeleton";
import ErrorAlert from "../../shared/ErrorAlert";
import { useTheme } from "../../shared/theme/ThemeContext";
import { useMovieData } from "../../hooks/useMovieData";

const DetailedMoviesList: React.FC = () => {
  const { theme } = useTheme();
  const { movies, isLoading, error } = useMovieData();

  return (
    <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
      <ErrorAlert error={error} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className={`font-poppins-heading text-4xl mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            All Movies
          </h2>
          <hr className={theme === "dark" ? "border-gray-700" : "border-gray-200"} />
        </div>
        <section className={`divide-y ${
          theme === "dark" ? "divide-gray-700" : "divide-gray-200"
        }`}>
          {isLoading ? (
            Array.from({ length: 16 }).map((_, index) => (
              <DetailedMovieSkeleton key={index} />
            ))
          ) : (
            movies.map((movie) => (
              <MovieDetails key={movie.movie_id} movie={movie} variant="list" />
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default DetailedMoviesList;