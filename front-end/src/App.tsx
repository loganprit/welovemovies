import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./shared/theme/ThemeContext";
import Header from "./shared/Header";
import MoviesList from "./routes/home/BasicMoviesList";
import DetailedMoviesList from "./routes/movies/DetailedMoviesList";
import FullMovie from "./routes/movies/SingleMovie";
import TheaterList from "./routes/theaters/TheaterList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 30 * 60 * 1000, // 30 minutes
      gcTime: 60 * 60 * 1000, // 1 hour
    },
  },
});

/**
 * Root Application Component
 * Sets up routing and main layout structure
 * @returns JSX element containing the router and main application structure
 */
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
