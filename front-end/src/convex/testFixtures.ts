import type { Doc } from "./_generated/dataModel";

type InsertMovie = Omit<Doc<"movies">, "_id" | "_creationTime">;
type InsertCritic = Omit<Doc<"critics">, "_id" | "_creationTime">;
type InsertReview = Omit<Doc<"reviews">, "_id" | "_creationTime">;
type InsertTheater = Omit<Doc<"theaters">, "_id" | "_creationTime">;
type InsertMovieTheater = Omit<Doc<"movies_theaters">, "_id" | "_creationTime">;

const createdAt = "2026-01-01T00:00:00.000Z";

export const movieFixtures: InsertMovie[] = [
  {
    movie_id: 1,
    title: "Spirited Away",
    runtime_in_minutes: 125,
    rating: "PG",
    description: "A young girl discovers a hidden spirit world.",
    image_url: "https://example.com/spirited-away.jpg",
    created_at: createdAt,
    updated_at: createdAt,
  },
  {
    movie_id: 2,
    title: "Interstellar",
    runtime_in_minutes: 169,
    rating: "PG-13",
    description: "Astronauts cross space to find humanity a new home.",
    image_url: "https://example.com/interstellar.jpg",
    created_at: createdAt,
    updated_at: createdAt,
  },
  {
    movie_id: 3,
    title: "Rear Window",
    runtime_in_minutes: 112,
    rating: "PG",
    description: "A photographer suspects a neighbor of murder.",
    image_url: "https://example.com/rear-window.jpg",
    created_at: createdAt,
    updated_at: createdAt,
  },
];

export const criticFixtures: InsertCritic[] = [
  {
    critic_id: 1,
    preferred_name: "Chana",
    surname: "Gibson",
    organization_name: "Film Frenzy",
    created_at: createdAt,
    updated_at: createdAt,
  },
  {
    critic_id: 2,
    preferred_name: "Maria",
    surname: "Cooke",
    organization_name: "The Spool",
    created_at: createdAt,
    updated_at: createdAt,
  },
];

export const reviewFixtures: InsertReview[] = [
  {
    review_id: 1,
    content: "A graceful, transporting film.",
    score: 5,
    critic_id: 1,
    movie_id: 1,
    created_at: createdAt,
    updated_at: createdAt,
  },
  {
    review_id: 2,
    content: "Beautifully made and emotionally sharp.",
    score: 4,
    critic_id: 2,
    movie_id: 1,
    created_at: createdAt,
    updated_at: createdAt,
  },
  {
    review_id: 3,
    content: "Huge, strange, and sincere.",
    score: 3,
    critic_id: 1,
    movie_id: 2,
    created_at: createdAt,
    updated_at: createdAt,
  },
];

export const theaterFixtures: InsertTheater[] = [
  {
    theater_id: 1,
    name: "Regal City Center",
    address_line_1: "801 C St.",
    address_line_2: "",
    city: "Vancouver",
    state: "WA",
    zip: "98660",
    created_at: createdAt,
    updated_at: createdAt,
  },
  {
    theater_id: 2,
    name: "Hollywood Theatre",
    address_line_1: "4122 NE Sandy Blvd.",
    address_line_2: "",
    city: "Portland",
    state: "OR",
    zip: "97212",
    created_at: createdAt,
    updated_at: createdAt,
  },
];

export const movieTheaterFixtures: InsertMovieTheater[] = [
  { movie_id: 1, theater_id: 1, is_showing: true },
  { movie_id: 1, theater_id: 2, is_showing: true },
  { movie_id: 2, theater_id: 1, is_showing: false },
  { movie_id: 3, theater_id: 2, is_showing: true },
];
