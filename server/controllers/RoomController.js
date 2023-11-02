const fs = require("fs");
const { json } = require("express");
const roomModel = require("../models/RoomsModel");
const { error, log } = require("console");
const knex = require("../knexfile.js")

class Roomcontroller {
     static index (req, res){
        res.render("Room/room")
     }

     static addForm(req, res){
        res.render("Room/addRoomForm")
     }
     static async addRoom(req,res){
      try {
         let {  Room_name,Room_pict,price,building_id} = req.body
         await roomModel.createRooms(knex,Room_name,Room_pict,price,building_id);
         res.status(201).json("room added");
         
         
      } catch (error) {

         console.log(error);
         res.status(500).json(error);
         
      }
     
     }

     static async deleteRoom (req,res){
      try {
         let targetId = req.params.id;
         await roomModel.deleteRoomById(knex,targetId);
         res.status(200).json("room deleted");
      } catch (error) {
         res.status(500).json(error);
         
      }
   
     }

     static async detailRoom (req,res){
      try {
         let targetedId = req.params.id;
         const theData = await roomModel.getRoomById(knex,targetedId);
         res.status(200).json(theData);
         
      } catch (error) {
         res.status(500).json(error);
         
      }
     }
     static async updateRoom(req,res){
      try {
         let targetedId = req.params.id;
         let {  Room_name,Room_pict,price,building_id} = req.body
         await roomModel.updateRoom(knex,targetedId,Room_name,Room_pict,price,building_id);
         res.status(200).json("room updated");
         
      } catch (error) {
         res.status(500).json(error)
         
      }
     }


}

module.exports = Roomcontroller;