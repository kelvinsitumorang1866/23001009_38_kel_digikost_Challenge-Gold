const knex = require('knex');
const config = require('../knexfile.js')[process.env.NODE_ENV || 'development'];
const database = knex(config);

const outcomesModel ={

    addOutcomes: async function (knex,Ammount,informaton,created_at,User_id){
        let userInput = {
            Ammount,
            informaton,
            created_at,
            User_id

        };
        return await database('outcomes').insert(userInput);
    },

    deleteOutcomes : async function (knex,id){
        return await database('outcomes').where({id}).del();
    }




}

module.exports= outcomesModel;