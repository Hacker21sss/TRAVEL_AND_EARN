const Earnings = require('../../traveller/model/Earning');

const updateEarnings = async (userId, amount, breakdown = {}) => {
  try {
    // Find the driver's earnings record or create one
    let earnings = await Earnings.findOne({ userId });

    if (!earnings) {
      earnings = new Earnings({ userId });
    }

    // Update the total earnings
    earnings.totalEarnings += amount;

    // Optionally, update breakdown
    for (const key in breakdown) {
      earnings.earningsBreakdown[key] = (earnings.earningsBreakdown[key] || 0) + breakdown[key];
    }

    await earnings.save();
    console.log(`Earnings updated for driver ${driverId}: +${amount}`);
  } catch (error) {
    console.error('Error updating earnings:', error);
  }
};

module.exports = updateEarnings;
