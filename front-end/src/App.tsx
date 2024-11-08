import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./shared/Header";
import MoviesList from "./home/MoviesList";
import DetailedMoviesList from "./movies/DetailedMoviesList";
import FullMovie from "./movie/FullMovie";
import TheaterList from "./theaters/TheaterList";

/**
 * Root Application Component
 * Sets up routing and main layout structure
 * @returns JSX element containing the router and main application structure
 */
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<DetailedMoviesList />} />
        <Route path="/movies/:movieId" element={<FullMovie />} />
        <Route path="/theaters" element={<TheaterList />} />
      </Routes>
    </Router>
  );
};

export default App;
