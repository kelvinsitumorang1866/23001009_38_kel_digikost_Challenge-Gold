/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("outcomes", (table)=>{
        table.increments("id").primary();
        table.integer("Ammount");
        table.string("informaton");
        table.timestamp("created_at")
        table.integer("User_id").unsigned().references("id").inTable("users");
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("outcomes");
  
};
