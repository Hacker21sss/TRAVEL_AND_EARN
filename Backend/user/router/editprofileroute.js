const express = require('express');
const { getProfileByUserId,
    createOrUpdateProfile,
    deleteProfileByUserId,} = require('../controller/Editprofilecontroller');

const router = express.Router();

// Route to get a profile by UserId
router.get('/get/:userId', getProfileByUserId); // Get profile by UserId
router.post('/edit/:userId', createOrUpdateProfile); // Create or update profile
router.delete('/delete/:userId', deleteProfileByUserId);

module.exports = router;
