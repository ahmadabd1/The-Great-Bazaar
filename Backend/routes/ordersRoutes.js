const express = require('express');
const router = express.Router();
const ordersHandler = require('../serverHandlers/ordersHandler')

router.get('/:id',ordersHandler.getOrdersByUserId);
router.get('/',ordersHandler.getAllOrders);
router.delete('/:id', ordersHandler.delete_order);
router.post('/payment/:id',ordersHandler.processPaymentAndCreateOrder)
router.put('/',ordersHandler.changeOrderStatus)

module.exports = router;