import React, { useEffect, useState } from "react";
import Theater from "./Theater";
import ErrorAlert from "../shared/ErrorAlert";
import { listTheaters } from "../utils/api";
import { Theater as TheaterType } from "../types/api-types";
import { ApiError } from "../types/api-types";

/**
 * TheaterList Component
 * Displays a list of all theaters with their currently showing movies
 * Fetches theater data on mount and handles loading/error states
 * 
 * @returns JSX element displaying the list of theaters
 */
const TheaterList: React.FC = () => {
  const [theaters, setTheaters] = useState<TheaterType[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    setError(null);
    const abortController = new AbortController();

    const loadTheaters = async (): Promise<void> => {
      try {
        const data = await listTheaters(abortController.signal);
        if (!abortController.signal.aborted) {
          setTheaters(data);
        }
      } catch (err) {
        if (!abortController.signal.aborted && (err as Error).name !== "AbortError") {
          const apiError = err as ApiError;
          setError({
            name: "FetchError",
            message: apiError.message || "Failed to load theaters",
            status: apiError.status
          });
        }
      }
    };

    loadTheaters();

    return () => abortController.abort();
  }, []);

  const list = theaters.map((theater) => (
    <Theater key={theater.theater_id} theater={{ ...theater, movies: [] }} />
  ));

  return (
    <main className="container">
      <ErrorAlert error={error} />
      <h2 className="font-poppins">All Theaters</h2>
      <hr />
      <section className="row">{list}</section>
    </main>
  );
};

export default TheaterList;
