const express = require('express');
const {createEstimate, editEstimate} = require('../controllers/estimate')
const router = express.Router();

//create a Estimate
router.post('/', createEstimate);

// edit a estimate
router.put('/:estimateId', editEstimate)

module.exports = router;