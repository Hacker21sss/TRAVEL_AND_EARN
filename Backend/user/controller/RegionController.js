const Region = require('../../user/model/region');

// Create a new region
exports.createRegion = async (req, res) => {
    try {
        // const {userId}=req.params;
        const {  regionName } = req.body;
        const newRegion = new Region({  regionName });
        await newRegion.save();
        res.status(201).json({ message: 'Region created successfully', region: newRegion });
    } catch (error) {
        res.status(500).json({ message: 'Error creating region', error: error.message });
    }
};

// Get regions for a specific user
exports.getRegions = async (req, res) => {
    try {
        const { userId } = req.params;
        const regions = await Region.find({ userId });
        res.status(200).json(regions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving regions', error: error.message });
    }
};
