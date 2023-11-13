const express = require('express');
const userRoutes = express.Router();
const UserController = require("../controllers/UserController");


const multer = require('multer');
const container = multer.memoryStorage();
const upload = multer({ container: 'temp/' });
//upload.single('filename')
const authMiddleware = require("../middleware/auth");


userRoutes.get('/login', UserController.login);
userRoutes.get('/register',UserController.registerPage);
userRoutes.get('/residents',UserController.getResidents);
userRoutes.post('/login', UserController.auth);
userRoutes.post('/register',upload.single('filename'),UserController.register);
userRoutes.get('/profil/:id',authMiddleware.requireLogin, UserController.profil);
userRoutes.get('/profil/KTP/:id', UserController.getKtpImage);
userRoutes.delete('/profil/:id',UserController.deleteUser);
userRoutes.get('/logout', UserController.logout);
userRoutes.patch('/profil/:id', UserController.changeRole);
userRoutes.post('/assign/:id',upload.single('filename'), UserController.assignToRoom);

module.exports= userRoutes;
