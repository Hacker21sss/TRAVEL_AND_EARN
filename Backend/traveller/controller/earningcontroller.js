const express = require('express');
const Earnings = require('../../traveller/model/Earning');
const router = express.Router();

// Get earnings by driver ID and period
router.get('/:period', async (req, res) => {
  try {
    const { driverId, period } = req.params;

    // Find earnings data for the driver by period
    const earnings = await Earnings.findOne({  period });

    if (!earnings) {
      return res.status(404).json({ message: 'No earnings found for this period' });
    }

    res.json(earnings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update earnings
router.post('/', async (req, res) => {
  try {
    const {  totalEarnings, earningsBreakdown, period } = req.body;

    // Find if earnings already exist for the given period
    let earnings = await Earnings.findOne({  period });

    if (earnings) {
      // Update the earnings data
      earnings.totalEarnings = totalEarnings;
      earnings.earningsBreakdown = earningsBreakdown;
    } else {
      // Create new earnings entry
      earnings = new Earnings({
        
        totalEarnings,
        earningsBreakdown,
        period,
      });
    }

    await earnings.save();
    res.status(200).json({ message: 'Earnings data saved successfully', earnings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
