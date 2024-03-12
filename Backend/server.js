const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: './config.env' });

const app = express();
<<<<<<< HEAD
const authRoutes = require('./routes/authRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const itemsRoutes = require('./routes/itemsRoutes')
const refreshRoutes = require('./routes/refreshRoutes');
=======

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/TheGreateBazar", { useNewUrlParser: true });

>>>>>>> 788ccfb2e86b90ce01adeff6164097f6dbf280aa
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

<<<<<<< HEAD
app.use('/refresh', refreshRoutes);
app.use('/user', authRoutes)
app.use('/category',categoriesRoutes)
app.use('/item',itemsRoutes)
=======
// Routes
const authRoutes = require('./routes/authRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
>>>>>>> 788ccfb2e86b90ce01adeff6164097f6dbf280aa

app.use('/user', authRoutes);
app.use('/category', categoriesRoutes);
app.use('/item', itemsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
