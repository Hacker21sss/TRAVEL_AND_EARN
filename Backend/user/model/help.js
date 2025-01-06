// models/HelpRequest.js
const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject:{type:String},
  message:{type:String}, // Status: Pending, In Progress, Resolved
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HelpRequest', helpRequestSchema);
