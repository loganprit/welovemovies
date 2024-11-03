import type { Knex } from "knex";

/**
 * Creates the movies_theaters join table in the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable("movies_theaters", (table: Knex.TableBuilder) => {
    table.integer("movie_id").unsigned().notNullable();
    table.integer("theater_id").unsigned().notNullable();
    table.boolean("is_showing").notNullable().defaultTo(false);
    table.foreign("movie_id").references("movie_id").inTable("movies");
    table.foreign("theater_id").references("theater_id").inTable("theaters");
    table.primary(["movie_id", "theater_id"]); // Sets a composite primary key
  });
}

/**
 * Drops the movies_theaters join table from the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable("movies_theaters");
}