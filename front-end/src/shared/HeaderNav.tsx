import React from "react";
import { Link } from "react-router-dom";

/**
 * HeaderNav Component
 * Displays the main navigation menu with links to different sections of the application
 * @returns JSX element displaying the navigation menu
 */
const HeaderNav: React.FC = () => {
  return (
    <nav 
      className="py-6" 
      aria-label="Main navigation"
    >
      <ul className="flex items-center space-x-8">
        <li className="hidden lg:block">
          <Link 
            className="font-poppins-heading text-white hover:text-primary-200 transition-colors" 
            to="/"
            aria-label="Home"
          >
            <h1 className="text-2xl italic">
              WeLoveMovies
            </h1>
          </Link>
        </li>
        <li>
          <Link
            className="text-lg text-white hover:text-primary-200 transition-colors"
            to="/movies"
            aria-label="View all movies"
          >
            All Movies
          </Link>
        </li>
        <li>
          <Link
            className="text-lg text-white hover:text-primary-200 transition-colors"
            to="/theaters"
            aria-label="View all theaters"
          >
            All Theaters
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
