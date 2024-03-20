const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: './config.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/TheGreateBazar", { useNewUrlParser: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Middleware
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
    credentials: true, 
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));


// Routes
const authRoutes = require('./routes/authRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const salesRoutes = require('./routes/salesRoutes');

app.use('/user', authRoutes);
app.use('/category', categoriesRoutes);
app.use('/item', itemsRoutes);
app.use('/refresh', refreshRoutes);
app.use('/sales', salesRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
