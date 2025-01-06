const Address = require('../model/recentaddresslist');

// Save or update address
exports.saveAddress = async (req, res) => {
    const {userId}=req.params;
  try {
    const {  pickupLocation, dropLocation } = req.body;

    // Check if the address pair already exists for the user
    let address = await Address.findOne({
      userId,
      pickupLocation,
      dropLocation,
    });

    if (address) {
      // Update the lastUsed timestamp
      address.lastUsed = Date.now();
    } else {
      // Create a new address record
      address = new Address({
        userId,
        pickupLocation,
        dropLocation,
      });
    }

    await address.save();
    res.status(200).json({ message: 'Address saved successfully', address });
  } catch (err) {
    console.error('Error saving address:', err);
    res.status(500).json({ message: 'Error saving address' });
  }
};
exports.getRecentlyUsedAddresses = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const addresses = await Address.find({ userId })
        .sort({ lastUsed: -1 }) // Sort by most recent
        .limit(10); // Limit to the most recent 10 entries
  
      res.status(200).json({ message: 'Recently used addresses retrieved', addresses });
    } catch (err) {
      console.error('Error fetching recently used addresses:', err);
      res.status(500).json({ message: 'Error fetching addresses' });
    }
  };
  
