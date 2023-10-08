const express = require('express');
const router = express.Router();
const roomRoutes = require('../routes/roomRoutes');
const IndexController = require('../controllers/IndexController');
const userRoutes= require("../routes/userRoutes");
const buildingRoutes = require("../routes/bulidingRoutes");

router.get("/", IndexController.index);
router.use('/room', roomRoutes);
router.use('/user', userRoutes);
router.use('/buildings', buildingRoutes);
    



module.exports = router;