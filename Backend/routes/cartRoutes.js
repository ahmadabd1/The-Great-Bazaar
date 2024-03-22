const express = require('express');
const router = express.Router();
const cartsHandler = require('../serverHandlers/cartHandler');



router.get('/:id',cartsHandler.getCart);
router.post('/addToCart', cartsHandler.add_CartItem);
router.delete('/', cartsHandler.deleteFromCart );

module.exports = router;
