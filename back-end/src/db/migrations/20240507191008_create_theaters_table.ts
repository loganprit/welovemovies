import type { Knex } from "knex";

/**
 * Creates the theaters table in the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable("theaters", (table: Knex.TableBuilder) => {
    table.increments("theater_id").primary();
    table.string("name").notNullable();
    table.string("address_line_1").notNullable();
    table.string("address_line_2");
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("zip").notNullable();
    table.timestamps(true, true);
  });
}

/**
 * Drops the theaters table from the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable("theaters");
}
