const knex = require('knex');
const config = require('../knexfile.js')[process.env.NODE_ENV || 'development'];
const database = knex(config);

const RoomsModel = {
    getall: async function(knex){
        return database("rooms").select('*');

    },

    createRooms : async function(knex,Room_name,Room_pict,price,building_id){
        let userInput = {
            Room_name,
            Room_pict,
            price,
            building_id
        }
        return database("rooms").insert(userInput);
    },
    deleteRoomById : async function (knex,id) {
        return database("rooms").where({id}).del();

    },
    getRoomById : async function (knex,id){
        return await database("rooms").where({id});
    },
    updateRoom : async function (knex,id,Room_name,Room_pict,price,building_id){
        let userInput = {
            Room_name,
            Room_pict,
            price,
            building_id
        }
        return await database("rooms").where({id}).update(userInput);
    },
    getRoombyBuildingId : async function (knex,id){
        return await database("rooms").where({building_id :id});
    }


}

module.exports = RoomsModel;