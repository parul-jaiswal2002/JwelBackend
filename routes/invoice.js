const express = require('express');
const {createInvoice} = require('../controllers/invoice')
const router = express.Router();

//create a invoice
router.post('/', createInvoice);

//edit a invoice

module.exports = router;