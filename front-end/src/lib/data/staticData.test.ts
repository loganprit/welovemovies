import { describe, expect, it } from "vitest";
import { listMovies, listTheaters, readMovie } from "./staticData";

describe("static demo data", () => {
  it("lists the seeded movie catalog in legacy id order", () => {
    const movies = listMovies();

    expect(movies).toHaveLength(16);
    expect(movies[0]?.movie_id).toBe(1);
    expect(movies[0]?.title).toBe("Spirited Away");
  });

  it("reads a movie with joined reviews, critics, and theaters", () => {
    const movie = readMovie(1);

    expect(movie?.reviews).toHaveLength(7);
    expect(movie?.reviews?.[0]?.critic?.preferred_name).toBe("Chana");
    expect(movie?.theaters).toHaveLength(3);
  });

  it("applies local review edits without mutating the source data", () => {
    const movie = readMovie(1, {
      deletedReviewIds: [1],
      reviewScores: { 2: 5 },
    });

    expect(movie?.reviews).toHaveLength(6);
    expect(movie?.reviews?.some((review) => review.review_id === 1)).toBe(
      false,
    );
    expect(
      movie?.reviews?.find((review) => review.review_id === 2)?.score,
    ).toBe(5);
    expect(readMovie(1)?.reviews).toHaveLength(7);
  });

  it("lists theaters with their movies", () => {
    const theaters = listTheaters();

    expect(theaters).toHaveLength(3);
    expect(theaters[0]?.movies).toHaveLength(16);
  });
});
