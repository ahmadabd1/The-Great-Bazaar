const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "./config.env" });

const app = express();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/TheGreateBazar", {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
// CORS Middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

// Routes
const authRoutes = require("./routes/authRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const refreshRoutes = require("./routes/refreshRoutes");

app.use("/user", authRoutes);
app.use("/category", categoriesRoutes);
app.use("/item", itemsRoutes);
app.use("/refresh", refreshRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
