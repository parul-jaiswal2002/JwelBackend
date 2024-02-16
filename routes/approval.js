const express = require('express');
const {createApproval} = require('../controllers/approval')

const router = express.Router();

//create approval
router.post('/', createApproval)

module.exports = router;