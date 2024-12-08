import type { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

/**
 * Load environment variables
 * @throws {Error} If required environment variables are missing
 */
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const DATABASE_URL = process.env.DATABASE_URL;

/**
 * Base database configuration
 */
const baseConfig: Knex.Config = {
  client: "postgresql",
  pool: {
    min: Number(process.env.DB_POOL_MIN) || 0,
    max: Number(process.env.DB_POOL_MAX) || 5,
    acquireTimeoutMillis: 60_000,
    createTimeoutMillis: 30_000,
    idleTimeoutMillis: 600_000,
    reapIntervalMillis: 1_000,
    createRetryIntervalMillis: 100,
  },
  acquireConnectionTimeout: 60_000,
  migrations: {
    directory: path.resolve(__dirname, "db", "migrations"),
    extension: process.env.NODE_ENV === "development" ? "ts" : "js",
  },
  seeds: {
    directory: path.resolve(__dirname, "db", "seeds"),
    extension: process.env.NODE_ENV === "development" ? "ts" : "js",
  },
  debug: process.env.NODE_ENV === "development",
};

/**
 * Environment-specific configurations
 */
const config: Record<string, Knex.Config> = {
  development: {
    ...baseConfig,
    connection: {
      connectionString: DATABASE_URL,
      ssl: false,
    },
  },
  production: {
    ...baseConfig,
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      ...baseConfig.pool,
      min: 2, // Ensure minimum connections in production
    },
  },
  test: {
    client: "better-sqlite3",
    connection: {
      filename: ":memory:",
      flags: [
        "SQLITE_OPEN_READWRITE",
        "SQLITE_OPEN_CREATE",
        "SQLITE_OPEN_FULLMUTEX",
      ],
    },
    migrations: {
      directory: path.resolve(__dirname, "db", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "db", "seeds"),
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn: unknown, cb: Function): void => {
        if (conn && typeof conn === "object" && "exec" in conn) {
          (conn as { exec: Function }).exec("PRAGMA foreign_keys = ON;");
        }
        cb();
      },
    },
  },
};

export default config;
