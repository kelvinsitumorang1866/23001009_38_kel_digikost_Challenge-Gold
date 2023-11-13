/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const currentDate = new Date();
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('payments').del()
  await knex('payments').insert([
    { Amount:650000, created_at : currentDate},
    
  ]);
};
