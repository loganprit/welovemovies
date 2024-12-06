import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../../types/models";
import { useTheme } from "../../theme/ThemeContext";
import { useMovieData } from "../../../hooks/useMovieData";
import { ProgressiveImage } from "../ProgressiveImage";
import { ErrorBoundary } from "../ErrorBoundary";

interface MovieCardProps {
  movie: Movie;
  variant?: "grid" | "list";
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, variant = "grid" }) => {
  const { theme } = useTheme();
  const { prefetchMovie } = useMovieData();

  const handleMouseEnter = useCallback(() => {
    const timer = setTimeout(() => {
      prefetchMovie(movie.movie_id);
    }, 100);

    return () => clearTimeout(timer);
  }, [movie.movie_id, prefetchMovie]);

  return (
    <ErrorBoundary>
      <article 
        className={`relative group ${
          variant === "grid" 
            ? "p-4 sm:w-1/2 md:w-1/3 lg:w-1/4" 
            : "w-full"
        }`}
        onMouseEnter={handleMouseEnter}
      >
        <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
          <ProgressiveImage
            src={movie.image_url}
            alt={`${movie.title} Poster`}
            className="w-full h-full rounded-lg shadow-lg 
                     transition-all duration-300 group-hover:scale-105"
          />
          <div className={`absolute inset-0 transition-opacity duration-200 ${
            theme === "dark"
              ? "bg-black bg-opacity-0 group-hover:bg-opacity-20"
              : "bg-black bg-opacity-0 group-hover:bg-opacity-10"
          }`} />
          <Link
            to={`/movies/${movie.movie_id}`}
            className="absolute inset-0 z-10"
            aria-label={`View details for ${movie.title}`}
          >
            <span className="sr-only">View details</span>
          </Link>
        </div>
        <div className="mt-4 space-y-2">
          <h3 className={`font-poppins-heading text-center text-lg 
            transition-colors duration-200 group-hover:text-primary-500 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {movie.title}
          </h3>
          {movie.rating && (
            <p className={`text-center text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              {movie.rating}
            </p>
          )}
        </div>
      </article>
    </ErrorBoundary>
  );
};

export default MovieCard; 