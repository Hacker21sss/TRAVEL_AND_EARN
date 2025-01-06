const express = require('express');
const router = express.Router();
const userController = require("../controller/Usercontroller");

router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);

module.exports = router;