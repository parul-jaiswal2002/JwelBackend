const express = require('express')
const { loginAdmin, signUpAdmin } = require('../../controllers/superAdmin/superAdmin');

const router = express.Router()

//login
router.post('/login', loginAdmin)

//signup
router.post('/signup', signUpAdmin)

module.exports = router