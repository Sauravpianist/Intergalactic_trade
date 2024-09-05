const express = require('express');
const router = express.Router();
const {createCargo,getCargoDetails} = require('../controllers/cargoController');

router.post('/cargo',createCargo);
router.get('/cargo/:shipmentId',getCargoDetails);


module.exports = router;
