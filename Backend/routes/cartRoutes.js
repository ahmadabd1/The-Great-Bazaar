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


router.get('/allCart',cartsHandler.get_allCartItems);
router.post('/addToCart', cartsHandler.add_CartItem);
// Delete a cart by ID
router.delete('/deleteFromCart:id', cartsHandler.getCart,cartsHandler.deleteFromCart );
router.patch('/updateCart:id', cartsHandler.getCart,cartsHandler.updateCart);

module.exports = router;
