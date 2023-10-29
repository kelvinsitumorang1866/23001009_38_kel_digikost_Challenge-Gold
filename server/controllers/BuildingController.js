const { json } = require("express");
const buildingModel = require("../models/BuildingsModel");
const fs = require("fs");
const { error, log } = require("console");
const knex = require("../knexfile.js")

class BuildingController {
    static index (req , res){
        res.render("building/index")
    }
    static async add(req,res){
        try {
            let {building_name,building_pict,location} = req.body;
            await buildingModel.createBuilding(knex,building_name,building_pict,location);
            res.status(201).json("building added")
            
        } catch (error) {
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