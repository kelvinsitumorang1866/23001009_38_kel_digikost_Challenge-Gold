const express = require('express');
const roomRoutes = express.Router();
const Roomcontroller = require("../controllers/RoomController");
const multer = require('multer');
const container = multer.memoryStorage();
const upload = multer({ container: 'temp/' });
const authMiddleware = require("../middleware/auth");



roomRoutes.get("/Room-list",authMiddleware.requireLogin, Roomcontroller.index);
roomRoutes.get("/Room-list/:id", Roomcontroller.detailRoom);
roomRoutes.put("/Room-list/:id", Roomcontroller.updateRoom);
roomRoutes.get("/add-Room", Roomcontroller.addForm);
roomRoutes.post("/push-Room",upload.single('filename'), Roomcontroller.addRoom);
roomRoutes.delete("/deleteRoom/:id", Roomcontroller.deleteRoom);
roomRoutes.get("/roomsOnBuilding/:id",Roomcontroller.roomOnBuildig);



module.exports = roomRoutes;