import knex from "knex";
import { knexSnakeCaseMappers } from "objection";
import config from "../../knexfile";

const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];

if (!environmentConfig) {
  throw new Error(`No configuration found for environment: ${environment}`);
}

// Add TypeScript support for knex configuration
const connection = knex({
  ...environmentConfig,
  ...knexSnakeCaseMappers(),
});

export default connection;
