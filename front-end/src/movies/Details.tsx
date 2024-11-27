import React from "react";
import AverageRating from "../reviews/AverageRating";
import { Movie } from "../types/models";
import { useTheme } from "../context/ThemeContext";

interface DetailsProps {
  movie: Movie;
}

/**
 * Component that displays detailed information about a movie
 * @param props - Component props containing movie data
 * @returns JSX element displaying movie details
 */
const Details: React.FC<DetailsProps> = ({ movie }) => {
  const { theme } = useTheme();

  if (!movie) {
    return (
      <div className={`p-4 ${
        theme === "dark" ? "text-gray-300" : "text-gray-600"
      }`}>
        No movie details available
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h3 className={`font-poppins-heading text-3xl ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}>
        {movie.title}
      </h3>
      <p className={`leading-relaxed ${
        theme === "dark" ? "text-gray-300" : "text-gray-700"
      }`}>
        {movie.description}
      </p>
      <div className="space-y-2">
        <p className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
          <span className="font-medium">Runtime:</span> {movie.runtime_in_minutes} minutes
        </p>
        <p className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
          <span className="font-medium">Rating:</span> {movie.rating}
        </p>
      </div>
      <AverageRating reviews={movie.reviews ?? []} />
    </section>
  );
};

export default Details;
