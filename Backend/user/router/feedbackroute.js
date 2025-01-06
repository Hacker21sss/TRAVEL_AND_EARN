// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackcontroller');

router.post('/submit', feedbackController.submitFeedback);
router.get('/all', feedbackController.getAllFeedback);

module.exports = router;


