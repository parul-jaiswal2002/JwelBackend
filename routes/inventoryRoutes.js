const express = require('express');
const {getAllInventory, addInventory, editInventory, deleteInventory, searchInventories, getOneInventory} = require('../controllers/inventoryController')


//middleware// require auth for all workout routes
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)
//ye router phle requireauth ko fire krega// taki koi bhi crud operation bina authentication k na dekh ske
//agr error hoga to iske catch function se whi se return ho jayega

router.get('/', getAllInventory);

router.get('/searchCode', getOneInventory)

router.post("/", addInventory);

router.put("/:id", editInventory);

router.delete('/:id', deleteInventory);

router.get('/search', searchInventories)

module.exports = router;