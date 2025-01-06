const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, // Assuming user linkage
  location: { type: String},
  pincode: { type: String, required: true },
  flat: { type: String,  },
  street: { type: String, required: true },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  saveAs: { type: String, enum: ["Home", "Office", "Others"], required: true },
  latitude: { type: Number },
  longitude: { type: Number},
});

const Address = mongoose.model("Address12", addressSchema);
module.exports = Address;
