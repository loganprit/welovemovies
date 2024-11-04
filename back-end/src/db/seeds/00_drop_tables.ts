import { Knex } from "knex";

/**
 * Type guard to check if an error has a message property
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
 * Seed function to drop all tables in the correct order
 */
export const seed = async function (knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    const tables = ["reviews", "movies_theaters", "critics", "movies", "theaters"];
    
    for (const table of tables) {
      try {
        await trx(table).del();
      } catch (error: unknown) {
        if (isErrorWithMessage(error)) {
          if (!error.message.includes("no such table")) {
            throw error;
          }
          continue;
        }
        throw error;
      }
    }
  });
};
