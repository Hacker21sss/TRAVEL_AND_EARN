const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  lastUsed: { type: Date, default: Date.now }, // To track recent usage
});

module.exports = mongoose.model('Address', AddressSchema);
