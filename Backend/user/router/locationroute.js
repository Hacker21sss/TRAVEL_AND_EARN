const express = require('express');
const router = express.Router();

// Import the getAutoCompleteSuggestions function from the Location controller module
const { getAutoCompleteSuggestions } = require('../controller/Location');

// Import the validateQuery middleware function from the ValidateQueryLocation module
// const validateQuery = require('../Middleware/ValidateQueryLocation');

// Define a GET route for retrieving location data, with two middleware functions:
// 1. validateQuery: validates the query parameters
// 2. getAutoCompleteSuggestions: retrieves the location data
router.get('/location',  getAutoCompleteSuggestions);

// Export the router instance, making it available for use in other parts of the application
module.exports = router;