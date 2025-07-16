const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  imageUrl: { 
    type: String,
    required: true 
  }, 
  linkedin: {
    type: String,
    default: '',
  },
  twitter: {
    type: String,
    default: '',
  },
  facebook: {               
    type: String,
    default: '',
  },
  instagram: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
