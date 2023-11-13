const express = require('express');
const paymentRoutes = express.Router();
const PaymentController = require("../controllers/PaymentController");

paymentRoutes.get('/',PaymentController.index);
paymentRoutes.post('/',PaymentController.addPayment);








module.exports = paymentRoutes;