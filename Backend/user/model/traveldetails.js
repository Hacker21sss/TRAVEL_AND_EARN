const mongoose = require('mongoose');

const TraveldetailsSchema = new mongoose.Schema({
  Leavinglocation: { type: String, required: true },
  Goinglocation: { type: String, required: true },
  LeavingCoordinates: {
    longitude: { type: Number },
    latitude: { type: Number }
  },
  GoingCoordinates: {
    longitude: { type: Number },
    latitude: { type: Number }
  },
  travelMode: { type: String },
  travelmode_number:{type:String},
  travelDate: { type: Date, required: true },
  expectedStartTime: { type: String },
  expectedEndTime: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Traveldetails', TraveldetailsSchema);
