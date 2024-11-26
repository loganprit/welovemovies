import React from "react";
import { Link } from "react-router-dom";
import { Theater as TheaterType } from "../types/api-types";
import { Movie } from "../types/models";

interface TheaterProps {
  theater: TheaterType & {
    movies?: Movie[];
  };
  variant?: "detailed" | "simple";
}

/**
 * Theater Component
 * Displays information about a theater with two display variants:
 * - detailed: shows theater info with movie posters (used in theaters list)
 * - simple: shows basic theater info in a card (used in movie details)
 * 
 * @param props - Component props containing theater data and display variant
 * @returns JSX element displaying theater details
 */
const Theater: React.FC<TheaterProps> = ({ theater, variant = "detailed" }) => {
  if (!theater) {
    return (
      <div className="p-6 text-gray-600 bg-gray-50 rounded-lg">
        Theater information unavailable
      </div>
    );
  }

  const AddressBlock = () => (
    <address className="text-gray-600 not-italic">
      {theater.address_line_1}
      <br />
      {theater.address_line_2 && (
        <>
          {theater.address_line_2}
          <br />
        </>
      )}
      {theater.city}, {theater.state} {theater.zip}
    </address>
  );

  if (variant === "simple") {
    return (
      <article className="bg-white rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
        <div className="p-6">
          <h5 className="font-poppins-heading text-xl text-gray-900 mb-4">
            {theater.name}
          </h5>
          <AddressBlock />
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-shadow hover:shadow-md">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/3">
          <h2 className="font-poppins-heading text-2xl text-gray-900 mb-4">
            {theater.name}
          </h2>
          <AddressBlock />
        </aside>
        
        <section className="lg:w-2/3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {theater.movies?.map((movie) => (
              <div 
                key={movie.movie_id} 
                className="aspect-[2/3] relative group"
              >
                <Link 
                  to={`/movies/${movie.movie_id}`}
                  className="block w-full h-full"
                  aria-label={`View details for ${movie.title}`}
                >
                  <img
                    alt={`${movie.title} Poster`}
                    src={movie.image_url}
                    className="w-full h-full object-cover rounded-lg shadow-sm 
                             transition-all duration-200 group-hover:shadow-md 
                             group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 
                                transition-opacity duration-200 rounded-lg" />
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
