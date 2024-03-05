const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/TheGreateBazar", { useNewUrlParser: true });

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use('/user', authRoutes); // Mount authRoutes
app.use('/category',categoriesRoutes)
const PORT = 8080;
app.listen(process.env.PORT || PORT);
