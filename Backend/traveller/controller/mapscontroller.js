const mapService = require('../../service/mapservice');
const { validationResult, query } = require('express-validator'); // Import query from express-validator
const express = require('express');
const router = express.Router();

module.exports.getDistanceTime = async (req, res) => {
    try {
        // Validate query parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        // Log the inputs for debugging
        console.log('Origin:', origin);
        console.log('Destination:', destination);

        // Call the service to get distance and time
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        // Send response
        res.status(200).json(distanceTime);

    } catch (err) {
        console.error('Error fetching distance and time:', err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
// Define the route with validation middleware
router.get(
    '/get-distance-time',
    query('origin').isString().isLength({ min: 3 }).withMessage('Origin must be a valid string'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination must be a valid string'),
    module.exports.getDistanceTime
);

module.exports = router;
