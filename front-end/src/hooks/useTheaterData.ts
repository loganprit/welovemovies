import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listTheaters, readTheater } from "../utils/api";
import { Theater } from "../types/api-types";

const CACHE_CONFIG = {
  STALE_TIME: 30 * 60 * 1000, // 30 minutes
  GC_TIME: 60 * 60 * 1000,    // 1 hour
  RETRY_DELAY: 1000,
  RETRIES: 2,
};

export const useTheaterData = (theaterId?: number) => {
  const queryClient = useQueryClient();

  // Query for all theaters with persistent caching
  const theatersQuery = useQuery({
    queryKey: ["theaters"],
    queryFn: () => listTheaters(),
    staleTime: CACHE_CONFIG.STALE_TIME,
    gcTime: CACHE_CONFIG.GC_TIME,
    retry: CACHE_CONFIG.RETRIES,
    retryDelay: CACHE_CONFIG.RETRY_DELAY,
    placeholderData: (prev) => prev,
  });

  // Individual theater query with persistent caching
  const theaterQuery = useQuery({
    queryKey: ["theater", theaterId],
    queryFn: () => readTheater(theaterId!),
    staleTime: CACHE_CONFIG.STALE_TIME,
    gcTime: CACHE_CONFIG.GC_TIME,
    enabled: !!theaterId,
    placeholderData: (prev) => prev,
  });

  // Prefetch function with adjacent theaters
  const prefetchTheater = async (id: number): Promise<void> => {
    try {
      // Prefetch the target theater
      await queryClient.prefetchQuery({
        queryKey: ["theater", id],
        queryFn: () => readTheater(id),
        staleTime: CACHE_CONFIG.STALE_TIME,
      });

      // Get current theaters list from cache
      const theaters = queryClient.getQueryData<Theater[]>(["theaters"]);
      if (!theaters) return;

      // Find current theater index
      const currentIndex = theaters.findIndex(t => t.theater_id === id);
      if (currentIndex === -1) return;

      // Prefetch adjacent theaters
      const adjacentIds = [
        theaters[currentIndex - 1]?.theater_id,
        theaters[currentIndex + 1]?.theater_id,
      ].filter(Boolean);

      await Promise.all(
        adjacentIds.filter((adjId): adjId is number => typeof adjId === 'number')
          .map(adjId =>
            queryClient.prefetchQuery({
              queryKey: ["theater", adjId],
              queryFn: () => readTheater(adjId),
              staleTime: CACHE_CONFIG.STALE_TIME,
            })
          )
      );
    } catch (error) {
      console.error("Prefetch error:", error);
    }
  };

  return {
    theaters: theatersQuery.data ?? [],
    currentTheater: theaterQuery.data,
    isLoading: theatersQuery.isLoading || (!!theaterId && theaterQuery.isLoading),
    error: theatersQuery.error || theaterQuery.error,
    prefetchTheater,
  };
}; 