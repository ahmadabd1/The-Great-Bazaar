
const express = require('express');
const router = express.Router();
const refreshTokenHandler = require('../serverHandlers/refreshTokenHandler');

router.post('/token', refreshTokenHandler.handleRefreshToken);
module.exports = router;
