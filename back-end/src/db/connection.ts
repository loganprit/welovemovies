import knex, { Knex } from "knex";
import config from "../knexfile";

const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];

if (!environmentConfig) {
  throw new Error(`No configuration found for environment: ${environment}`);
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

console.log("Environment:", environment);
console.log("Database URL:", process.env.DATABASE_URL.split("@")[1]); // Only log the host part for security
console.log("Config:", JSON.stringify(environmentConfig, null, 2));

let connection: Knex;

try {
  connection = knex(environmentConfig);
  // Test the connection
  connection.raw("SELECT 1")
    .then(() => console.log("Database connection established successfully"))
    .catch((error) => console.error("Database connection test failed:", error));
} catch (error) {
  console.error("Failed to create connection:", error);
  throw error;
}

export default connection;