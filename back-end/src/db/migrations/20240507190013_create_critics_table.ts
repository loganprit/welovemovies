import type { Knex } from "knex";

/**
 * Creates the critics table in the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable("critics", (table: Knex.TableBuilder) => {
    table.increments("critic_id").primary();
    table.string("preferred_name").notNullable();
    table.string("surname").notNullable();
    table.string("organization_name").notNullable();
    table.timestamps(true, true);
  });
}

/**
 * Drops the critics table from the database
 * @param knex - The Knex instance
 * @returns Knex migration promise
 */
export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable("critics");
}
