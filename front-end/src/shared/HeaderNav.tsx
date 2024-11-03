import React from "react";
import { Link } from "react-router-dom";

interface HeaderNavStyles extends React.CSSProperties {
  padding: string;
}

interface ItalicStyles extends React.CSSProperties {
  fontStyle: string;
}

/**
 * HeaderNav Component
 * Displays the main navigation menu with links to different sections of the application
 * @returns JSX element displaying the navigation menu
 */
const HeaderNav: React.FC = () => {
  const style: HeaderNavStyles = {
    padding: "1rem 0 3rem",
  };

  const italic: ItalicStyles = {
    fontStyle: "italic",
  };

  return (
    <nav aria-label="Main navigation">
      <ul className="nav justify-content-start" style={style}>
        <li className="nav-item d-none d-lg-block d-xl-block">
          <Link 
            className="font-poppins-heading nav-link mx-2 text-light" 
            to="/"
            aria-label="Home"
          >
            <h1 className="h5" style={italic}>
              WeLoveMovies
            </h1>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2 font-weight-light text-light"
            to="/movies"
            aria-label="View all movies"
          >
            All Movies
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2 font-weight-light text-light"
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
