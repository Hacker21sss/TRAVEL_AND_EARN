const express = require('express');
const router = express.Router();
const travelController = require('../../user/controller/TraveldetailsController');

// router.post('/create', travelController.getAutoCompleteAndCreateBooking);
// router.post('/searchNearestDrivers', travelController.searchNearestDrivers);
// router.post('/requestDriver', travelController.requestDriver);
// router.get('/', travelController.getAllTravelDetails);
// router.get('/:id', travelController.getTravelDetailById);
// router.put('/:id', travelController.updateTravelDetail);
// router.delete('/:id', travelController.deleteTravelDetail);
router.get('/get',travelController.traveldetail)
module.exports = router;
