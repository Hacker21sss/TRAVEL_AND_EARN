const express = require('express');
const router = express.Router();
const travelController = require('../../user/controller/details'); // Import the controller

// Route to get travel details based on locations and available drivers
router.get('/travel', travelController.getTravel);

module.exports = router;