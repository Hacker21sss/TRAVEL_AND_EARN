const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  startinglocation:{
    
    longitude:{
        type: Number,required:false,
    },
    latitude:{
        type: Number,required:false,
    }
  },
  
  goingLocation: {
    latitude: { type: Number, required: false }, // Optional field for future use
    longitude: { type: Number, required: false }, // Optional field for future use
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('consignment', DriverSchema);
