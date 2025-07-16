const Contact = require("../models/contactModel");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const mongoose = require("mongoose");

//Home page - getIntouch form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, lastName, email, mobile, role, message } = req.body;

    if (!name || !lastName || !email || !role || !message) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    let userId = null;

// Check if token is present
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id; // or decoded._id based on what you stored
      } catch (err) {
        console.warn("Invalid token, proceeding as guest user");
      }
    }

    const newEntry = new Contact({
      name,
      lastName,
      email,
      mobile,
      role,
      message,
      ...(userId && { userId }), // include only if available
    });

    await newEntry.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving contact form:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Activity page get user details
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; // from verifyToken middleware
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


//Activity page - get user getIntouch details
exports.getUserContactActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    const activity = await Contact.find({ userId }) // Mongoose auto-casts the string
      .sort({ createdAt: -1 });

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ message: "Error fetching activity" });
  }
};


// Get a single activity by ID
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Contact.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update an activity by ID
exports.updateActivity = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json({ message: 'Activity updated successfully', activity: updated });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

//Deleting a user activity and thus a contact.
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Contact.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete activity' });
  }
};
