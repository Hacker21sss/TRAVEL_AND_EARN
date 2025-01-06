const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  driverId:{type:String},
  driverName: { type: String, required: true },
  carModel: { type: String, required: true },
  carType: { type: String, enum: ['Sedan', 'SUV', 'Hatchback'], required: true },
  isAvailable: { type: Boolean, default: true }, // Availability status of the driver
  ratePerKm: { type: Number, required: true },   // Rate per kilometer for fare calculation
  currentLocation: {
    type: {String},
    lat: { type: Number, required: false }, // Optional field for future use
    lng: { type: Number, required: false }, // Optional field for future use
  },
  rating:{type:Number}
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});
DriverSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Driver', DriverSchema);
