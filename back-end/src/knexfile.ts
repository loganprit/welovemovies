import type { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in environment variables");
  process.exit(1);
}

const DATABASE_URL = process.env.DATABASE_URL;

interface KnexConfig {
  [key: string]: Knex.Config;
}

const baseConfig: Knex.Config = {
  client: "postgresql",
  connection: DATABASE_URL,
  pool: { 
    min: 0, 
    max: 5,
    acquireTimeoutMillis: 60000,
    createTimeoutMillis: 30000,
    idleTimeoutMillis: 600000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
  },
  acquireConnectionTimeout: 60000,
  migrations: {
    directory: path.resolve(__dirname, "db", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "db", "seeds"),
  },
  debug: process.env.NODE_ENV === "development",
};

const config: KnexConfig = {
  development: {
    ...baseConfig,
    connection: {
      connectionString: DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    },
  },
  production: {
    ...baseConfig,
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  },
  test: {
    client: "better-sqlite3",
    connection: {
      filename: ":memory:",
      flags: [
        "SQLITE_OPEN_READWRITE", 
        "SQLITE_OPEN_CREATE",
        "SQLITE_OPEN_FULLMUTEX"
      ]
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn: any, cb: Function) => {
        conn.exec("PRAGMA foreign_keys = ON;");
        cb();
      },
    },
  },
};

export default config;
