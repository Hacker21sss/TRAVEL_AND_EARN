const Userprofile = require('../model/Profile');
const Password = require('../model/password');
const bcrypt = require('bcryptjs');

// Update the user's password
exports.updatePassword = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from params
    const { password } = req.body; // Get new password from request body

    // Check if user exists
    const user = await Userprofile.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new password entry or update the existing one
    const existingPassword = await Password.findOne({ userId });
    if (existingPassword) {
      existingPassword.password = password; // Update password if already exists
      await existingPassword.save();
    } else {
      const newPassword = new Password({
        userId,
        password,
      });
      await newPassword.save();
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating password' });
  }
};

// Serve the page to set the password after profile update
exports.showPasswordSetPage = (req, res) => {
  // This could be a simple HTML page with a form to set the password
  res.status(200).json({ message: 'Please set your password', userId: req.params.userId });
};
