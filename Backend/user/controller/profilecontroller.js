const UserProfile = require('../model/Profile');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createUserProfile = async (req, res) => {
  try {
    const { phoneNumber, firstName, lastName, email } = req.body;

    // Validate input
    if (!phoneNumber || !firstName || !lastName || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Initialize profile picture URL
    let profilePictureUrl = null;

    // Upload profile picture if provided
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      profilePictureUrl = uploadResult.secure_url;

      // Remove file from the server
      fs.unlinkSync(req.file.path);
    }

    // Create a new user profile
    const newUserProfile = new UserProfile({
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      phoneNumber,
      profilePicture: profilePictureUrl,
    });

    // Save the new profile to the database
    await newUserProfile.save();

    res.status(201).json({
      message: "User profile created successfully.",
      user: newUserProfile,
    });
  } catch (error) {
    console.error("Error creating user profile:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate entry for phone number or email.",
      });
    }

    res.status(500).json({
      message: "Error creating user profile.",
    });
  }
};

// **Traveler Registration**
// For generating unique IDs

// exports.registerAsTraveler = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Retrieve userId from the request params
//     const { licenseNumber, aadharCard, vehicleDetails } = req.body;

//     // Validate inputs
//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is required.' });
//     }

//     if (!licenseNumber || !aadharCard || !vehicleDetails) {
//       return res.status(400).json({ message: 'All verification details (license number, Aadhaar card, and vehicle details) are required.' });
//     }

//     // Check if the user exists in the UserProfile model
//     const user = await UserProfile.findOne({ userId });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if the user is already registered as a traveler
//     if (user.travellerId) {
//       return res.status(400).json({ message: 'User is already registered as a traveler.' });
//     }

//     // Validate phone number
//     if (!user.phoneNumber) {
//       return res.status(400).json({ message: 'Phone number is required and cannot be null.' });
//     }

//     // Generate a custom travelerId (e.g., a random string or UUID)
//     const customTravelerId = `TRV-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

//     // Create a new Traveler profile
//     const newTraveler = new Traveler({
//       travellerId: customTravelerId, // Use custom traveler ID
//       licenseNumber,
//       aadharCard,
//       vehicleDetails,
//       isVerified: true, // Mark as verified if all details are provided
//     });

//     // Save the new Traveler profile
//     const traveler = await newTraveler.save();

//     // Link the travellerId to the user profile
//     user.travellerId = traveler.travellerId; // Save the custom travelerId in the user profile
//     await user.save();

//     res.status(201).json({ message: 'Traveler (Driver) registered successfully.', traveler });
//   } catch (err) {
//     console.error('Error registering traveler:', err.message);
//     if (err.code === 11000) {
//       return res.status(400).json({ message: 'Duplicate key error.', field: Object.keys(err.keyValue)[0] });
//     }
//     res.status(500).json({ message: 'Error registering traveler.', error: err.message });
//   }
// };


// // **Login (Common for User and Traveler)**
// exports.login = async (req, res) => {
//   try {
//     const { phoneNumber, password } = req.body;

//     const user = await UserProfile.findOne({ phoneNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ message: 'Logged in successfully.', token });
//   } catch (err) {
//     console.error('Error logging in:', err);
//     res.status(500).json({ message: 'Error logging in.' });
//   }
// };

// // **Fetch Traveler Profile**
// exports.getTravelerDetails = async (req, res) => {
//   try {
//     const { travelerId } = req.params;

//     const traveler = await TravelerProfile.findById(travelerId).populate('userId');
//     if (!traveler) {
//       return res.status(404).json({ message: 'Traveler not found.' });
//     }

//     res.status(200).json(traveler);
//   } catch (err) {
//     console.error('Error fetching traveler details:', err);
//     res.status(500).json({ message: 'Error fetching traveler details.' });
//   }
// };

// // **Fetch User Profile**
// // exports.getUserProfileByPhoneNumber = async (req, res) => {
// //   try {
// //     const { phoneNumber } = req.query; // Assuming phoneNumber is passed as a query parameter

// //     // Validate input
// //     if (!phoneNumber) {
// //       return res.status(400).json({ message: 'Phone number is required.' });
// //     }

// //     // Fetch user profile by phone number
// //     const user = await UserProfile.findOne({ phoneNumber });
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found.' });
// //     }

// //     res.status(200).json({ message: 'User profile fetched successfully.', user });
// //   } catch (err) {
// //     console.error('Error fetching user profile:', err);
// //     res.status(500).json({ message: 'Error fetching user profile.' });
// //   }
// // };
// exports.getUserProfileByPhoneNumber = async (req, res) => {
//   try {
//     const { phoneNumber } = req.query; // Assuming phoneNumber is passed as a query parameter

//     // Validate input
//     if (!phoneNumber) {
//       return res.status(400).json({ message: 'Phone number is required.' });
//     }

//     // Sanitize and format phone number (if necessary)
//     const sanitizedPhoneNumber = phoneNumber.trim(); // Remove any leading/trailing whitespace
//     const formattedPhoneNumber = sanitizedPhoneNumber.startsWith('+')
//       ? sanitizedPhoneNumber
//       : `+${sanitizedPhoneNumber}`; // Add '+' if not already present (optional)

//     console.log('Received phoneNumber:', formattedPhoneNumber); // Debugging log

//     // Fetch user profile by phone number
//     const user = await UserProfile.findOne({ phoneNumber: formattedPhoneNumber });

//     // Log query result for debugging
//     console.log('Query result:', user);

//     // Handle case where user is not found
//     if (!user) {
//       return res.status(404).json({
//         message: `User not found for phone number: ${formattedPhoneNumber}. Please check the phone number and try again.`,
//       });
//     }

//     // Respond with user profile
//     res.status(200).json({
//       message: 'User profile fetched successfully.',
//       user,
//     });
//   } catch (err) {
//     console.error('Error fetching user profile:', err);
//     res.status(500).json({ message: 'An error occurred while fetching the user profile.' });
//   }
// };



// exports.updateUserProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { firstName, lastName, email } = req.body;

//     const user = await Userprofile.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.firstName = firstName || user.firstName;
//     user.lastName = lastName || user.lastName;
//     user.email = email || user.email;

//     await user.save();
//     res.status(200).json({ message: 'Profile updated successfully', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating user profile' });
//   }
// };

