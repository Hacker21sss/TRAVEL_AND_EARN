const EditProfile = require('../model/Editprofile');

// Get profile by UserId
const getProfileByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(`Received UserId: ${userId}`); // Log the received UserId

        const profile = await EditProfile.findOne({ UserId: userId });
        console.log(`Query Result: ${profile}`); // Log the result of the query

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message); // Log any errors
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// Create or update profile
const createOrUpdateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        

        // Validate required fields
        if (!userId) {
            return res.status(400).json({ message: 'UserId is required' });
        }

        const profileData = {
            
            ProfilePicture: req.body.ProfilePicture || '',
            firstname: req.body.firstname || '',
            lastname: req.body.lastname || '',
            email: req.body.email || '',
            phoneNumber: req.body.phoneNumber || '',
            accountNumber: req.body.accountNumber || '',
            accountName: req.body.accountName || '',
            ifscCode: req.body.ifscCode || '',
            bankName: req.body.bankName || '',
            branch: req.body.branch || '',
        };

        // Check if the profile exists
        const profile = await EditProfile.findOneAndUpdate(
            { UserId: userId },
            { $set: profileData },
            { new: true, upsert: true } // Create if not exists
        );

        res.status(200).json({ message: 'Profile saved successfully', profile });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// Delete profile by UserId
const deleteProfileByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedProfile = await EditProfile.findOneAndDelete({ UserId: userId });

        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

module.exports = {
    getProfileByUserId,
    createOrUpdateProfile,
    deleteProfileByUserId,
};
