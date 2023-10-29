const express = require("express");
const buildingRoutes = express.Router();
const BuildingController = require("../controllers/BuildingController");

buildingRoutes.get("/bulding-list", BuildingController.index);
buildingRoutes.post("/addBuilding",BuildingController.add);
buildingRoutes.get("/bulding-list/:id", BuildingController.detail);
buildingRoutes.delete("/bulding-list/:id", BuildingController.deleteBuilding);
buildingRoutes.put("/bulding-list/:id",BuildingController.updateBuilding);

module.exports = buildingRoutes;