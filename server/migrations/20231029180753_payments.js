/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("payments", (table) =>{
        table.increments("id").primary();
        table.integer("User_id").unsigned().references("id").inTable("users");
        table.integer("Room_id").unsigned().references("id").inTable("rooms");
        table.integer("Amount");
        table.timestamp("created_at");

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("payments");
  
};
