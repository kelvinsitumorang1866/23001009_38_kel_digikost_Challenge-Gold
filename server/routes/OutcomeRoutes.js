const express = require('express');
const outcomesRoutes = express.Router();
const OutcomesController = require("../controllers/outcomesController");

outcomesRoutes.post('/',OutcomesController.addOutcomes);
outcomesRoutes.delete('/:id',OutcomesController.deleteOutcomes);



module.exports= outcomesRoutes;