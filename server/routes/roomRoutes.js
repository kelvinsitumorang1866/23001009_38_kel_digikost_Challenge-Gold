const express = require('express');
const roomRoutes = express.Router();
const Roomcontroller = require("../controllers/RoomController")

roomRoutes.get("/Room-list", Roomcontroller.index);
roomRoutes.get("/add-Room", Roomcontroller.addForm);
roomRoutes.post("/push-Room", Roomcontroller.addRoom);
roomRoutes.get("/search/:id", Roomcontroller.searchRoom);
roomRoutes.delete("/deleteRoom/:id", Roomcontroller.deleteRoom);


module.exports = roomRoutes;