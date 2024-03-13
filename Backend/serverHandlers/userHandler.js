const User = require("../models/user");
const { errorMessages } = require("../config");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
      const { firstName, lastName, email, password, phoneNumber } = req.body;
      // Check if email format is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) && email !== "admin") {
          return res.status(400).json({ message: "Invalid email format" });
      }
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
          return res.status(400).send(errorMessages.emailAlreadyExists);
      }
      const existingPhoneNumber = await User.findOne({ phoneNumber });
      if (existingPhoneNumber) {
          return res.status(400).send("Phone already exists");
      }
      const newUser = new User({
          firstName,
          lastName,
          email,
          password, 
          phoneNumber,
      });
      await newUser.save();

      const accessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: newUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
      newUser.refreshToken = refreshToken;
      await newUser.save();

      res.status(201).json({ accessToken, refreshToken, message: "User created successfully" });
  } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: errorMessages.internalServerError });
  }
};

exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: errorMessages.emailNotFound });
      }
      if (email === "admin" && user.password === password) {
        return res.send({ message: "Login successful as admin" });
      }
  
      if (user.password !== password) {
          return res.status(401).json({ message: errorMessages.wrongPassword });
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
      user.refreshToken = refreshToken;
      await user.save();

      res.json({ accessToken, refreshToken, message: "Login successful" });
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: errorMessages.internalServerError });
  }
};
exports.logout = async (req, res) => {
  
  try {
      const { refreshToken } = req.body; 
      const user = await User.findOne({ refreshToken });
      if (user) {
          user.refreshToken = '';
          await user.save();
          res.clearCookie('jwt'); 
          res.json({ message: "Logged out successfully" });
      } else {
          res.status(404).json({ message: "Session not found" });
      }
  } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: errorMessages.internalServerError });
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
exports.get_all_users = async (req, res) => {
  try {
    const users = await User.find(
      {},
      "firstName lastName email phoneNumber"
    ).exec();
    const usersWithFullName = users.map((user) => ({
      fullName: user.firstName + " " + user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    }));
    res.status(200).json(usersWithFullName);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
