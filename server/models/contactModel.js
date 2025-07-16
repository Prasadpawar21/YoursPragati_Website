const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: false,
  },

  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String, // optional
  },
  role: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
