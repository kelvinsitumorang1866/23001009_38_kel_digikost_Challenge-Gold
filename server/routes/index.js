const express = require('express');
const router = express.Router();
const roomRoutes = require('../routes/roomRoutes');
const IndexController = require('../controllers/IndexController');
const userRoutes= require("../routes/userRoutes");
const buildingRoutes = require("../routes/bulidingRoutes");
const paymentRoutes = require("../routes/PaymentRoutes");
const outcomesRoutes = require("../routes/OutcomeRoutes");
const authMiddleware = require("../middleware/auth");

router.get("/",authMiddleware.requireLogin, IndexController.index);
router.use('/room', roomRoutes);
router.use('/user', userRoutes);
router.use('/buildings', buildingRoutes);
router.use('/Payments',paymentRoutes);
router.use('/outcomes',outcomesRoutes);

    



module.exports = router;