const express = require('express');
const {getAllInventory, addInventory, editInventory, deleteInventory, searchInventories} = require('../controllers/inventoryController')

const router = express.Router();

router.get('/', getAllInventory);

router.post("/", addInventory);

router.put("/:id", editInventory);

router.delete('/:id', deleteInventory);

router.get('/search', searchInventories)

module.exports = router;