const express = require('express');
const userRoutes = express.Router();
const UserController = require("../controllers/UserController");

userRoutes.get('/login', UserController.login);
userRoutes.get('/register', UserController.register);
userRoutes.get('/profil', UserController.profil);

module.exports= userRoutes;
