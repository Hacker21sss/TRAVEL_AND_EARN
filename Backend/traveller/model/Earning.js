const mongoose = require('mongoose');
const user=require('../../user/model/User')

const EarningsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  totalEarnings: {
    type: Number,
    default: 0, // Initialize with zero
  },
  earningsBreakdown: {
    type: Object,
    default: {}, // For storing detailed breakdown if needed
  },
}, { timestamps: true });
module.exports = mongoose.model('Earnings', EarningsSchema);
