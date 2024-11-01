exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary(); // Primary key
    table.string("preferred_name").notNullable();
    table.string("surname").notNullable();
    table.string("organization_name").notNullable();
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
