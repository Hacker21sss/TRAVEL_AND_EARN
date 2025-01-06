const express = require('express');
const driverController = require('../../traveller/controller/travellercontroller'); // Import the controller
const router = express.Router();

// Search endpoint
router.post('/search', driverController.searchAvailableDrivers); // Use controller method for this route

module.exports = router;
