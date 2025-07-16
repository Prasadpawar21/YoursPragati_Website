// models/User.js
const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  isTemporaryAdmin: {
    type: Boolean,
    default: false,
  },

  adminAccessExpiresAt: {
    type: Date,
    default: null, // null means no expiration (i.e., permanent if isTemporaryAdmin=false)
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});


// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
