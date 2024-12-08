import dotenv from "dotenv";
import type { Express } from "express";
import app from "./app";
import connection from "./db/connection";

/**
 * Initialize environment configuration before any other imports
 * @throws {Error} If .env file cannot be loaded
 */
try {
  dotenv.config();
} catch (error) {
  console.error("Failed to load environment variables:", error);
  process.exit(1);
}

const DEFAULT_PORT = 5001;
const port = Number(process.env.PORT) || DEFAULT_PORT;

/**
 * Server startup handler
 * @throws {Error} If server fails to start
 */
async function startServer(): Promise<void> {
  try {
    // Run database migrations
    await connection.migrate.latest({
      directory: "./src/db/migrations",
      extension: "ts"
    });
    const [batchNo, migrations] = await connection.migrate.latest();
    console.info(`Batch ${batchNo}: Applied ${migrations.length} migrations`);
    
    // Type assertion to Express to ensure proper initialization
    const expressApp = app as Express;
    
    // Start server
    expressApp.listen(port, () => {
      console.info(`Server running on port ${port}`);
      console.info(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await connection.destroy();
    process.exit(1);
  }
}

/**
 * Handle unexpected errors and cleanup
 */
process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  connection.destroy().then(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.info("SIGTERM received. Shutting down gracefully...");
  connection.destroy().then(() => process.exit(0));
});

// Initialize server
startServer().catch((error) => {
  console.error("Server initialization failed:", error);
  process.exit(1);
});
