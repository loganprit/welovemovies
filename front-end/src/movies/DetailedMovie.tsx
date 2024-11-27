import React from "react";
import { Link } from "react-router-dom";
import AverageRating from "../reviews/AverageRating";
import { Movie } from "../types/models";
import { useTheme } from "../context/ThemeContext";

interface DetailedMovieProps {
  movie: Movie;
}

/**
 * DetailedMovie Component
 * Displays a detailed view of a movie including its poster, description, and metadata
 * 
 * @param props - Component props containing movie data
 * @returns JSX element displaying detailed movie information
 */
const DetailedMovie: React.FC<DetailedMovieProps> = ({ movie }) => {
  const { theme } = useTheme();

  if (!movie) {
    return (
      <div className={`p-6 rounded-lg text-center ${
        theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"
      }`}>
        No movie details available
      </div>
    );
  }

  return (
    <section className={`flex flex-col md:flex-row gap-8 py-8 border-b ${
      theme === "dark" 
        ? "border-gray-700 hover:bg-gray-800/50" 
        : "border-gray-200 hover:bg-gray-50"
    } transition-colors duration-200`}>
      <article className="w-full md:w-1/4 flex-shrink-0">
        <img
          alt={`${movie.title} Poster`}
          className="w-full h-[400px] rounded-lg shadow-lg object-cover hover:shadow-xl transition-shadow duration-200"
          src={movie.image_url}
        />
      </article>
      <aside className="flex-1 space-y-6">
        <h3 className={`font-poppins text-3xl font-bold tracking-tight ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {movie.title}
        </h3>
        <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
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
        <AverageRating reviews={movie.reviews ?? []} />
        <Link 
          to={`/movies/${movie.movie_id}`} 
          className={`inline-block px-6 py-3 rounded-lg transition-all duration-200 
            transform hover:-translate-y-0.5 shadow-md hover:shadow-lg
            focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
            theme === "dark"
              ? "bg-primary-600 text-white hover:bg-primary-500"
              : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
          aria-label={`See more details about ${movie.title}`}
        >
          See More
        </Link>
      </aside>
    </section>
  );
};

export default DetailedMovie;
