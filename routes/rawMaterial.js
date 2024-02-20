const express = require('express');
const { getAllRawMaterial, getOneRawMaterial, addRawMaterial, editRawMaterial, deleteRawMaterial, searchRawMaterial } = require('../controllers/rawMaterial')


//middleware// require auth for all workout routes
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)
//ye router phle requireauth ko fire krega// taki koi bhi crud operation bina authentication k na dekh ske
//agr error hoga to iske catch function se whi se return ho jayega

router.get('/', getAllRawMaterial);

router.get('/:id', getOneRawMaterial)

router.post("/", addRawMaterial);

router.put("/:id", editRawMaterial);

router.delete('/:id', deleteRawMaterial);

router.get('/search', searchRawMaterial)

module.exports = router;