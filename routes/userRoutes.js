const express = require('express');
const {loginUser,signUpUser, sendPasswordResetEmail, resetPassword} = require('../controllers/userController')

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signUpUser);
// Route for initiating password reset
router.post('/reset-password', sendPasswordResetEmail);

// Route for resetting password
router.post('/reset-password/:token', resetPassword);

module.exports = router;