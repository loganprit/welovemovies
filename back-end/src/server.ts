import dotenv from "dotenv";
import type { Express } from "express";
import app from "./app";
import connection from "./db/connection";

// Load environment variables
dotenv.config();

const { PORT = 5001 } = process.env;

/**
 * Listener callback for when server starts
 */
const listener = (): void => console.log(`Listening on Port ${PORT}!`);

// Run latest migrations and start server
connection.migrate
  .latest()
  .then((migrations: [number, string[]]) => {
    console.log("migrations", migrations);
    // Ensure app is properly initialized before listening
    const expressApp = app as Express;
    expressApp.listen(PORT, listener);
  })
  .catch((error: Error) => {
    console.error("Migration/Server error:", error);
    process.exit(1);
  });
