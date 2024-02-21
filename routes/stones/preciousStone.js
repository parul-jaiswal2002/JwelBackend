const express = require('express');
const { getAllPreciousStone, getOnePreciousStone, addPreciousStone, editPreciousStone, deletePreciousStone, searchPreciousStone } = require('../../controllers/stone/preciousStone');

//middleware// require auth for all workout routes
const requireAuth = require("../../middleware/requireAuth");


const router = express.Router()
router.use(requireAuth)
//ye router phle requireauth ko fire krega// taki koi bhi crud operation bina authentication k na dekh ske
//agr error hoga to iske catch function se whi se return ho jayega

router.get('/', getAllPreciousStone);

router.get('/:id', getOnePreciousStone)

router.post("/", addPreciousStone);

router.put("/:id", editPreciousStone);

router.delete('/:id', deletePreciousStone);

router.get('/search', searchPreciousStone)

module.exports = router;