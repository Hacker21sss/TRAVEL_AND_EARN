const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedbackmessage: { type: String, required: true },
  subject: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
