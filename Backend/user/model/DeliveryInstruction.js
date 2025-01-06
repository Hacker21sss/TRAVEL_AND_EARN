const mongoose = require('mongoose');

const InstructionSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    customerName: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    handoverInstructions: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Instruction', InstructionSchema);
