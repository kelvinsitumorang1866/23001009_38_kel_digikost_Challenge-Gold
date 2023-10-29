const { json } = require("express");
const userModel = require("../models/UserModel.js");
const fs = require("fs");
const { error, log } = require("console");
const knex = require("../knexfile.js")


class UserController {
    static login(req, res) { 
      res.render("auth/login");
    }
    static async register(req , res){
      try {
        let{ Full_Name,Username, email, phoneNumber,KTP,password} = req.body;
        await userModel.createUser(knex, Full_Name,Username, email, password,KTP,phoneNumber);
        res.status(201).json("account added");
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
      }
       

    }

    static async profil (req,res){
      try {
        let idInput = req.params.id;
        const data = await userModel.getUserById(knex,idInput);
        res.status(200).json({data})
      } catch (error) {
        res.status(500).json(error);
        
      }
     
    }
  }
    
  
  module.exports = UserController;