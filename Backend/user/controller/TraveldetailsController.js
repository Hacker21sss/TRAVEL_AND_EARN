// const Traveldetails = require('../model/traveldetails'); // Travel detail model
// const Driver = require('../../traveller/model/traveller'); // Driver model
// const mapservice = require('../../service/mapservice'); // Map service
// const notificationService = require('../../user/service/notificationService'); // Notification service
// const axios = require('axios');
// require('dotenv').config();

// // Get AutoComplete Suggestions
// module.exports.getAutoCompleteSuggestions = async (req, res) => {
//   const { Leavinglocation,Goinglocation } = req.query;

//   if (!query) {
//     return res.status(400).json({ message: 'Query parameter is required' });
//   }

//   const apiKey = process.env.GOOGLE_MAPS_API_KEY;
//   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);

//     if (response.data.status === 'OK') {
//       return res.status(200).json({
//         suggestions: response.data.predictions.map((prediction) => prediction.description),
//       });
//     } else {
//       return res.status(500).json({ message: `Error from Google API: ${response.data.status}` });
//     }
//   } catch (error) {
//     console.error('Error fetching autocomplete suggestions:', error.message);
//     return res.status(500).json({ message: 'Failed to fetch suggestions. Please try again later.' });
//   }
// };

// // Create Travel Detail
// exports.createTravelDetail = async (req, res) => {
//   const { Leavinglocation, Goinglocation, travelDate } = req.body;

//   if (!Leavinglocation || !Goinglocation) {
//     return res.status(400).json({ message: 'Leaving and Going locations are required' });
//   }

//   try {
//     // Fetch coordinates for Leaving and Going locations
//     const leavingCoordinates = await mapservice.getAddressCoordinate(Leavinglocation);
//     const goingCoordinates = await mapservice.getAddressCoordinate(Goinglocation);

//     if (!leavingCoordinates || !goingCoordinates) {
//       return res.status(400).json({ message: 'Unable to fetch coordinates for the provided locations.' });
//     }

//     // Find captains within a 5 km radius of the Leaving location
//     const captainsInRadius = await mapservice.getCaptainsInTheRadius(
//       leavingCoordinates.lat,
//       leavingCoordinates.lng,
//       5 // Radius in kilometers
//     );

//     console.log('Captains found within 5 km:', captainsInRadius);

//     // Save travel details to the database
//     const newTravelDetail = new Traveldetails({
//       Leavinglocation,
//       Goinglocation,
//       travelDate,
//       captainsNearby: captainsInRadius,
//     });

//     if (captainsInRadius.length === 0) {
//       return res.status(404).json({ message: 'No available captains found in the radius' });
//     }

//     await newTravelDetail.save();

//     // Notify available captains (optional)
//     captainsInRadius.forEach((captain) => {
//       notificationService.sendNotification(
//         captain.id,
//         'New Travel Request',
//         `A travel request is available from ${Leavinglocation} to ${Goinglocation}.`
//       );
//     });

//     return res.status(201).json({
//       message: 'Travel detail created successfully',
//       travelDetail: newTravelDetail,
//       captains: captainsInRadius,
//     });
//   } catch (error) {
//     console.error('Error creating travel detail:', error.message);
//     res.status(500).json({ message: 'Error creating travel detail', error: error.message });
//   }
// };

// // Search Nearest Available Drivers
// exports.searchNearestDrivers = async (req, res) => {
//   const { Leavinglocation, Goinglocation, travelDate } = req.body;

//   if (!Leavinglocation || !Goinglocation || !travelDate) {
//     return res.status(400).json({ message: 'Leaving location, Going location, and Travel Date are required.' });
//   }

//   try {
//     // Fetch coordinates of Leaving location
//     const leavingCoordinates = await mapservice.getAddressCoordinate(Leavinglocation);
//     if (!leavingCoordinates) {
//       return res.status(400).json({ message: 'Invalid Leaving location.' });
//     }

//     // Find available drivers within a 5 km radius
//     const availableDrivers = await mapservice.getCaptainsInTheRadius(
//       leavingCoordinates.ltd,
//       leavingCoordinates.lng,
//       5
//     );

