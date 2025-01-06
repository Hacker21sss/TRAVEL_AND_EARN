const express = require('express');
const router = express.Router();
const AddressController = require('../controller/recentaddresscontroller');

// Save or update an address
router.post('/save', AddressController.saveAddress);

// Get recently used addresses
router.get('/recent/:userId', AddressController.getRecentlyUsedAddresses);

module.exports = router;
