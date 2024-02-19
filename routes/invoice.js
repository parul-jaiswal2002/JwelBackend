const express = require('express');
const {createInvoice, editInvoice} = require('../controllers/invoice')
const router = express.Router();

//create a invoice
router.post('/', createInvoice);

//edit a invoice
router.put('/:invoiceId', editInvoice)

module.exports = router;