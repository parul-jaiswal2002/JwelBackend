const express = require('express');
const {allowedItems, getAllItems} = require('../../controllers/allowedValues/allowedDia1')

const router = express.Router();

router.get('/', getAllItems)
router.post('/', allowedItems)


module.exports = router;