const express = require('express');
const router = express.Router();
const helpRequestController = require('../controller/helpcontroller');

router.post('/submit', helpRequestController.submitHelpRequest);
router.get('/all', helpRequestController.getAllHelpRequests);
router.patch('/:requestId/status', helpRequestController.updateHelpRequestStatus);

module.exports = router;
