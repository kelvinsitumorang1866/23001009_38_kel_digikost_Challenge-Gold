const { json } = require("express");
const outcomesModel = require("../models/outcomesModel.js");
const fs = require("fs");
const { error, log } = require("console");
const knex = require("../knexfile.js");
const { Module } = require("module");

class OutcomesController {

    static async addOutcomes (req,res){
        try {
            let{ Ammount,informaton,User_id} = req.body;
            let currentDate = new Date();
            await outcomesModel.addOutcomes(knex,Ammount,informaton,currentDate,User_id);
            res.status(201).json('outcomes added');
        }catch (error) {
            res.status(500).json(error);
        }
            
        
    }

    static async deleteOutcomes(req,res){
        try {
            let targetId = req.params.id;
            await outcomesModel.deleteOutcomes(knex,targetId);
            res.status(200).json("outcomes deleted");
        } catch (error) {
            res.status(500).json(error)
            
        }
    }




}

module.exports = OutcomesController;