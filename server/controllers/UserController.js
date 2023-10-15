const { json } = require("express");
const dbAccount = require("../db/account.json");
const fs = require("fs");
const { error, log } = require("console");
class UserController {
    static login(req, res) { 
      res.render("auth/login");
    }
    static register(req , res){
      try {
        let allData = dbAccount.accountData;
        let fixID;
        let{ name, email, phoneNumber,NIk,password} = req.body;

        function dynamicId (){
          if (!allData.length){
            fixID = 1
          } else {
            fixID = allData.length  + 1 
          }
          return fixID;
        }
        dynamicId()

        let dataInputConteiner = {
          "id": fixID,
          "name": req.body.name,
          "email": req.body.email,
          "phoneNumber": req.body.phoneNumber,
          "NIK": req.body.NIk,
          "password": req.body.password

        }
        allData.push(dataInputConteiner);
        let manipulDataToString = JSON.stringify(dbAccount);
        fs.writeFileSync("./db/account.json", manipulDataToString);

        res.status(201).json("account added");
      } catch (error) {
        res.status(500).json(error)
        
      }
       

    }

    static profil (req,res){
      try {
        let allData = dbAccount.accountData;
        let idInput = req.params.id;
        let dataContainer;
        let massage;
        
        for (let index = 0; index < allData.length; index++) {
          if(allData[index].id == idInput){
            dataContainer = allData[index];
          }
          else{
           
            
          }
          
        }
        res.status(200).json({dataContainer})
        
        
      
       
       
  
        
      } catch (error) {
        res.status(500).json(error);
        
      }
     
        

    }
  }
    
  
  module.exports = UserController;