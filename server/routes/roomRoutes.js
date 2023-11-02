const express = require('express');
const roomRoutes = express.Router();
const Roomcontroller = require("../controllers/RoomController")

roomRoutes.get("/Room-list", Roomcontroller.index);
roomRoutes.get("/Room-list/:id", Roomcontroller.detailRoom);
roomRoutes.put("/Room-list/:id", Roomcontroller.updateRoom);
roomRoutes.get("/add-Room", Roomcontroller.addForm);
roomRoutes.post("/push-Room", Roomcontroller.addRoom);
roomRoutes.delete("/deleteRoom/:id", Roomcontroller.deleteRoom);



module.exports = roomRoutes;