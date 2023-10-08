const express = require("express");
const buildingRoutes = express.Router();
const BuildingController = require("../controllers/BuildingController");

buildingRoutes.get("/bulding-list", BuildingController.index);

module.exports = buildingRoutes;