const express = require('express');
const {getAllcam3d,create3d,delete3d, getAllcasting, createCasting,deleteCasting, getAllStoneSetting,createStoneSetting, deleteStoneSetting} = require('../../controllers/production/production')

//middleware
const requireAuth = require("../../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

//cam and 3d designs
router.get('/cam3d', getAllcam3d);

router.post('/cam3d', create3d);

router.delete('/cam3d/:id', delete3d)


//casting
router.get('/casting', getAllcasting)

router.post('/casting', createCasting)

router.delete('/casting/:id', deleteCasting)


//stoneSetting
router.get('/stoneSetting', getAllStoneSetting)

router.post('/stoneSetting', createStoneSetting)

router.delete('/stoneSetting/:id', deleteStoneSetting)



module.exports = router