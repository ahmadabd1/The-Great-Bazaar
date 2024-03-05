const express = require('express');
const router = express.Router();
const userHandler = require('../serverHandlers/userHandler');

router.post('/signup', userHandler.signup);
router.post('/login', userHandler.login);

module.exports = router;