const { json } = require("express");
const userModel = require("../models/UserModel.js");
const fs = require("fs");
const { error, log } = require("console");
const knex = require("../knexfile.js")
const multer = require('multer');
const firebase = require('firebase/app');
const firebaseStorage = require('firebase/storage');
const config = require('../digikost-83396-firebase-adminsdk-h0s0z-30e76f26a7.json');
const roomModel = require ("../models/RoomsModel.js");

firebase.initializeApp(config);

const storage = firebaseStorage.getStorage();


class UserController {
    static login(req, res) { 
      res.render("auth/login");
    }
    static async auth (req, res){
      try {
        const { username, password } = req.body;
  
        // Check credentials against your user database
        const user = await userModel.findUserAndPassword(knex,username,password);
        console.log(user);
    
        if (user) {
            // Store user ID in the session
            req.session.userId = user.id;
            let theRoles = user.roles;
            if(theRoles === "User"){
              res.redirect('/user/profil/:id');
              
            } else{
              res.redirect('/');
            }
            
        } else {
            res.redirect('/user/login');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        
      }
    }
    static async logout(req,res){
      req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/user/login'); // Redirect to login page or any other page
        }
    });
    }
    static async registerPage(req,res){
      res.render("auth/register");
    }

    
    static async register(req , res){
      try {
        
        const downURL = firebaseStorage.getDownloadURL;
        const refer = firebaseStorage.ref;
        let{ Full_Name,Username, email, phoneNumber,password} = req.body;
        const dateTime = new Date();
        const storageRef =refer(storage, `files/${ Full_Name + req.file.originalname }`);
        const metadata = {
          contentType: req.file.mimetype,
        };
        const snapshot = await firebaseStorage.uploadBytes(storageRef,req.file.buffer,metadata);
        const downloadUrl = await downURL(snapshot.ref);
        await userModel.createUser(knex, Full_Name, Username, email, password, downloadUrl, phoneNumber);
        // req.flash('success', 'Registrasi berhasil! Silahkan login.');
        res.redirect("/user/login");
       
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
      }
       

    }

    static async profil (req,res){
      try {
        let idInput = req.session.userId;
        const data = await userModel.getUserById(knex,idInput);
        let userId = req.session.userId;
        let userData = await userModel.getUserById(knex,userId);
           res.render('auth/profil', {data,userData});
      } catch (error) {
        res.status(500).json(error);
        
      }
     
    }
    static async getKtpImage (req,res){
      try {
        let targetId= req.params.id;
        const theData = await userModel.getUserKTPImage(knex,targetId);
        res.set('Content-Type', 'image/jpeg'); 
        
        res.send(theData.data); 

        
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving the image');
      }

    }
    static async deleteUser (req,res){
      try {
        let targetId = req.params.id;
        
        await userModel.deleteById(knex,targetId);
        res.status(200).json('account deleted')
      } catch (error) {
        res.status(500).json(error)
        
      }
    }
    static async changeRole(req,res){
      try {
        let targetedId = req.params.id;
        await userModel.changeRole(knex,targetedId);

        res.status(200).json('changed')
        
      } catch (error) {
        res.status(500).json(error)
        
      }
    }
    static async getResidents(req,res){
      try {
        const alldata = await userModel.getUserRoles(knex);
        const rooms = await roomModel.getall(knex);
        let userId = req.session.userId;
        let userData = await userModel.getUserById(knex,userId);
        res.render('listUser',{userData,alldata,rooms})

        
      } catch (error) {
        res.status(500).json(error)
        
      }
    }
    static async assignToRoom (req,res){
      try {
        let targetedId = req.params.id;
        let {room_id} = req.body;
        await userModel.assignToRoom(knex,targetedId,room_id);
        res.status(200).json("signed")
        
      } catch (error) {
        res.status(500).json(error)
      }
    }
  }
    
  
  module.exports = UserController;