const fs = require("fs");
const { json } = require("express");
const roomModel = require("../models/RoomsModel");
const { error, log } = require("console");
const knex = require("../knexfile.js");
const multer = require('multer');
const firebase = require('firebase/app');
const firebaseStorage = require('firebase/storage');
const config = require('../digikost-83396-firebase-adminsdk-h0s0z-30e76f26a7.json');
const { all } = require("../routes/userRoutes.js");
const buildingsModel = require("../models/BuildingsModel.js");
const userModel = require("../models/UserModel.js");
firebase.initializeApp(config);
const storage = firebaseStorage.getStorage();


class Roomcontroller {
   
     static async index (req, res){
      try {
         const alldata = await roomModel.getall(knex);
        const buildings = await buildingsModel.getAll(knex);
        let userId = req.session.userId;
        let userData = await userModel.getUserById(knex,userId);
        res.render("Room/room",{ alldata,buildings, userData });
         
      } catch (error) {
         res.status(500).json("error");
         
      }
        
     }
     static async roomOnBuildig (req,res){
      try {
         let buildID = req.params.id;
         let rooms = await roomModel.getRoombyBuildingId(knex,buildID);
         let userId = req.session.userId;
         let userData = await userModel.getUserById(knex,userId);
         

         res.render("roomB",{ rooms, userData });
         
      } catch (error) {
         console.log(error);
         res.status(500).json(error);
         
      }

     }

     static addForm(req, res){
         
        res.render("Room/addRoomForm")
     }
     static async addRoom(req,res){
      try {
         const downURL = firebaseStorage.getDownloadURL;
         const refer = firebaseStorage.ref;
         let {  Room_name,price,building_id} = req.body
         const storageRef =refer(storage, `filesroom/${ Room_name+ req.file.originalname }`);
         const metadata = {
             contentType: req.file.mimetype,
           };
         const snapshot = await firebaseStorage.uploadBytes(storageRef,req.file.buffer,metadata);
         const downloadUrl = await downURL(snapshot.ref);
         await roomModel.createRooms(knex,Room_name,downloadUrl,price,building_id);
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
         res.render("Room/room",{ theData });
         
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