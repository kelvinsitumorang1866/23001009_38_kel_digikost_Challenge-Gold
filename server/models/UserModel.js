const bcrypt = require('bcrypt'); // Import the bcrypt library
const saltRounds = 10; // Set the number of salt rounds for password hashing
const knex = require('knex');
const config = require('../knexfile.js')[process.env.NODE_ENV || 'development'];
const database = knex(config);

const UserModel = {
  createUser: async function(knex, Full_Name, Username, email, password, KTP, phoneNumber) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return database('users').insert({ Full_Name,Username, email, password: hashedPassword,KTP,phoneNumber });
  },

  getUserById: function(knex, id) {
    return database('users').where({ id }).first();
  },

  getUserByEmail: function(knex, email) {
    return database('users').where({ email }).first();
  },

  
};

module.exports = UserModel;