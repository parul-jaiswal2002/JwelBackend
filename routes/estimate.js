const express = require('express');
const {createEstimate, editEstimate, getAllEstiamte, deleteEstimate, searchEstimate} = require('../controllers/estimate')


//middleware// require auth for all workout routes
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)


//get all estimate
router.get('/', getAllEstiamte)
//create a Estimate
router.post('/', createEstimate);

// edit a estimate
router.put('/:estimateId', editEstimate)

//delete a estimate
router.delete('/:estimateId', deleteEstimate)

router.get('/search', searchEstimate)

module.exports = router;