/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("buildings", (table) =>{
        table.increments("id").primary();
        table.string("building_name");
        table.string("building_pict");
        table.string("location");
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("buildings");
  
};
