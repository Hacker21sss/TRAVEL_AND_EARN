const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  password: { type: String, required: true },
  newPassword: { type: String, required: true }, // newPassword field
  re_enter: { type: String, required: true }, // re_enter field
});

module.exports = mongoose.model("newpass", passwordSchema);
