import path from "path";
import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

interface KnexConfig {
  [key: string]: Knex.Config;
}

const config: KnexConfig = {
  development: {
    client: "postgresql",
    connection: {
      connectionString: DATABASE_URL + "?sslmode=require",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: {
      connectionString: DATABASE_URL + "?sslmode=require",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "better-sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn: any, cb: Function) => {
        // Enable foreign key support and WAL mode for better performance
        conn.exec(`
          PRAGMA foreign_keys = ON;
          PRAGMA journal_mode = WAL;
        `);
        cb();
      }
    }
  },
};

export default config;
