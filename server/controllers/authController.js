const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");

// POST /signup
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Invalid signup data" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password, // Stored as plaintext
      role: "user", // Default role
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Missing email or password" });

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};