const express = require('express');
const router = express.Router();
const staticsHandler = require('../serverHandlers/staticsHandler')

router.get('/item',staticsHandler.getItemsData);
router.get('/category',staticsHandler.getCategoriesData);
router.get('/monthlyIncome',staticsHandler.getMonthlyStatics);

module.exports = router;