//     if (!availableDrivers || availableDrivers.length === 0) {
//       return res.status(404).json({ message: 'No available drivers found nearby.' });
//     }

//     return res.status(200).json({
//       message: 'Available drivers found.',
//       availableDrivers,
//     });
//   } catch (error) {
//     console.error('Error searching for nearest drivers:', error.message);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// // Send Request to Chosen Driver
// exports.requestDriver = async (req, res) => {
//   const { driverId, Leavinglocation, Goinglocation, travelDate } = req.body;

//   if (!driverId || !Leavinglocation || !Goinglocation || !travelDate) {
//     return res.status(400).json({ message: 'Driver ID, Leaving location, Going location, and Travel Date are required.' });
//   }

//   try {
//     // Fetch driver details
//     const driver = await Driver.findById(driverId);
//     if (!driver) {
//       return res.status(404).json({ message: 'Driver not found.' });
//     }

//     // Create new travel detail
//     const newTravelDetail = new Traveldetails({
//       Leavinglocation,
//       Goinglocation,
//       travelDate,
//       driverId,
//       status: 'Pending', // Initial status
//     });

//     await newTravelDetail.save();

//     console.log(`Request sent to Driver: ${driver.name}`);

//     return res.status(200).json({
//       message: 'Request sent successfully to the driver.',
//       travelDetail: newTravelDetail,
//     });
//   } catch (error) {
//     console.error('Error requesting driver:', error.message);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// // Get All Travel Details
// exports.getAllTravelDetails = async (req, res) => {
//   try {
//     const travelDetails = await Traveldetails.find().sort({ createdAt: -1 });
//     res.status(200).json(travelDetails);
//   } catch (err) {
//     console.error('Error fetching travel details:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Get Travel Detail by ID
// exports.getTravelDetailById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const travelDetail = await Traveldetails.findById(id);
//     if (!travelDetail) {
//       return res.status(404).json({ message: 'Travel detail not found' });
//     }

//     res.status(200).json(travelDetail);
//   } catch (err) {
//     console.error('Error fetching travel detail:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Update Travel Detail
// exports.updateTravelDetail = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { Leavinglocation, Goinglocation, travelDate } = req.body;

//     const travelDetail = await Traveldetails.findById(id);
//     if (!travelDetail) {
//       return res.status(404).json({ message: 'Travel detail not found' });
//     }

//     travelDetail.Leavinglocation = Leavinglocation || travelDetail.Leavinglocation;
//     travelDetail.Goinglocation = Goinglocation || travelDetail.Goinglocation;
//     travelDetail.travelDate = travelDate || travelDetail.travelDate;

//     await travelDetail.save();
//     res.status(200).json({ message: 'Travel detail updated successfully', travelDetail });
//   } catch (err) {
//     console.error('Error updating travel detail:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };

// // Delete Travel Detail
// exports.deleteTravelDetail = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const travelDetail = await Traveldetails.findByIdAndDelete(id);
//     if (!travelDetail) {
//       return res.status(404).json({ message: 'Travel detail not found' });
//     }

//     res.status(200).json({ message: 'Travel detail deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting travel detail:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// };



// const notificationService = require('../../user/service/notificationService'); // Notification service
// const axios = require('axios');
// require('dotenv').config();

// // Fetch AutoComplete Suggestions and Coordinates
// module.exports.getAutoCompleteAndCreateBooking = async (req, res) => {
//   const { Leavinglocation, Goinglocation, travelDate } = req.body;

//   if (!Leavinglocation || !Goinglocation) {
//     return res.status(400).json({ message: 'Leaving and Going locations are required' });
//   }

//   const leavingcoordinate=mapservice.getAddressCoordinate(Leavinglocation);
//   const goingcoordinate=mapservice.getAddressCoordinate(Goinglocation);
//     // Proceed to create a booking
//     const bookingResult = await createBooking(
//       Leavinglocation,
//       Goinglocation,
//       travelDate,
//       leavingCoordinates,
//       goingCoordinates
//     );

