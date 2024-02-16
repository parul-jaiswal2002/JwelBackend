const express = require('express');
const {getAllInventory, addInventory, editInventory, deleteInventory, searchInventories, getOneInventory} = require('../controllers/inventoryController')

const router = express.Router();

router.get('/', getAllInventory);

router.get('/searchCode', getOneInventory)

router.post("/", addInventory);

router.put("/:id", editInventory);

router.delete('/:id', deleteInventory);

router.get('/search', searchInventories)

module.exports = router;