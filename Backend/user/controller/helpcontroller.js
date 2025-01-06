// controllers/helpRequestController.js
const HelpRequest = require('../model/help');

// Submit help request
exports.submitHelpRequest = async (req, res) => {
  try {
    const {  subject,message} = req.body;
    
    const newHelpRequest = new HelpRequest({  subject, message });
    await newHelpRequest.save();

    res.status(201).json({ message: 'Help request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting help request', error: error.message });
  }
};

// Get all help requests
exports.getAllHelpRequests = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.find().populate( 'name email');
    res.status(200).json(helpRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving help requests', error: error.message });
  }
};

// Update help request status
exports.updateHelpRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const helpRequest = await HelpRequest.findById(requestId);
    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    helpRequest.status = status;
    await helpRequest.save();

    res.status(200).json({ message: 'Help request status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating help request status', error: error.message });
  }
};
