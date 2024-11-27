import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../types/models";
import { useTheme } from "../../shared/theme/ThemeContext";

interface MovieDetailsProps {
  movie: Movie | null;
  variant: "list" | "full";
}

/**
 * MovieDetails Component
 * Displays movie information in either list or full-page format
 * 
 * @param props - Component props containing movie data and display variant
 * @returns JSX element displaying movie information
 */
const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, variant }) => {
  const { theme } = useTheme();
  const isList = variant === "list";

  if (!movie) {
    return null;
  }

  return (
    <section className={`
      ${isList ? `flex flex-col md:flex-row gap-8 py-8 border-b ${
        theme === "dark" 
          ? "border-gray-700 hover:bg-gray-800/50" 
          : "border-gray-200 hover:bg-gray-50"
      } transition-colors duration-200` : "space-y-4"}
    `}>
      {isList && (
        <article className="w-full md:w-1/4 flex-shrink-0">
          <img
            alt={`${movie.title} Poster`}
            className="w-full h-[400px] rounded-lg shadow-lg object-cover hover:shadow-xl transition-shadow duration-200"
            src={movie.image_url}
            loading="lazy"
          />
        </article>
      )}
      <div className="flex-1 space-y-6">
        <h3 className={`${isList ? "font-poppins text-3xl font-bold tracking-tight" : "font-poppins-heading text-3xl"} ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {movie.title}
        </h3>
        <p className={`${isList ? "" : "leading-relaxed"} ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          {movie.description}
        </p>
        <div className="space-y-3">
          <p className={`flex items-center gap-2 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}>
            <span className="font-medium">Runtime:</span>
            <span className={`px-3 py-1 rounded-full ${
              theme === "dark" 
                ? "bg-primary-900/20 text-primary-300" 
                : "bg-primary-50 text-primary-700"
            }`}>
              {movie.runtime_in_minutes} minutes
            </span>
          </p>
          <p className={`flex items-center gap-2 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}>
            <span className="font-medium">Rating:</span>
            <span className={`px-3 py-1 rounded-full ${
              theme === "dark" 
                ? "bg-primary-900/20 text-primary-300" 
                : "bg-primary-50 text-primary-700"
            }`}>
              {movie.rating}
            </span>
          </p>
        </div>
        {isList && (
          <Link 
            to={`/movies/${movie.movie_id}`} 
            className={`inline-block px-6 py-3 rounded-lg transition-all duration-200 
              transform hover:-translate-y-0.5 shadow-md hover:shadow-lg
              focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
              theme === "dark"
                ? "bg-primary-500 hover:bg-primary-400 text-gray-100 hover:text-white"
                : "bg-primary-600 hover:bg-primary-700 text-black hover:text-gray-900"
            }`}
            aria-label={`See more details about ${movie.title}`}
          >
            See More
          </Link>
        )}
      </div>
    </section>
  );
};

export default MovieDetails; 