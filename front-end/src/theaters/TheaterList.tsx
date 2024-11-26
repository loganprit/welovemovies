import React, { useEffect, useState } from "react";
import Theater from "./Theater";
import ErrorAlert from "../shared/ErrorAlert";
import { listTheaters } from "../utils/api";
import { Theater as TheaterType } from "../types/api-types";
import { ApiError } from "../types/api-types";

interface TheaterListProps {
  theaters?: TheaterType[];
  variant?: "detailed" | "simple";
}

/**
 * TheaterList Component
 * Can operate in two modes:
 * 1. Autonomous mode: Fetches and displays all theaters (when no theaters prop provided)
 * 2. Controlled mode: Displays provided theaters list (when theaters prop is provided)
 * 
 * @param props - Component props containing optional theaters array and display variant
 * @returns JSX element displaying the list of theaters
 */
const TheaterList: React.FC<TheaterListProps> = ({ theaters: propTheaters, variant = "detailed" }) => {
  const [theaters, setTheaters] = useState<TheaterType[]>([]);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    // If theaters are provided via props, use those instead of fetching
    if (propTheaters) {
      setTheaters(propTheaters);
      return;
    }

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
  }, [propTheaters]);

  if (!theaters.length) {
    return (
      <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-lg">
        No theaters available
      </div>
    );
  }

  const list = theaters.map((theater) => (
    <Theater 
      key={theater.theater_id} 
      theater={theater} 
      variant={variant}
    />
  ));

  // Render simple version for movie details
  if (propTheaters) {
    return (
      <section className="mt-8">
        <h4 className="font-poppins-heading text-2xl text-gray-900 mb-6">
          Now Showing At
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list}
        </div>
      </section>
    );
  }

  // Render full theaters page
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ErrorAlert error={error} />
        <div className="mb-8">
          <h2 className="font-poppins-heading text-4xl text-gray-900 mb-4">
            All Theaters
          </h2>
          <hr className="border-gray-200" />
        </div>
        <div className="space-y-6">
          {list}
        </div>
      </div>
    </main>
  );
};

export default TheaterList;
