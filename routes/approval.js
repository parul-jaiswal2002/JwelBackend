const express = require('express');
const {createApproval, getAllApprovals} = require('../controllers/approval')

//middleware// require auth for all workout routes
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

//create approval
router.get('/', getAllApprovals)
router.post('/', createApproval)

module.exports = router;