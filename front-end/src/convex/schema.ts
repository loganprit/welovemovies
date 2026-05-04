import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const timestamps = {
  created_at: v.string(),
  updated_at: v.string(),
};

export default defineSchema({
  movies: defineTable({
    movie_id: v.number(),
    title: v.string(),
    runtime_in_minutes: v.number(),
    rating: v.string(),
    description: v.string(),
    image_url: v.string(),
    ...timestamps,
  }).index("by_movie_id", ["movie_id"]),
  critics: defineTable({
    critic_id: v.number(),
    preferred_name: v.string(),
    surname: v.string(),
    organization_name: v.string(),
    ...timestamps,
  }).index("by_critic_id", ["critic_id"]),
  reviews: defineTable({
    review_id: v.number(),
    content: v.string(),
    score: v.number(),
    critic_id: v.number(),
    movie_id: v.number(),
    ...timestamps,
  })
    .index("by_review_id", ["review_id"])
    .index("by_movie_id", ["movie_id"])
    .index("by_critic_id", ["critic_id"]),
  theaters: defineTable({
    theater_id: v.number(),
    name: v.string(),
    address_line_1: v.string(),
    address_line_2: v.optional(v.string()),
    city: v.string(),
    state: v.string(),
    zip: v.string(),
    ...timestamps,
  }).index("by_theater_id", ["theater_id"]),
  movies_theaters: defineTable({
    movie_id: v.number(),
    theater_id: v.number(),
    is_showing: v.boolean(),
  })
    .index("by_movie_id", ["movie_id"])
    .index("by_theater_id", ["theater_id"])
    .index("by_is_showing", ["is_showing"]),
});
