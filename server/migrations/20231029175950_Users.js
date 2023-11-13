/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("Full_Name");
        table.string("Username");
        table.string("email");
        table.string("password");
        table.string("KTP");
        table.bigInteger("phoneNumber");
        table.integer("Room_id").unsigned().references("id").inTable("rooms").nullable();
        table.enu("roles",["Admin","User"]).defaultTo("User");
        table.timestamp('deadline');



    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
  
};
