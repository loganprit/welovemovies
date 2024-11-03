import { Knex } from "knex";

/**
 * Type guard to check if an error has a message property
 * @param error - The error to check
 * @returns boolean indicating if error has message property
 */
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: string }).message === "string"
  );
}

/**
 * Seed function to drop all tables in the correct order to avoid foreign key constraints
 * @param knex - Knex instance
 * @returns Promise that resolves when all tables are dropped
 */
export const seed = async function (knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    // Check if tables exist before attempting to delete
    const tables = ["reviews", "movies_theaters", "critics", "movies", "theaters"];
    
    for (const table of tables) {
      try {
        await trx(table).del();
      } catch (error: unknown) {
        // Check if error has a message property before accessing it
        if (isErrorWithMessage(error)) {
          if (!error.message.includes("no such table")) {
            throw error;
          }
          // Ignore errors about non-existent tables
          continue;
        }
        // If error doesn't have a message property, rethrow it
        throw error;
      }
    }
  });
};
