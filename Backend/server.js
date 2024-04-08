const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "./config.env" });
const cors = require('cors');//add
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
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); 
// Routes
const authRoutes = require("./routes/authRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const itemsRoutes = require("./routes/itemsRoutes");
const cartsRoutes = require("./routes/cartRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const staticsRoutes = require("./routes/staticsRoutes");
const refreshRoutes = require('./routes/refreshRoutes');
app.use("/user", authRoutes);
app.use("/category", categoriesRoutes);
app.use("/item", itemsRoutes);
app.use("/cart", cartsRoutes);
app.use("/order", ordersRoutes);
app.use("/statics", staticsRoutes);
app.use('/refresh', refreshRoutes); 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
