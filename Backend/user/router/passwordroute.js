const express = require('express');
const router = express.Router();
const { updatePassword, showPasswordSetPage } = require('../controller/passwordcontroller');

router.put('/user/:userId/set-password', showPasswordSetPage); // Show password set page
router.get('/user/:userId/update-password', updatePassword); // Update password

module.exports = router;
