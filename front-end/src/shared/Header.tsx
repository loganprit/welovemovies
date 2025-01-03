import React from "react";
import HeaderNav from "./HeaderNav";
import ThemeToggle from "./theme/ThemeToggle";
import headerImage from "./header.jpg";

interface HeaderStyles extends React.CSSProperties {
  background: string;
  backgroundPosition: string;
  backgroundSize: string;
}

/**
 * Header Component
 * Displays the main header section with navigation, theme toggle, and welcome message
 * @returns JSX element displaying the header with background image and content
 */
const Header: React.FC = () => {
  return (
    <header
      className="relative text-white border-b border-gray-800"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${headerImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <HeaderNav />
          <ThemeToggle />
        </div>
        <div className="py-12">
          <h1 className="text-5xl font-poppins-heading mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] tracking-tight">
            Find your next favorite movie!
          </h1>
          <p className="text-2xl font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            <em className="font-medium">WeLoveMovies</em> is your source for finding reviews of movies in
            theaters near you.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
