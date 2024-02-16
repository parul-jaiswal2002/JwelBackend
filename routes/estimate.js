const express = require('express');
const {createEstimate} = require('../controllers/estimate')
const router = express.Router();

router.post('/', createEstimate);

module.exports = router;