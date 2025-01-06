const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  travellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Traveller' },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  pickupInstructions: { type: String, required: true },
  deliveryInstructions: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'picked', 'delivered'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
