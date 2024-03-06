const express = require('express');
const router = express.Router();
const itemsHandler = require('../serverHandlers/itemsHandler')

router.get('/item/:Id', itemsHandler.get_item_byid)
router.get('/items/:categoryId', itemsHandler.get_items_byCategoryId)
router.delete('/item/:Id', itemsHandler.delete_item)
router.post('/item', itemsHandler.create_item)
router.put('/item', itemsHandler.update_item)

module.exports = router