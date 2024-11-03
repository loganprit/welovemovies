import React from "react";
import { Link } from "react-router-dom";
import AverageRating from "../movie/AverageRating";
import { Movie } from "../types/models";

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
  if (!movie) {
    return <div>No movie details available</div>;
  }

  return (
    <section className="row mt-4">
      <article className="col-sm-12 col-md-6 col-lg-3">
        <img
          alt={`${movie.title} Poster`}
          className="rounded"
          src={movie.image_url}
          style={{ width: "100%" }}
        />
      </article>
      <aside className="col-sm-12 col-md-6 col-lg-9">
        <h3 className="font-poppins-heading mb-4">{movie.title}</h3>
        <p>{movie.description}</p>
        <p>
          <strong>Runtime:</strong> {movie.runtime_in_minutes} minutes
        </p>
        <p>
          <strong>Rating:</strong> {movie.rating}
        </p>
        <AverageRating reviews={movie.reviews ?? []} />
        <Link 
          to={`/movies/${movie.movie_id}`} 
          className="btn btn-primary"
          aria-label={`See more details about ${movie.title}`}
        >
          See More
        </Link>
      </aside>
    </section>
  );
};

export default DetailedMovie;
