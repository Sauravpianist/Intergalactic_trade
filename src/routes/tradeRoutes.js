const express = require('express');
const router = express.Router();
const {createTrade,getTransactionDetails} = require('../controllers/tradeController');

router.post('/trades',createTrade);
router.get('/trades/:transaction_Id',getTransactionDetails)

module.exports = router;
