const express = require('express');
const router = express.Router();
const passwordController = require('../controller/resetpasswordcontroller');
const newpassword=require('../controller/newpassword_controller')
router.post('/setpass/:userId', newpassword.setPassword);
router.post('/verify-otp', passwordController.verifyOTP);
// router.post('/reset-password', newpassword.resetPassword);

module.exports = router;
