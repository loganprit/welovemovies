import React from "react";
import { Link } from "react-router-dom";
import { Theater as TheaterType } from "../types/api-types";
import { Movie } from "../types/models";

interface TheaterProps {
  theater: TheaterType & {
    movies: Movie[];
  };
}

/**
 * Theater Component
 * Displays detailed information about a theater and its currently showing movies
 * 
 * @param props - Component props containing theater data and its movies
 * @returns JSX element displaying theater details and movie posters
 */
const Theater: React.FC<TheaterProps> = ({ theater }) => {
  if (!theater) {
    return <div>Theater information unavailable</div>;
  }

  return (
    <article className="col-12 mb-4">
      <div className="row">
        <aside className="col">
          <h2 className="font-poppins-heading">{theater.name}</h2>
          <address>
            {theater.address_line_1}
            <br />
            {theater.address_line_2 ? (
              <>
                {theater.address_line_2}
                <br />
              </>
            ) : null}
            {theater.city}, {theater.state} {theater.zip}
          </address>
        </aside>
        <section className="col">
          <div className="row">
            {theater.movies.map((movie) => (
              <div 
                key={movie.movie_id} 
                className="col-2"
              >
                <Link 
                  to={`/movies/${movie.movie_id}`}
                  aria-label={`View details for ${movie.title}`}
                >
                  <img
                    alt={`${movie.title} Poster`}
                    src={movie.image_url}
                    className="w-100"
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

export default Theater;
