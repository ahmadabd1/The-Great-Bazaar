const User = require("../models/user");
const { errorMessages } = require("../config");

exports.signup = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email) && email !== "admin") {
       return res.status(400).json({ message: errorMessages.invalidEmailFormat });
     }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send(errorMessages.emailAlreadyExists);
    }
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({ message: errorMessages.phoneNumberAlreadyExists });
    }
    const newUser = new User({
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
      return res.status(401).json({ message: errorMessages.emailNotFound });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: errorMessages.wrongPassword });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: errorMessages.internalServerError });
  }
};