//     return res.status(201).json({
//       message: 'Travel detail created successfully',
//       bookingResult,
//       leavingCoordinates,
//       goingCoordinates
//     });
//   } catch (error) {
//     console.error('Error processing locations or creating booking:', error.message);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// // Create Booking Function
// const createBooking = async (Leavinglocation, Goinglocation, travelDate, leavingCoordinates, goingCoordinates) => {
//   try {
//     // Find captains within a 5 km radius of the Leaving location
//     const captainsInRadius = await mapservice.getCaptainsInTheRadius(
//       leavingCoordinates.lat,
//       leavingCoordinates.lng,
//       5 // Radius in kilometers
//     );

//     console.log('Captains found within 5 km:', captainsInRadius);

//     // Save travel details to the database
//     const newTravelDetail = new Traveldetails({
//       Leavinglocation,
//       Goinglocation,
//       travelDate,
//       captainsNearby: captainsInRadius,
//     });

//     if (captainsInRadius.length === 0) {
//       return { message: 'No available captains found in the radius', captainsInRadius: [] };
//     }

//     await newTravelDetail.save();

//     // Notify available captains (optional)
//     captainsInRadius.forEach((captain) => {
//       notificationService.sendNotification(
//         captain.id,
//         'New Travel Request',
//         `A travel request is available from ${Leavinglocation} to ${Goinglocation}.`
//       );
//     });

//     return { travelDetail: newTravelDetail, captainsInRadius };
//   } catch (error) {
//     console.error('Error creating travel detail:', error.message);
//     throw new Error('Error creating travel detail');
//   }
// };
// Fetch AutoComplete Suggestions and Coordinates
const Traveldetails = require('../model/traveldetails');
const mapservice = require('../../service/mapservice'); // Placeholder for your map services

exports.getAutoCompleteAndCreateBooking = async (req, res) => {
  const { Leavinglocation, Goinglocation, travelDate, travelmode_number, travelMode, expectedStartTime, expectedEndTime } = req.body;

  if (!Leavinglocation || !Goinglocation) {
    return res.status(400).json({ message: 'Leaving and Going locations are required' });
  }

  try {
    const leavingCoordinates = await mapservice.getAddressCoordinate(Leavinglocation);
    const goingCoordinates = await mapservice.getAddressCoordinate(Goinglocation);

    // Calculate distance and time
    const { distance, time } = await mapservice.getDistanceTime(Leavinglocation , Goinglocation);

    // Log for debugging
    console.log('Leaving Coordinates:', leavingCoordinates);
    console.log('Going Coordinates:', goingCoordinates);
    console.log('Distance:', distance);
    console.log('Time:', time);

    let travelDetails = {
      Leavinglocation,
      Goinglocation,
      travelDate,
      travelmode_number,
      travelMode,
      expectedStartTime,
      expectedEndTime,
      distance,
      time,  // Include time here
    };

    // Create travel record
    const travelRecord = await Traveldetails.create({
      ...travelDetails,
      LeavingCoordinates: leavingCoordinates,
      GoingCoordinates: goingCoordinates,
    });

    return res.status(201).json({
      message: 'Travel detail created successfully',
      travelRecord: {
        ...travelRecord._doc,  // Return travel record including the calculated fields
        distance,
        time,
      },
    });
  } catch (error) {
    console.error('Error creating travel details:', error.message);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


const traveldetail = async (req, res) => {
  try {
    // Sample travel details
    const travelDetails = {
      leavingLocation: "123 Main St, Springfield",
      goingLocation: "456 Elm St, Shelbyville",
      distance: "15 km",
      estimatedTime: "25 minutes",
      driverDetails: {
        name: "John Doe",
        mode: "Toyota Prius - Basic",
        picture: "https://example.com/driver-picture.jpg"
      },
      fare: {
        amount: "250",
        currency: "INR"
      }
    };

    // Respond with travel details
    res.status(200).json(travelDetails);
  } catch (error) {
    console.error("Error fetching travel details:", error);
    res.status(500).json({ message: "Failed to fetch travel details" });
  }
};

module.exports = { traveldetail };
