const User = require("../models/user");
const { errorMessages } = require("../config");
//const bcrypt = require('bcrypt');

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
    res.status(201).json({ message: "User created successfully" });
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
      return res.send({ message: errorMessages.emailNotFound });
    }

    if (email === "admin" && user.password === password) {
      return res.send({ message: "Login successful as admin" });
    }

    if (user.password !== password) {
      return res.send({ message: errorMessages.wrongPassword });
      return res.send({ message: errorMessages.wrongPassword });
    }

    return res.send({ message: "Login successful as client" });
  } catch (error) {
    res.send({ message: errorMessages.internalServerError });
    res.send({ message: errorMessages.internalServerError });
  }
};
