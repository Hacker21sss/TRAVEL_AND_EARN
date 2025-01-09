const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
   
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String   },
    profilePicture:{type: String},
    // password: { type: String, required: true },  // Hash this password before saving
    tokens: [{ token: { type: String } }],
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'traveler'], default: 'user' }, // Default role is 'user'
    userId: { type: String,  },
     // Links to Traveler data
    createdAt: { type: Date, default: Date.now },
    socketId:{type:String},
    travellerId: { type: String,unique:true},
});
const travelerSchema = new mongoose.Schema({
     // Link to the user
    licenseNumber: { type: String, required: true },
    aadharCard: { type: String, required: true },
    Pancard: { type: String, required: true },
    isVerified: { type: Boolean, default: false }, // Admin verification
    createdAt: { type: Date, default: Date.now },
    socketId:{type:String}
  });
  module.exports = mongoose.model('Traveler', travelerSchema);

module.exports = mongoose.model('userprofiles', userSchema);
