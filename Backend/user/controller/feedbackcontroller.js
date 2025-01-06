const Feedback = require('../model/feedback');

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { subject, feedbackmessage } = req.body;

    // Create and save the new feedback
    const newFeedback = new Feedback({ feedbackmessage, subject });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    // Retrieve all feedback
    const feedback = await Feedback.find(); // No populate required
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
  }
};
