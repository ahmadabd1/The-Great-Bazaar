const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { errorMessages } = require("../config");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cloudinary = require("../cloudinaryConfig");
const fs = require("fs");
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

    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: "bazaargreat@gmail.com",
          pass: "aded lbph hkco felo",
        },
      })
    );

    const mailOptions = {
      from: "The GreratBazaar <bazaargreat@gmail.com>",
      to: email,
      subject: "Registration Confirmation",
      text: `Dear ${firstName},

      Welcome to The Great Bazaar! We are thrilled to have you join our community. Your registration is now complete, and you're all set to explore everything our platform has to offer.
      
      Here are a few things you can do now that you've signed up:
      
      1. Complete your profile: Add a profile picture, update your personal information, and tell us a bit more about yourself.
      2. Explore our features: Take a tour of our website/app to discover all the exciting features and functionalities available to you.
      3. Connect with others: Engage with other members of our community, join discussions, and make new connections.
      
      If you have any questions or need assistance, don't hesitate to reach out to our support team at [support@example.com]. We're here to help you every step of the way.
      
      Thank you once again for choosing [Your Website Name]. We're looking forward to seeing you around!
      
      Best regards,
      Great Bazaar
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

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
    }

    return res.send({ message: "Login successful as client" });
  } catch (error) {
    res.send({ message: errorMessages.internalServerError });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      currentPassword,
      newPassword,
      newPasswordRepeat,
    } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.email = email ?? user.email;
    user.phoneNumber = phoneNumber ?? user.phoneNumber;
    user.address = address ?? user.address;

    if (currentPassword && newPassword && newPasswordRepeat) {
      if (!(await bcrypt.compare(currentPassword, user.password))) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      if (newPassword !== newPasswordRepeat) {
        return res.status(400).json({ message: "New passwords do not match" });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        user.profilePicture = result.secure_url;
        // Delete the file after upload
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.error("Error uploading file to Cloudinary", error);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
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
      address: user.address,
    }));
    res.status(200).json(usersWithFullName);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.UserDetails = async (req, res) => {
  try {
    const { email } = req.params; // Extracting email from route parameters

    const user = await User.findOne({ email }); // Finding user by email in your database
    if (!user) {
      return res.status(404).send({ message: "User not found" }); // If user not found, return a 404 response
    }

    // If user found, return user details in JSON response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error); // Log any errors that occur during the process
    res.status(500).json({ message: "Internal server error" }); // Return a generic error response if something goes wrong
  }
};
