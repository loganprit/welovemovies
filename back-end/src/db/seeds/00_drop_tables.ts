import { Knex } from "knex";

/**
 * Seed function to drop all tables in the correct order to avoid foreign key constraints
 * @param knex - Knex instance
 * @returns Promise that resolves when all tables are dropped
 */
export const seed = async function (knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    // Deletes ALL existing entries in order of dependencies
    await trx("reviews").del();
    await trx("movies_theaters").del();
    await trx("critics").del();
    await trx("movies").del();
    await trx("theaters").del();
  });
};
