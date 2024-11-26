import React from "react";
import AverageRating from "../reviews/AverageRating";
import { Movie } from "../types/models";

interface DetailsProps {
  movie: Movie;
}

/**
 * Component that displays detailed information about a movie
 * @param props - Component props containing movie data
 * @returns JSX element displaying movie details
 */
const Details: React.FC<DetailsProps> = ({ movie }) => {
  if (!movie) {
    return <div className="p-4 text-gray-600">No movie details available</div>;
  }

  return (
    <section className="space-y-4">
      <h3 className="font-poppins-heading text-3xl text-gray-900">{movie.title}</h3>
      <p className="text-gray-700 leading-relaxed">{movie.description}</p>
      <div className="space-y-2">
        <p className="text-gray-800">
          <span className="font-medium">Runtime:</span> {movie.runtime_in_minutes} minutes
        </p>
        <p className="text-gray-800">
          <span className="font-medium">Rating:</span> {movie.rating}
        </p>
      </div>
      <AverageRating reviews={movie.reviews ?? []} />
    </section>
  );
};

export default Details;
