const express = require('express');
const router = express.Router();
const staticsHandler = require('../serverHandlers/staticsHandler')

router.get('/item',staticsHandler.getItemsData);

module.exports = router;

