/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("rooms", (table) =>{
        table.increments("id").primary();
        table.string("Room_name");
        table.string("Room_pict");
        table.integer("price");
        table.integer("building_id").unsigned().references("id").inTable("buildings")
        table.enu("room_status",["available","unavailable"]).defaultTo("available")
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("rooms")
  
};
