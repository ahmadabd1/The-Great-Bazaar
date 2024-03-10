const express = require('express');
const router = express.Router();
const categoriesHandler = require('../serverHandlers/categoriesHandler');

router.get('/categories', categoriesHandler.get_categories);
router.get('/category', categoriesHandler.get_category);
router.post('/category', categoriesHandler.create_category);
router.put('/category', categoriesHandler.update_category);
router.get('/subcategories/:categoryId', categoriesHandler.get_subcategories);
router.delete('/:categoryId', categoriesHandler.delete_category);
router.delete('/subcategory/:subcategoryId', categoriesHandler.delete_subcategory);
module.exports = router;