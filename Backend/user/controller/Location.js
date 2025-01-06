const axios = require('axios');
require('dotenv').config();

module.exports.getAutoCompleteSuggestions = async (req, res) => {
  const { going, leaving } = req.query; // Extract both query parameters from the request

  // Check if at least one of the query parameters is provided
  if (!going && !leaving) {
    return res.status(400).json({ message: 'At least one query parameter (going or leaving) is required' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Get API key from environment variables

  try {
    let goingSuggestions = [];
    let leavingSuggestions = [];

    // Fetch suggestions for the "going" input if provided
    if (going) {
      const goingUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(going)}&key=${apiKey}`;
      const goingResponse = await axios.get(goingUrl);

      if (goingResponse.data.status === 'OK') {
        goingSuggestions = goingResponse.data.predictions.map(prediction => prediction.description);
      } else {
        console.error(`Error from Google API for going input: ${goingResponse.data.status}`);
      }
    }

    // Fetch suggestions for the "leaving" input if provided
    if (leaving) {
      const leavingUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(leaving)}&key=${apiKey}`;
      const leavingResponse = await axios.get(leavingUrl);

      if (leavingResponse.data.status === 'OK') {
        leavingSuggestions = leavingResponse.data.predictions.map(prediction => prediction.description);
      } else {
        console.error(`Error from Google API for leaving input: ${leavingResponse.data.status}`);
      }
    }

    // Return the combined suggestions
    return res.status(200).json({
      goingSuggestions,
      leavingSuggestions
    });

  } catch (error) {
    // Catch any errors and log them
    console.error('Error fetching autocomplete suggestions:', error.message);
    return res.status(500).json({ message: 'Failed to fetch suggestions. Please try again later.' });
  }
};