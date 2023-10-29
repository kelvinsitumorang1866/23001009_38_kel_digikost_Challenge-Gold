const knex = require('knex');
const config = require('../knexfile.js')[process.env.NODE_ENV || 'development'];
const database = knex(config);

const BuildingsModel ={
    createBuilding : async function(knex,building_name,building_pict,location) {
        let userInput = {
            building_name,
            building_pict,
            location
        }
        return database("buildings").insert(userInput);

    },
    getById : async function(knex,id){
        return database("buildings").where({id});
    },
    deleteById : async function(knex,id){
        return database("buildings").where({id}).del();
    },
    updateBuild : async function(knex,id,building_name,building_pict,location){
        let userInput = {
            building_name,
            building_pict,
            location
        }
        return database("buildings").where({id}).update(userInput);


    }



}

module.exports = BuildingsModel