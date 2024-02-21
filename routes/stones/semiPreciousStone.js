const express = require('express');
const { getAllSemiPrecious, getOneSemiPrecious, addSemiPrecious, editSemiPrecious, deleteSemiPrecious, searchSemiPrecious } = require('../../controllers/stone/semiPreciousStone');

//middleware// require auth for all workout routes
const requireAuth = require("../../middleware/requireAuth");



const router = express.Router()
router.use(requireAuth)
//ye router phle requireauth ko fire krega// taki koi bhi crud operation bina authentication k na dekh ske
//agr error hoga to iske catch function se whi se return ho jayega

router.get('/', getAllSemiPrecious);

router.get('/:id', getOneSemiPrecious)

router.post("/", addSemiPrecious);

router.put("/:id", editSemiPrecious);

router.delete('/:id', deleteSemiPrecious);

router.get('/search', searchSemiPrecious)

module.exports = router;