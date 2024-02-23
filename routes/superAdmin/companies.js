const express = require('express');
const {getAllCompanies, createCompany, deleteCompany} = require('../../controllers/superAdmin/companies')
const requireAdmin = require("../../middleware/requireAdmin")

const router = express.Router()
router.use(requireAdmin)

router.get('/', getAllCompanies);

router.post('/', createCompany);


router.delete('/:id', deleteCompany)

module.exports = router;