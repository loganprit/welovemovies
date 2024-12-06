import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { useMovieData } from "../hooks/useMovieData";
import MovieDetails from "./movies/MovieDetails";
import ErrorAlert from "../shared/ErrorAlert";

export const movieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "movies/$movieId",
  loader: ({ params: { movieId } }) => ({
    movieId
  }),
  component: () => {
    const { currentMovie: movie, isLoading, error } = useMovieData();
    
    return (
      <main>
        <ErrorAlert error={error} />
        <MovieDetails 
          movie={movie || null} 
          variant="full" 
          isLoading={isLoading}
        />
      </main>
    );
  }
}); 