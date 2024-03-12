const express = require('express');
const router = express.Router();
const categoriesHandler = require('../serverHandlers/categoriesHandler');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
  
  const upload = multer({ storage: storage });
  
router.get('/categories', categoriesHandler.get_categories);
router.get('/category', categoriesHandler.get_category);
router.post('/category', upload.single('image'), categoriesHandler.create_category);
router.put('/category', categoriesHandler.update_category);
router.delete('/:categoryId', categoriesHandler.delete_category);
module.exports = router;