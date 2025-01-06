const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // To hash the password

const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofile', required: true }, // Reference to the User model
  password: { type: String, required: true },
});

// Hash the password before saving it to the database
passwordSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Salt and hash password
  }
  next();
});

module.exports = mongoose.model('Password', passwordSchema);
