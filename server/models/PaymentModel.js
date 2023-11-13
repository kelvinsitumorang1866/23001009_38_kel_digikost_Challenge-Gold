const knex = require('knex');
const config = require('../knexfile.js')[process.env.NODE_ENV || 'development'];
const database = knex(config);

const PaymentModel = {

    getAllPayment : async function (knex){
        return database("payments").select("*");

    },

    addPayment : async function (knex,User_id,Room_id,Amount,created_at){
        let theInput = {
            User_id,
            Room_id,
            Amount,
            created_at
        }
        return database("payments").insert(theInput);
    }






}


module.exports = PaymentModel;