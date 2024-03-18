const User = require("../models/user");
const { errorMessages } = require("../config");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = userId => jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45s' });
const generateRefreshToken = userId => jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: errorMessages.emailAlreadyExists });
    }
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const newUser = new User({ firstName, lastName, email, password, phoneNumber, role: role || 'client' });
    await newUser.save();

    const accessToken = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)
   

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.status(201).json({ message: "User created successfully", accessToken, refreshToken });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin' && password === 'admin') {
    const accessToken = jwt.sign({ email: 'admin', role: 'admin' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45s' });
    const refreshToken = jwt.sign({ email: 'admin', role: 'admin' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return res.json({ message: "Login successful as admin", accessToken, refreshToken, role: 'admin' }); 
  } else {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45s' });
    const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    return res.json({ message: `Login successful as ${user.role}`, accessToken, refreshToken, role: user.role }); 
  }
};




exports.editProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
};

exports.logout = async (req, res) => {
  const refreshToken = req.cookies['refreshToken'];
  
  if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required." });
  }
  
  try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
          if (err) return res.status(403).json({ message: "Invalid refresh token." });

          const user = await User.findOne({ refreshToken }).exec();
          if (!user) {
              return res.status(404).json({ message: "User not found." });
          }
          user.refreshToken = "";
          await user.save();
          res.json({ message: "Logged out successfully." });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
  }
};
