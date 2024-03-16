const express = require('express');
const router = express.Router();
const multer = require('multer');
const cartsHandler = require('../serverHandlers/cartHandler');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

router.post('/cart', upload.single('image'), cartsHandler);
router.get('/cart/:Id', cartsHandler);
// router.get('/items', itemsHandler.get_all_items);
// router.get('/items/:categoryId', itemsHandler.get_items_byCategoryId);
// router.delete('/item/:Id', itemsHandler.delete_item);
// router.put('/item', itemsHandler.update_item);

module.exports = router;
