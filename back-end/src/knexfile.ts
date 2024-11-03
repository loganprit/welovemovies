import path from "path";
import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

interface KnexConfig {
  [key: string]: Knex.Config;
}

const baseConfig: Knex.Config = {
  client: "postgresql",
  connection: {
    connectionString: DATABASE_URL + "?sslmode=require",
    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: { min: 0, max: 5 },
  migrations: {
    directory: path.join(__dirname, "db", "migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "db", "seeds"),
  },
};

const config: KnexConfig = {
  development: baseConfig,
  production: baseConfig,
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
      directory: path.join(__dirname, "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "db", "seeds"),
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
