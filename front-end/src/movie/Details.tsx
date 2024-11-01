import React from "react";
import AverageRating from "./AverageRating";
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
    return <div>No movie details available</div>;
  }

  return (
    <section>
      <h3 className="font-poppins-heading mb-4">{movie.title}</h3>
      <p>{movie.description}</p>
      <p>
        <strong>Runtime:</strong> {movie.runtime_in_minutes} minutes
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <AverageRating reviews={movie.reviews ?? []} />
    </section>
  );
};

export default Details;
