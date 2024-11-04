import knex, { Knex } from "knex";
import config from "../knexfile";

/**
 * Database connection configuration and initialization module
 * Handles environment-specific setup and connection testing
 */

// Initialize environment with fallback to development
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];

// Validate configuration existence for current environment
if (!environmentConfig) {
  throw new Error(`Invalid environment configuration: ${environment}`);
}

// Ensure required environment variables are present
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Initialize database connection
let connection: Knex;

try {
  connection = knex(environmentConfig);

  // Test connection in development environment only
  if (environment === "development") {
    void connection
      .raw("SELECT 1")
      .then(() => {
        console.info(`Database connection established [${environment}]`);
      })
      .catch((error: Error) => {
        console.error("Database connection test failed:", error.message);
        process.exit(1);
      });
  }
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown database initialization error";
  console.error("Database connection failed:", message);
  process.exit(1);
}

export default connection;