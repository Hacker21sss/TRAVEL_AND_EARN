const express = require('express');
const router = express.Router();
const RegionController = require('../../user/controller/RegionController');

// Route to create a new region
router.post('/regions', RegionController.createRegion);

// Route to get regions for a specific user
router.get('/regions/:userId', RegionController.getRegions);

module.exports = router;
