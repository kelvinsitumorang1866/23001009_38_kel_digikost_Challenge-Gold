const express = require('express');
const userRoutes = express.Router();
const UserController = require("../controllers/UserController");

userRoutes.get('/login', UserController.login);
userRoutes.post('/register', UserController.register);
userRoutes.get('/profil/:id', UserController.profil);

module.exports= userRoutes;
