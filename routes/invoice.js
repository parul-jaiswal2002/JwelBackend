const express = require('express');
const {getAllInvoices,createInvoice, editInvoice,deleteInvoice, searchInvoice} = require('../controllers/invoice')


//middleware// require auth for all workout routes
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)


//get all invoices
router.get('/', getAllInvoices)

//get a single invoice
// router.get('/:invoiceId', getSingleInvoice)
//create a invoice
router.post('/', createInvoice);

//edit a invoice
router.put('/:invoiceId', editInvoice)

//delete a invoice 
router.delete('/:invoiceId', deleteInvoice)

//search a invoice
router.get('/search', searchInvoice)

module.exports = router;