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

  getUserById: async function(knex, id) {
    return database('users').where({ id }).first();
  },

  getUserByEmail: async function(knex, email) {
    return database('users').where({ email }).first();
  },
  getUserKTPImage : async function(knex,id){
    return database('users').select('KTP').where({id});
  },
  deleteById :  async function(knex,id){
    return await database('users').where({id}).del();

  },
  findUserAndPassword: async function(knex, username, password) {
    try {
        // Retrieve the user from the database based on the username
        const user = await database('users').where({ Username: username }).first();
       

        if (user) {
            // Compare the provided password with the stored hash
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Passwords match, return the user
                return user;
            } else {
                // Passwords do not match
                return null;
            }
        } else {
            // User not found
            return null;
        }
    } catch (error) {
        console.error('Error finding user and password:', error);
        throw error;
    }

  },
  changeRole : async function(knex,id){
    return await database('users').where({id}).update({roles:'Admin'});

  },

  addDeadline : async function(knex,id,deadline){
    return await database('users').where({id}).update({deadline:deadline});
  },
  getUserRoles : async function (knex){
    return await database
  .select('users.*', 'rooms.Room_name')
  .from('users')
  .leftJoin('rooms', 'users.Room_id', 'rooms.id').where('users.roles', 'User');
  },
  assignToRoom : async function (knex,id,Room_Id){
    return await database('users').where({id}).update({Room_id: Room_Id})

  }

  


  
};

module.exports = UserModel;