const admin = require('../../config/firebaseconfig'); // Firebase setup
const Userprofile = require('../model/User');
// const OTPModel = require('../model/OTP') // Model to store OTPs temporarily

// Function to validate phone number format (E.164 format)
function validatePhoneNumber(phoneNumber) {
  const e164Regex = /^\+?[1-9]\d{1,14}$/; // Regular expression for E.164 format
  if (!e164Regex.test(phoneNumber)) {
    throw new Error('Invalid phone number format. Use E.164 format, e.g., +1234567890');
  }
  return phoneNumber;
}

// Function to handle OTP request for password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    // Extract and validate the phone number from the request
    const phoneNumber = validatePhoneNumber(req.body.phoneNumber);

    // Check if the phone number is associated with a user
    const user = await Userprofile.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User with this phone number not found' });
    }

    // Generate a 6-digit OTP for the user
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP in the database with an expiration time (e.g., 5 minutes)
    const otpEntry = new OTPModel({
      phoneNumber,
      otp // 5 minutes expiry
    });
    await otpEntry.save();

    // Here you would send the OTP via SMS (using a service like Twilio or Firebase Phone Authentication).
    // For simplicity, we will just return the OTP here (do NOT do this in production).
    res.status(200).json({ message: 'OTP sent successfully', otp });

    // You can remove or replace the above line with actual OTP sending logic using SMS service (e.g., Twilio).

  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

// Function to verify the OTP
exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Check if the OTP is correct (from database)
    const storedOtp = await OTPModel.findOne({ phoneNumber });

    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    // Check if the OTP matches and is not expired
    if (storedOtp.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > storedOtp.expiresAt) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP verified successfully, proceed to password reset or allow user to continue
    res.status(200).json({ message: 'OTP verified successfully' });

    // Optionally, delete or expire the OTP after successful verification
    await OTPModel.deleteOne({ phoneNumber });

  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};
