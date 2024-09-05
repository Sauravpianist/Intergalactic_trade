const express = require('express');
const router = express.Router();
const {getInventory,createInventory} = require('../controllers/inventoryController');

router.get('/inventory/:stationId', getInventory);
router.post('/inventory',createInventory)
module.exports = router;
