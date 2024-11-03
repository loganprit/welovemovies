import type { Knex } from "knex";

/**
 * Creates the reviews table in the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable("reviews", (table: Knex.TableBuilder) => {
    table.increments("review_id").primary(); // Primary key
    table.text("content");
    table.integer("score");
    table.integer("critic_id").unsigned().notNullable();
    table.integer("movie_id").unsigned().notNullable();
    table.foreign("critic_id").references("critic_id").inTable("critics");
    table.foreign("movie_id").references("movie_id").inTable("movies");
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
}

/**
 * Drops the reviews table from the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable("reviews");
}
