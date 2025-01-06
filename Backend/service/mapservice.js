const axios = require('axios');
const drivermodel = require('../traveller/model/traveller');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
    module.exports.getAutoCompleteSuggestions = async (input) => {
        if (!input) {
            throw new Error('query is required');
        }
    
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    
        try {
            const response = await axios.get(url);
            if (response.data.status === 'OK') {
                return response.data.predictions.map(prediction => prediction.description).filter(value => value);
            } else {
                throw new Error('Unable to fetch suggestions');
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    module.exports.getDistanceTime = async (origin, destination) => {
        if (!origin || !destination) {
            throw new Error('Origin and destination are required');
        }
      
    
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    
        try {
    
    
            const response = await axios.get(url);
            if (response.data.status === 'OK') {
    
                if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                    throw new Error('No routes found');
                }
    
                return response.data.rows[ 0 ].elements[ 0 ];
            } else {
                throw new Error('Unable to fetch distance and time');
            }
    
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
       

    module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
        // radius in km
        const drivers = await drivermodel.find({
            currentLocation: {
                $geoWithin: {
                    $centerSphere: [[lng, ltd], radius / 6371]  // The coordinates should be [lng, ltd] in the $centerSphere query
                }
            },
            isAvailable: true  // Only get available drivers
        });
    
        return drivers;
    };
   