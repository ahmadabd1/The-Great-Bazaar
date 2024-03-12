const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const itemsRoutes = require('./routes/itemsRoutes')
const refreshRoutes = require('./routes/refreshRoutes');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/TheGreateBazar", { useNewUrlParser: true })

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use('/refresh', refreshRoutes);
app.use('/user', authRoutes)
app.use('/category',categoriesRoutes)
app.use('/item',itemsRoutes)

const PORT = 8080
app.listen(process.env.PORT || PORT)
