const express = require('express');
const {getAllInventory, addInventory, editInventory} = require('../controllers/inventoryController')

const router = express.Router();

router.get('/', getAllInventory);

router.post("/", addInventory);

router.put("/:id", editInventory);

router.delete('/:id', deleteInventory)

module.exports = router;