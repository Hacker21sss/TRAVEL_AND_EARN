const bcrypt = require('bcryptjs');
const Password = require('../model/newpass'); // Password schema for storing hashed passwords
const Userprofile = require('../model/User'); // Assuming Userprofile is your user model

exports.setPassword = async (req, res) => {
  const { userId } = req.params;
  const { phoneNumber, newPassword, re_enter } = req.body;

  try {
    // Check if the new password and re-enter password match
    if (newPassword !== re_enter) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Find user by phone number
    const user = await Userprofile.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user already has a password entry
    const existingPassword = await Password.findOne({ userId: user._id });
    if (existingPassword) {
      return res.status(400).json({ message: 'Password already set for this user' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Create a new password entry in the Password model
    const passwordEntry = new Password({
      userId: user._id,
      password: hashedPassword,
    });

    // Save the password entry to the database
    await passwordEntry.save();

    res.status(200).json({ message: 'Password set successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error setting password', error });
  }
};
