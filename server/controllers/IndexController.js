const { default: knex } = require("knex");
const userModel = require("../models/UserModel");
const roomModel = require("../models/RoomsModel");

class IndexController {

    static async index(req, res){
        let userId = req.session.userId;
        let userData = await userModel.getUserById(knex,userId);
        let allUser = await userModel.getUserRoles(knex);
        let allRoom = await roomModel.getall(knex);
        let countRoom = allRoom.length
        let count = allUser.length;
        
        res.render("dashboard",{userData, count,countRoom});   
         

    }


}

module.exports = IndexController