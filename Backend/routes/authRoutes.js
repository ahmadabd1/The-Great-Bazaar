const express = require("express");
const router = express.Router();
const userHandler = require("../serverHandlers/userHandler");
const refreshTokenHandler = require('../serverHandlers/refreshTokenHandler');

router.get('/data', refreshTokenHandler.getUserData);
router.post("/signup", userHandler.signup);
router.post("/login", userHandler.login);
router.put("/profile/:userId", userHandler.editProfile);
router.post('/logout', userHandler.logout);
module.exports = router;
