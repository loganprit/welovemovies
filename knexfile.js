const path = require("path");
require("dotenv").config();

const {
  DATABASE_URL = "postgres://avnadmin:AVNS_zMZ3eHqUGIy8A4j4ITS@welovemovies-welovemovies.e.aivencloud.com:19388/defaultdb?sslmode=require",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL + "?ssl=true",
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
    connection: DATABASE_URL + "?ssl=true",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
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
  },
};
