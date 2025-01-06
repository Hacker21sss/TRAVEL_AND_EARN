const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('../controller/profilecontroller');
const authmiddleware=require('../../middleware/authmiddleware')
const router = express.Router();

// Setup multer for file upload
const storage = multer.diskStorage({ destination: (req, file, cb) =>
   { const uploadDir = path.join(__dirname, 'uploads'); 
   cb(null, uploadDir);
   },
    filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); }
    , }); const upload = multer({ storage: storage });

// Routes for user operations
router.post('/create', userController.createUserProfile); // Create user
router.put('/update/:userId', userController.updateUserProfile); // Update user profile (name, email)
// router.put('/update-picture/:userId', upload.single('profilePicture'), userController.updateProfilePicture);
router.post('/login',userController.login) // Update profile picture
router.get('/getall',userController.getUserProfileByPhoneNumber)
router.post('/traveler',userController.registerAsTraveler);
router.get('/traveler/:travellerId',userController.getTravelerDetails)

module.exports = router;
