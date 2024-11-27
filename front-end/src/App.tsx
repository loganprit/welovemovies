import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./shared/theme/ThemeContext";
import Header from "./shared/Header";
import MoviesList from "./routes/home/BasicMoviesList";
import DetailedMoviesList from "./routes/movies/DetailedMoviesList";
import FullMovie from "./routes/movies/SingleMovie";
import TheaterList from "./routes/theaters/TheaterList";

/**
 * Root Application Component
 * Sets up routing and main layout structure
 * @returns JSX element containing the router and main application structure
 */
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<DetailedMoviesList />} />
          <Route path="/movies/:movieId" element={<FullMovie />} />
          <Route path="/theaters" element={<TheaterList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
