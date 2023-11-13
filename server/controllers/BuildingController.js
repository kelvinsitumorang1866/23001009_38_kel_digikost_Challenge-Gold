const { json } = require("express");
const buildingModel = require("../models/BuildingsModel");
const fs = require("fs");
const { error, log } = require("console");
const knex = require("../knexfile.js");
const multer = require('multer');
const firebase = require('firebase/app');
const firebaseStorage = require('firebase/storage');
const config = require('../digikost-83396-firebase-adminsdk-h0s0z-30e76f26a7.json');
const userModel = require("../models/UserModel.js");
firebase.initializeApp(config);
const storage = firebaseStorage.getStorage();
class BuildingController {
    static async index (req , res){
        const buildings = await buildingModel.getAll(knex);
        let userId = req.session.userId;
        let userData = await userModel.getUserById(knex,userId);
        res.render("building/index",{buildings,userData});
    }
    static async add(req,res){
        try {
            const downURL = firebaseStorage.getDownloadURL;
            const refer = firebaseStorage.ref;
            let {building_name,location} = req.body;
            const storageRef =refer(storage, `filesbuild/${ building_name + req.file.originalname }`);
            const metadata = {
                contentType: req.file.mimetype,
              };
              const snapshot = await firebaseStorage.uploadBytes(storageRef,req.file.buffer,metadata);
              const downloadUrl = await downURL(snapshot.ref);
            await buildingModel.createBuilding(knex,building_name,downloadUrl,location);
            res.status(201).json("building added")
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            
        }
    }
    static async detail(req,res){
        try {
           let searchedId = req.params.id;
            const detailData = await buildingModel.getById(knex,searchedId);
            res.status(200).json(detailData);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteBuilding(req,res){
        try {
            let deletedID = req.params.id;
            await buildingModel.deleteById(knex,deletedID);
            res.status(200).json('building deleted');
        } catch (error) {
            res.status(500).json(error);
            
        }
    }
    static async updateBuilding(req,res){
        try {
            let updateTargetId = req.params.id;
            let {building_name,building_pict,location} = req.body;
            await buildingModel.updateBuild(knex,updateTargetId,building_name,building_pict,location);
            res.status(200).json("building data updated")
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
}

module.exports = BuildingController