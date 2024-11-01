import React from "react";
import HeaderNav from "./HeaderNav";
import headerImage from "./header.jpg";

interface HeaderStyles extends React.CSSProperties {
  background: string;
  backgroundPosition: string;
  backgroundSize: string;
}

/**
 * Header Component
 * Displays the main header section with navigation and welcome message
 * @returns JSX element displaying the header with background image and content
 */
const Header: React.FC = () => {
  const style: HeaderStyles = {
    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${headerImage})`,
    backgroundPosition: "center",
    backgroundSize: "100% auto",
  };

  return (
    <header
      className="jumbotron jumbotron-fluid text-white border-bottom border-dark pt-0"
      style={style}
    >
      <HeaderNav />
      <div className="container">
        <h1 className="display-4">Find your next favorite movie!</h1>
        <p className="lead">
          <em>WeLoveMovies</em> is your source for finding reviews of movies in
          theaters near you.
        </p>
      </div>
    </header>
  );
};

export default Header;
