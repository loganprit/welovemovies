import type { Knex } from "knex";

/**
 * Creates the movies table in the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable("movies", (table: Knex.TableBuilder) => {
    table.increments("movie_id").primary();
    table.string("title").notNullable();
    table.integer("runtime_in_minutes").notNullable();
    table.string("rating");
    table.text("description");
    table.string("image_url");
    table.timestamps(true, true);
  });
}

/**
 * Drops the movies table from the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable("movies");
}
