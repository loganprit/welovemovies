import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../../types/models";
import { useTheme } from "../../../context/ThemeContext";

interface MovieCardProps {
  movie: Movie;
  variant?: "grid" | "list";
}

/**
 * MovieCard Component
 * Displays a movie poster with title and optional metadata in a card format
 * Supports both grid and list view variants with hover animations
 *
 * @param props - Component props containing movie data and display variant
 * @returns JSX element displaying movie card
 */
const MovieCard: React.FC<MovieCardProps> = ({ movie, variant = "grid" }) => {
  const { theme } = useTheme();

  return (
    <article 
      className={`relative group ${
        variant === "grid" 
          ? "p-4 sm:w-1/2 md:w-1/3 lg:w-1/4" 
          : "w-full"
      }`}
    >
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
        <img
          alt={`${movie.title} Poster`}
          className="w-full h-full object-cover rounded-lg shadow-lg 
                   transition-all duration-300 group-hover:scale-105"
          src={movie.image_url}
          loading="lazy"
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
  );
};

export default MovieCard; 