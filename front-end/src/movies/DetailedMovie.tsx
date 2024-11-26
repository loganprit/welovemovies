import React from "react";
import { Link } from "react-router-dom";
import AverageRating from "../reviews/AverageRating";
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
    return <div className="p-6 text-gray-600 bg-gray-50 rounded-lg text-center">No movie details available</div>;
  }

  return (
    <section className="flex flex-col md:flex-row gap-8 py-8 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      <article className="w-full md:w-1/4 flex-shrink-0">
        <img
          alt={`${movie.title} Poster`}
          className="w-full h-[400px] rounded-lg shadow-lg object-cover hover:shadow-xl transition-shadow duration-200"
          src={movie.image_url}
        />
      </article>
      <aside className="flex-1 space-y-6">
        <h3 className="font-poppins text-3xl font-bold text-gray-900 tracking-tight">{movie.title}</h3>
        <p className="text-gray-700 leading-relaxed text-lg">{movie.description}</p>
        <div className="space-y-3">
          <p className="text-gray-800 flex items-center gap-2">
            <span className="font-medium">Runtime:</span>
            <span className="bg-primary-50 px-3 py-1 rounded-full text-primary-700">
              {movie.runtime_in_minutes} minutes
            </span>
          </p>
          <p className="text-gray-800 flex items-center gap-2">
            <span className="font-medium">Rating:</span>
            <span className="bg-primary-50 px-3 py-1 rounded-full text-primary-700">
              {movie.rating}
            </span>
          </p>
        </div>
        <AverageRating reviews={movie.reviews ?? []} />
        <Link 
          to={`/movies/${movie.movie_id}`} 
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                     transition-all duration-200 transform hover:-translate-y-0.5 
                     focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                     shadow-md hover:shadow-lg"
          aria-label={`See more details about ${movie.title}`}
        >
          See More
        </Link>
      </aside>
    </section>
  );
};

export default DetailedMovie;
