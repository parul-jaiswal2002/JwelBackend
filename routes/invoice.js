const express = require('express');
const {getAllInvoices,getSingleInvoice, createInvoice, editInvoice,deleteInvoice} = require('../controllers/invoice')
const router = express.Router();


//get all invoices
router.get('/', getAllInvoices)

//get a single invoice
router.get('/:invoiceId', getSingleInvoice)
//create a invoice
router.post('/', createInvoice);

//edit a invoice
router.put('/:invoiceId', editInvoice)

//delete a invoice 
router.delete('/:invoiceId', deleteInvoice)

module.exports = router;