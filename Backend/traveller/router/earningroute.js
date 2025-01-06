const express = require('express');
const Earnings = require('../../traveller/model/Earning')
const router = express.Router();

// Fetch earnings by driver ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const earnings = await Earnings.findOne({ userId });

    if (!earnings) {
      return res.status(404).json({ message: 'No earnings found for this driver' });
    }

    res.json({
      totalEarnings: earnings.totalEarnings,
      earningsBreakdown: earnings.earningsBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
