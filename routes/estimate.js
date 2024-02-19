const express = require('express');
const {createEstimate} = require('../controllers/estimate')
const router = express.Router();

//create a Estimate
router.post('/', createEstimate);

//edit a estimate
// router.put('/:id', editEstimate)

module.exports = router;