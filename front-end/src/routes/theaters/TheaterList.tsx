import React, { useEffect, useState } from "react";
import Theater from "./SingleTheater";
import TheaterCardSkeleton from "../../shared/components/TheaterCard/Skeleton";
import ErrorAlert from "../../shared/ErrorAlert";
import { listTheaters } from "../../utils/api";
import { Theater as TheaterType } from "../../types/api-types";
import { ApiError } from "../../types/api-types";
import { useTheme } from "../../shared/theme/ThemeContext";

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
  const [isLoading, setIsLoading] = useState(!propTheaters);
  const [error, setError] = useState<ApiError | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // If theaters are provided via props, use those instead of fetching
    if (propTheaters) {
      setTheaters(propTheaters);
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsLoading(true);
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
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadTheaters();
    return () => abortController.abort();
  }, [propTheaters]);

  // Render loading state
  if (isLoading) {
    if (propTheaters) {
      return (
        <section className="mt-8">
          <h4 className={`font-poppins-heading text-2xl mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Now Showing At
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <TheaterCardSkeleton key={index} />
            ))}
          </div>
        </section>
      );
    }

    return (
      <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className={`font-poppins-heading text-4xl mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              All Theaters
            </h2>
            <hr className={theme === "dark" ? "border-gray-700" : "border-gray-200"} />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <TheaterCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!theaters.length) {
    return (
      <div className={`p-6 text-center rounded-lg ${
        theme === "dark"
          ? "bg-gray-800 text-gray-400"
          : "bg-gray-50 text-gray-500"
      }`}>
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
        <h4 className={`font-poppins-heading text-2xl mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
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
    <main className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}>
      <div className="container mx-auto px-4 py-8">
        <ErrorAlert error={error} />
        <div className="mb-8">
          <h2 className={`font-poppins-heading text-4xl mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            All Theaters
          </h2>
          <hr className={theme === "dark" ? "border-gray-700" : "border-gray-200"} />
        </div>
        <div className="space-y-6">
          {list}
        </div>
      </div>
    </main>
  );
};

export default TheaterList;
