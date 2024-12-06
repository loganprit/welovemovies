import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Theater as TheaterType } from "../../types/api-types";
import { Movie } from "../../types/models";
import { useTheme } from "../../shared/theme/ThemeContext";
import { useTheaterData } from "../../hooks/useTheaterData";
import { ProgressiveImage } from "../../shared/components/ProgressiveImage";

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
  const { theme } = useTheme();
  const { prefetchTheater } = useTheaterData();

  const handleMouseEnter = useCallback(() => {
    const timer = setTimeout(() => {
      prefetchTheater(theater.theater_id);
    }, 100);

    return () => clearTimeout(timer);
  }, [theater.theater_id, prefetchTheater]);

  if (!theater) {
    return (
      <div className={`p-6 rounded-lg ${
        theme === "dark" 
          ? "bg-gray-800 text-gray-300" 
          : "bg-gray-50 text-gray-600"
      }`}>
        Theater information unavailable
      </div>
    );
  }

  const AddressBlock = () => (
    <address className={`not-italic ${
      theme === "dark" ? "text-gray-400" : "text-gray-600"
    }`}>
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

  const SimpleTheater = () => (
    <article className={`rounded-lg shadow-sm border transition-shadow hover:shadow-md ${
      theme === "dark"
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
    }`}>
      <div className="p-6">
        <h5 className={`font-poppins-heading text-xl mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          {theater.name}
        </h5>
        <AddressBlock />
      </div>
    </article>
  );

  const DetailedTheater = () => (
    <article className={`rounded-lg shadow-sm border p-6 transition-shadow hover:shadow-md ${
      theme === "dark"
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
    }`}>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/3">
          <h2 className={`font-poppins-heading text-2xl mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
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
                  <ProgressiveImage
                    src={movie.image_url}
                    alt={`${movie.title} Poster`}
                    className="w-full h-full object-cover rounded-lg shadow-sm 
                             transition-all duration-200 group-hover:shadow-md 
                             group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
                    theme === "dark"
                      ? "bg-black bg-opacity-0 group-hover:bg-opacity-20"
                      : "bg-black bg-opacity-0 group-hover:bg-opacity-10"
                  }`} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );

  return variant === "simple" ? <SimpleTheater /> : <DetailedTheater />;
};

export default Theater;
