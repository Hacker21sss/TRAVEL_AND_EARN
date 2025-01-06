const express = require('express');
const Booking = require('../model/instruction');
const router = express.Router();

// Add or update pickup/delivery instructions
router.post('/instructions', async (req, res) => {
  try {
    const { bookingId, pickupInstructions, deliveryInstructions } = req.body;

    // Update the booking with new instructions
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { pickupInstructions, deliveryInstructions },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Instructions updated successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Fetch instructions for a specific booking
router.get('/instructions/:bookingId', async (req, res) => {
    try {
      const { bookingId } = req.params;
  
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      res.status(200).json({
        pickupInstructions: booking.pickupInstructions,
        deliveryInstructions: booking.deliveryInstructions,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  