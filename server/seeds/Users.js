/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { 
      Full_Name: 'kelvin situmorang',
      Username: 'admin',
      email: 'kelvin@gmail.com',
      password:'12345',
      KTP:'Ktp.jpg',
      phoneNumber:'082289003016',


    },
   
  ]);
};
